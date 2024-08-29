const express = require("express");
const cors = require("cors");
const app = express();
const { connectDB } = require("./src/helper/connectDb");
const router = require("./src/routes/root");
const requireAuth = require("./src/middleware/requireAuth");
const createAdminUser = require("./src/helper/createAdminUser");

const { auth } = require("express-oauth2-jwt-bearer");
const {
  getPublicPosts,
  getPublicPostById,
} = require("./src/controllers/publicPostController");

app.use(cors());
app.use(express.json());

// Routes
createAdminUser();

const jwtCheck = auth({
  audience: "RoomFinderBackend",
  issuerBaseURL: "https://dev-wrrbp4yvtky71znh.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// FOR PUBLIC API
app.get("/api/public", getPublicPosts);
app.get("/api/public/post/:id", getPublicPostById);

// enforce on all endpoints
app.use(jwtCheck);

app.use(requireAuth);
app.use("/api", router);

// app.use("/Post", (req, res) => {
//   return res.json({ message: "Post Working" });
// });

// app.use("", (req, res) => {
//   return res.json({ message: "Working" });
// });

// app.use("/api/posts", postRoute);

app.listen(8000, () => {
  console.log("Node API is running");
});

connectDB();
