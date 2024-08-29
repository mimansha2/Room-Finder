const Post = require("../models/posts.model");

const getPublicPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({ isActive: true }).sort("-createdAt");
    res
      .status(200)
      .json({ data: allPosts, message: "Fetched data successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const getPublicPostById = async (req, res) => {
  try {
    const allPosts = await Post.findOne({
      _id: req.params.id,
      isActive: true,
    }).sort("-createdAt");
    res
      .status(200)
      .json({ data: allPosts, message: "Fetched data successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

module.exports = {
  getPublicPosts,
  getPublicPostById,
};
