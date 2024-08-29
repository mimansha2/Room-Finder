const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProfileSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    firstName: { type: String, required: [true, "Firstname is required"] },
    lastName: { type: String, required: [true, "Lastname is required"] },
    gender: { type: String, required: [true, "Gender is required"] },
    mobileNo: { type: String, required: [true, "Mobile number is required"] },
    bio: { type: String, required: [true, "Bio is required"] },
    nationality: { type: String, required: [true, "Nationality is required"] },
    profilePic: {
      type: String,
      required: [true, "Profile picture is required"],
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
