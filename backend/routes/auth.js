const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hash,
    role,
  });

  await user.save();
  res.json("Registered");
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).json("Wrong password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );
  res.json({ token, role: user.role });
});

// REQUEST RESET
router.post("/forgot", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json("Not found");

  const token = crypto.randomBytes(20).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000;
  await user.save();

  res.json({ token });
});

// RESET PASSWORD
router.post("/reset/:token", async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json("Invalid token");

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  res.json("Password updated");
});

module.exports = router;
