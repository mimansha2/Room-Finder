const { createSecretToken } = require("../helper/SecretToken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  try {
    const userExists = await User.findOne({
      userName: req.body.userName,
    });

    if (!userExists) {
      res.status(404).json({ message: "Invalid username" });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userExists.password
    );

    if (!validPassword) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    const token = createSecretToken(userExists._id, userExists.role);

    res.status(200).json({
      userId: userExists._id,
      userName: userExists.userName,
      email: userExists.email,
      role: userExists.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const createUser = async (req, res) => {
  try {
    //Check if username already exists
    const ifUsernameExists = await User.findOne({
      userName: req.body.userName,
    });
    if (ifUsernameExists) {
      res.status(500).json({ message: "Username already exists" });
      return;
    }

    //Check if email already exists
    const ifEmailExists = await User.findOne({
      email: req.body.email,
    });
    if (ifEmailExists) {
      res.status(500).json({ message: "Email already exists" });
      return;
    }

    // No need to check validation here because username and email are unique properties.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = { ...req.body, password: hashedPassword };

    const postUserDetails = await User.create(newUser);
    const token = createSecretToken(postUserDetails._id, postUserDetails.role);

    res.status(201).json({
      userId: postUserDetails._id,
      userName: postUserDetails.userName,
      email: postUserDetails.email,
      role: postUserDetails.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

module.exports = { loginUser, createUser };
