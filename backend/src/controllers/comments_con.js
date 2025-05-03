const prisma = require("../prisma_client/prisma_client");
const moment = require("moment");

//CREATE COMMENT
exports.createComment = async (req, res) => {
  const todayDate = moment().format("LL");
  await prisma.comments.create({
    data: {
      name: "test",
      text: "test",
      createdAt: todayDate,
      postId: "test",
    },
  });
};

//DELETE COMMENT
exports.deleteComment = async (req, res) => {
  await prisma.comments.delete({
    where: {
      id: Number(req.params.commentId),
    },
  });
};
