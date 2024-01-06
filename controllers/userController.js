const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../config/generateToken");

const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User exists" });
    return;
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      message: "Signup successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "User not found" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  const token = generateToken(userExists._id);
  res.cookie("token", token, { httpOnly: true, secure: process.env.JWT_SECRET });
  if (userExists && (await userExists.matchPassword(password))) {
    res.json({
      message: "Login successful. Start chatting",
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
      token: generateToken(userExists._id),
    });
  } else {
    res.status(401).json({ message: "Wrong credentials." });
  }
});

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

module.exports = { signupUser, loginUser, logoutUser };
