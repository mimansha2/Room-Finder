const Post = require("../models/posts.model");

const myPostStatus = async (req, res) => {
  try {
    console.log("userName", req.user.userName);
    const myActivePosts = await Post.find({
      userName: req.user.userName,
      isActive: true,
      isDeleted: false,
    });
    const myRejectedPosts = await Post.find({
      userName: req.user.userName,
      isActive: false,
      isDeleted: true,
    });
    const myPosts = [...myActivePosts, ...myRejectedPosts];
    res.status(200).json({ data: myPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUnApprovedPosts = async (req, res) => {
  try {
    const unapprovedPostById = await Post.find({
      userName: req.user.userName,
      isActive: false,
      isDeleted: false,
    }).sort("-createdAt");
    res.status(200).json({ data: unapprovedPostById });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

module.exports = {
  myPostStatus,
  getUnApprovedPosts,
};
