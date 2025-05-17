const prisma = require("../prisma_client/prisma_client")
const moment = require("moment")

//GET ALL POSTS
exports.getAllPosts = async (req, res) => {
  const posts = await prisma.posts.findMany({ where: { userId: req.body } })
  res.json({ posts: posts })
}

//GET SPECIFIC POST
exports.getPost = async (req, res) => {
  const post = await prisma.posts.findUnique({
    where: {
      id: Number(req.params.postId),
    },
    include: { comments: true },
  })
  res.json({ post: post })
}

//CREATE POST
exports.createPost = async (req, res) => {
  const todayDate = moment().format("LL")
  await prisma.posts.create({
    data: {
      title: req.body.title,
      text: req.body.text,
      createdAt: todayDate,
      public: req.body.publish,
      userId: req.body.userId,
    },
  })
  res.json({
    msg: "Post created",
  })
}

//UPDATE POST
exports.updatePost = async (req, res) => {
  await prisma.posts.update({
    where: { id: Number(req.params.postId) },
    data: { title: req.body.title, text: req.body.text, public: req.body.publish },
  })
  res.json({ msg: "Post updated" })
}

//DELETE POST
exports.deletePost = async (req, res) => {
  await prisma.posts.delete({
    where: {
      id: Number(req.params.postId),
    },
  })
  res.json({ msg: "Post deleted" })
}
