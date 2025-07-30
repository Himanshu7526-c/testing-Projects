import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch {
    res.status(404).json({ msg: "User not found" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { ...req.body },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
};

export const searchUsers = async (req, res) => {
  const q = req.query.q;
  const users = await User.find({
    name: { $regex: q, $options: "i" },
  }).select("-password");
  res.json(users);
};
