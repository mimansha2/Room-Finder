const Post = require("../models/posts.model");

const getPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({ isActive: true }).sort("-createdAt");
    res.status(200).json({ data: allPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const getPostById = async (req, res) => {
  try {
    const postById = await Post.findOne({ _id: req.params.id });
    res.status(200).json({ data: postById });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const getPostByUserId = async (req, res) => {
  try {
    const postByUserId = await Post.find({
      userName: req.params.userName,
      isActive: true,
    });
    if (postByUserId.length === 0) {
      res.status(200).json({ data: null, message: "No data found" });
      return;
    }
    res
      .status(200)
      .json({ data: postByUserId, message: "Post fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      userName: req.user.userName,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const editPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.body.id, req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const likePost = async (req, res) => {
  try {
    const likePostResponse = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user.userName },
      },
      {
        new: true,
      }
    );
    res.status(200).json(likePostResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unLikePost = async (req, res) => {
  try {
    const unLikePostResponse = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user.userName },
      },
      {
        new: true,
      }
    );
    res.status(200).json(unLikePostResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const reportPost = async (req, res) => {
  try {
    const reportPostResponse = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { reports: req.user.userName },
      },
      {
        new: true,
      }
    );
    res.status(200).json(reportPostResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unReportPost = async (req, res) => {
  try {
    const unReportPostResponse = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { reports: req.user.userName },
      },
      {
        new: true,
      }
    );
    res.status(200).json(unReportPostResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      isActive: false,
      isDeleted: true,
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUnapprovedPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({
      isActive: false,
      isDeleted: false,
    }).sort("-createdAt");
    if (allPosts.length === 0) {
      res.status(200).json({ data: null, message: "No data found" });
      return;
    }
    res.status(200).json({
      data: allPosts,
      message: "Fetched unapproved data successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const approvePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.body.postId, { isActive: true });
    res.status(200).json({ message: "Post approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectPost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.body.postId, {
      isActive: false,
      isDeleted: true,
    });
    res.status(200).json({ message: "Post removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReportedPosts = async (req, res) => {
  try {
    const response = await Post.find({
      isActive: true,
    }).sort("-createdAt");
    if (response.length === 0) {
      res.status(200).json({ data: null, message: "No data found" });
      return;
    }

    const allReportedPosts = response.filter((x) => x.reports.length > 0);

    res.status(200).json({
      data: allReportedPosts,
      message: "Fetched unapproved data successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  getPostByUserId,
  likePost,
  unLikePost,
  reportPost,
  unReportPost,
  editPost,
  deletePost,
  getUnapprovedPosts,
  getReportedPosts,
  approvePost,
  rejectPost,
};
