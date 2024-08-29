const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  likePost,
  unLikePost,
  reportPost,
  unReportPost,
  getPostByUserId,
  editPost,
  deletePost,
  getUnapprovedPosts,
  approvePost,
  rejectPost,
  getReportedPosts,
  myPostStatus,
} = require("../controllers/post.controller");
const checkRole = require("../helper/checkRole");

router.get("/", getPosts);
router.post("/create", createPost);
router.get("/getUnapprovedPosts", checkRole("admin"), getUnapprovedPosts);
router.get("/getReportedPosts", checkRole("admin"), getReportedPosts);
router.delete("/:id", deletePost);
router.get("/:id", getPostById);
router.get("/getByUserId/:userName", getPostByUserId);
router.put("/editPost", editPost);
router.put("/like", likePost);
router.put("/unlike", unLikePost);
router.put("/report", reportPost);
router.put("/unreport", unReportPost);
router.patch("/approve", checkRole("admin"), approvePost);
router.patch("/reject", checkRole("admin"), rejectPost);

module.exports = router;
