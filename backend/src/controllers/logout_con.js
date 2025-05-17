const prisma = require("../prisma_client/prisma_client");

module.exports.logout = async (req, res) => {
  if (!req.cookies.jwt) return res.sendStatus(204); //NO CONTENT
  const refreshToken = req.cookies.jwt;
  await prisma.user.updateMany({
    where: {
      refreshToken: refreshToken,
    },
    data: {
      refreshToken: null,
    },
  });
  //delete req.headers["authorization"];
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(204).json({ message: "User token deleted" });
};
