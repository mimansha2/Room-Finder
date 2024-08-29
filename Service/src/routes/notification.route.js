const express = require("express");
const router = express.Router();
const {
  myPostStatus,
  getUnApprovedPosts,
} = require("../controllers/notification.controller");

router.get("/myPostStatus", myPostStatus);
router.get("/getUnApprovedPosts", getUnApprovedPosts);

module.exports = router;
