import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
  httpOnly: true,        // prevents access from JS
  secure: true,          // must be true in HTTPS (Vercel + Render use HTTPS)
  sameSite: "None",      // required for cross-site cookies
  maxAge: 7 * 24 * 60 * 60 * 1000, // optional: 7-day expiry
});

    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
  httpOnly: true,        // prevents access from JS
  secure: true,          // must be true in HTTPS (Vercel + Render use HTTPS)
  sameSite: "None",      // required for cross-site cookies
  maxAge: 7 * 24 * 60 * 60 * 1000, // optional: 7-day expiry
});

    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch {
    res.status(500).json({ msg: "Login failed" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out" });
};

export const checkUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json(user);
};