const { Router } = require("express");
const routes = Router();
const signup_con = require("../controllers/signup_con");
const login_con = require("../controllers/login_con");
const logout_con = require("../controllers/logout_con");
const refreshToken_con = require("../controllers/refreshToken_con");
const posts_con = require("../controllers/posts_con");
const comments_con = require("../controllers/comments_con");
const passport = require("passport");
require("../middleware/authentication");
const authenticateToken = require("../middleware/verifyJWT");

//HOME
routes.get("/posts", posts_con.getAllPosts);
//POST
routes.get("/posts/:postId", posts_con.getPost);
routes.post("/posts", posts_con.createPost);
routes.put("/posts/:postId", posts_con.updatePost);
routes.delete("/posts/:postId", posts_con.deletePost);
//COMMENTS
routes.post("/posts/:postId/comments", comments_con.createComment);
routes.delete("/posts/:postId/comments/:commentId", comments_con.deleteComment);

//USER
// routes.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
//   return res.json({ user: "userpassport" });
// });
routes.get("/admin/profile", authenticateToken, (req, res) => {
  return res.json({ user: req.user });
});
routes.post("/admin/login", login_con.adminLogInPost);
routes.get("/admin/refresh", refreshToken_con.handleRefreshToken);
// routes.get("/admin/signup");
routes.post("/admin/signup", signup_con.adminSignUpPost);

//LOG OUT
routes.post("/admin/logout", logout_con.logout);

module.exports = routes;
