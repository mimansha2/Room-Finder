const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = mongoose.Schema(
  {
    userName: {
      // type: Schema.Types.ObjectId,
      type: String,
      ref: "UserProfile",
      required: "User is required",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    bedroom: {
      type: Number,
      required: [true, "Bedroom count is required"],
    },
    hall: {
      type: Number,
      required: [true, "Hall count is required"],
    },
    kitchen: {
      type: Number,
      required: [true, "Kitchen count is required"],
    },
    bikeParking: {
      type: Number,
      required: [true, "Bike parking count is required"],
    },
    carParking: {
      type: Number,
      required: [true, "Car parking count is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: Array,
      required: [true, "Image is required"],
    },
    likes: [{ type: String }],
    reports: [{ type: String }],
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
