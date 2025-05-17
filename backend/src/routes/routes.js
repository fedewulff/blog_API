const { Router } = require("express")
const routes = Router()
const signup_con = require("../controllers/signup_con")
const login_con = require("../controllers/login_con")
const logout_con = require("../controllers/logout_con")
const refreshToken_con = require("../controllers/refreshToken_con")
const posts_con = require("../controllers/posts_con")
const comments_con = require("../controllers/comments_con")
const authenticateToken = require("../middleware/verifyJWT")

//GET ALL POSTS
routes.get("/posts", posts_con.getAllPosts)
//GET SINGLE POST
routes.get("/posts/:postId", posts_con.getPost)
//CREATE POST
routes.post("/posts", posts_con.createPost)
//UPDATE POST
routes.put("/posts/:postId", posts_con.updatePost)
//DELETE POST
routes.delete("/posts/:postId", posts_con.deletePost)
//CREATE COMMENT
routes.post("/posts/:postId/comments", comments_con.createComment)
//DELETE COMMENT
routes.delete("/posts/:postId/comments/:commentId", comments_con.deleteComment)
//ADMIN LOGIN
routes.post("/admin/login", login_con.adminLogInPost)
//ADMIN PROFILE
routes.get("/admin/profile", authenticateToken, login_con.adminProfile)
//GET REFRESH TOKEN
routes.get("/admin/refresh", refreshToken_con.handleRefreshToken)
//ADMIN SIGNUP
routes.post("/admin/signup", signup_con.adminSignUpPost)
//ADMIN LOGOUT
routes.post("/admin/logout", logout_con.logout)

module.exports = routes

// routes.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
//   return res.json({ user: "userpassport" });
// });
