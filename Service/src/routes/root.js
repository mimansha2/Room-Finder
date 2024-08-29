const postRoute = require("./post.route");
const signupRoute = require("./signup.route");
const loginRoute = require("./login.route");
const userProfileRoute = require("./userProfile.route");
const notificationRoute = require("./notification.route");
const express = require("express");
const router = express.Router();

router.use("/signup", signupRoute);
router.use("/login", loginRoute);
router.use("/posts", postRoute);
router.use("/userProfile", userProfileRoute);
router.use("/notification", notificationRoute);

module.exports = router;
