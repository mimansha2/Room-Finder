const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  createUserProfile,
  editUserProfile,
  myProfile,
} = require("../controllers/userProfile.controller");

router.get("", myProfile);
router.get("/:id", getUserProfile);
router.post("", createUserProfile);
router.put("/editUserProfile", editUserProfile);

module.exports = router;
