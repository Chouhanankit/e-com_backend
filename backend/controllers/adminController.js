const asyncHandler = require("express-async-handler");
const User = require("../models/usermodel");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").select("-isAdmin");

  if (!users) {
    res.status(404);
    throw new Error("Users Not Found!!");
  }

  res.status(200).json(users);
});

module.exports = { getAllUsers };
