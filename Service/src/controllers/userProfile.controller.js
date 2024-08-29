const User = require("../models/user.model");
const UserProfile = require("../models/userProfile.model");

const myProfile = async (req, res) => {
  try {
    const userProfileById = await UserProfile.findOne({
      userName: req.user.userName,
      isActive: true,
    });

    if (!userProfileById) {
      res.status(200).json({ data: null, message: "User profile not found" });
      return;
    }
    res.status(200).json({ data: userProfileById });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userProfileById = await UserProfile.findOne({
      userId: req.params.id,
      isActive: true,
    });

    if (!userProfileById) {
      res.status(200).json({ data: null, message: "User profile not found" });
      return;
    }
    res.status(200).json({ data: userProfileById });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const createUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.create(req.body);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const editUserProfile = async (req, res) => {
  try {
    const post = await UserProfile.findByIdAndUpdate(req.body.id, req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

module.exports = {
  getUserProfile,
  createUserProfile,
  editUserProfile,
  myProfile,
};
