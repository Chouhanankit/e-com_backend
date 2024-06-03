const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password , phone } = req.body;

  // check if all fields are coming

  if (!name || !email || !password ||!phone) {
    res.status(400);
    throw new Error("please fill all fields");
  }
  // check if user already exists

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  // hashed password

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedpassword,
    phone,
  });

  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      password: user.password,
      phone : user.phone,
      token: generateToken(user._id),
    }).select("-password","-token");
  } else {
    res.status(400);
    throw new Error("cannot register user");
  }

  res.send(user);
  // console.log(req.body)
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  const user = await User.findOne({ email: email });

  // Check User & Pass

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    user.isAdmin
      ? res.json({
          id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
          isAdmin: user.isAdmin,
        })
      : res.json({
          id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

const logout = async (req, res) => {
  req.logout();
  res.redirect("/login"); // Redirect to the home page or any other page after logout
  res.send("logout");
};

// protected route example

const getme = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords from response
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// generte token

const generateToken = (id) => {
  return jwt.sign({ id: id }, "abc123", {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, login, logout, getme , getAllUsers };