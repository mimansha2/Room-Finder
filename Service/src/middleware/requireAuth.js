const jwt = require("jsonwebtoken");
const user = require("../models/user.model");
const { default: axios } = require("axios");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  const decoded = jwt.decode(token, { complete: true });

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getUserNickName = async () => {
    try {
      const response = await axios.get(
        "https://dev-wrrbp4yvtky71znh.us.auth0.com/userinfo",
        config
      );

      const { data } = response;
      req.user = {
        userName: data.nickname,
        permissions: decoded.payload.permissions,
      };
      next();
    } catch (error) {
      console.error("err", error);
    }
  };

  getUserNickName();

  // axios
  //   .get("https://dev-u78k2kin20rm4026.us.auth0.com/userinfo", config)
  //   .then((res) => {
  //     console.log("username", res.data.nickname);
  //     console.log("response", res.data);
  //   });

  // console.log("decoded", decoded);

  // try {
  //   const decodedToken = jwt.verify(
  //     token,
  //     "Yn_MeYzE1XtR_YY-wF97m6PMtqpTJYNq3JUF_Zw9W14jhE3L5teNTP9TMGpn6Cyq"
  //   );

  //   console.log("decodedToken", decodedToken);
  //   const { id: _id } = decodedToken;
  //   console.log("_id", _id);

  //   const useridExists = await user.findOne({ _id });
  //   if (!useridExists) {
  //     res.status(404).json({ error: "User not found" });
  //     return;
  //   }

  //   console.log("useridExists", useridExists);

  //   req.user = { _id: useridExists._id, role: useridExists.role };
  //   next();
  // } catch (error) {
  //   console.log("Error while authenticating : ", error);
  //   return res.status(401).json({ error: "Request is not authorized" });
  // }
};

module.exports = requireAuth;
