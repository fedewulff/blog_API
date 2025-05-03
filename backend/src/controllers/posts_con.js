const prisma = require("../prisma_client/prisma_client");
const moment = require("moment");

//GET ALL POSTS
exports.getAllPosts = async (req, res) => {
  const posts = await prisma.posts.findMany();
  res.json({ posts: "test" });
};

//GET SPECIFIC POST
exports.getPost = async (req, res) => {
  const post = await prisma.posts.findUnique({
    where: {
      id: req.params.id,
    },
    include: { comments: true },
  });
  res.json({ post: post });
};

//CREATE POST
exports.createPost = async (req, res) => {
  const todayDate = moment().format("LL");
  await prisma.posts.create({
    data: {
      title: "test",
      text: "test",
      createdAt: todayDate,
      public: "test",
      userId: "test",
    },
  });
};

//UPDATE POST
exports.updatePost = async (req, res) => {
  await prisma.posts.update({
    where: { id: Number(req.params.postId) },
    data: { title: "test" },
  });
};

//DELETE POST
exports.deletePost = async (req, res) => {
  await prisma.posts.delete({
    where: {
      id: Number(req.params.postId),
    },
  });
};
