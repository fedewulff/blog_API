const prisma = require("../prisma_client/prisma_client");

module.exports.logout = async (req, res) => {
  if (!req.cookies.jwt) return res.sendStatus(204); //NO CONTENT
  const refreshToken = req.cookies.jwt;
  const user = await prisma.user.updateMany({
    where: {
      refreshToken: refreshToken,
    },
    data: {
      refreshToken: null,
    },
  });
  res.clearCookie("jwt");
  res.sendStatus(204);
};
