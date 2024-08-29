const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const createAdminUser = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("admin", salt);
  const defaultUser = {
    userName: "admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "admin",
  };

  // Check if the user already exists
  const userExists = await User.findOne({ userName: defaultUser.userName });

  if (!userExists) {
    // Create the default user
    const user = new User(defaultUser);
    await user.save();
    console.log("Default admin user created:", defaultUser.userName);
  } else {
    console.log("Default admin user already exists:", defaultUser.userName);
  }
};

// Run the createDefaultUser function when the server starts
module.exports = createAdminUser;
