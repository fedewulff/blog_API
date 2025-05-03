const bcrypt = require("bcrypt");
const prisma = require("../prisma_client/prisma_client");
const CustomError = require("../middleware/customError");
const jwt = require("jsonwebtoken");

//LOG IN
module.exports.adminLogInPost = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "username and password are required" });

  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  if (!user) return res.status(400).json({ message: "user does not exist" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "incorrect password" });

  // generate tokens
  const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  await prisma.user.update({
    where: { username: username },
    data: { refreshToken: refreshToken },
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    httpOnly: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({ message: "user logged in", accessToken: accessToken });
};
