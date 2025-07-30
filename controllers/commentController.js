import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  const { content } = req.body;
  try {
    const comment = await Comment.create({
      content,
      user: req.user._id,
      project: req.params.id,
    });
    res.status(201).json(comment);
  } catch {
    res.status(500).json({ msg: "Comment failed" });
  }
};

export const getComments = async (req, res) => {
  const comments = await Comment.find({ project: req.params.id }).populate("user", "name");
  res.json(comments);
};
