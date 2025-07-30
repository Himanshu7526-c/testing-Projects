import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  const { title, description, link } = req.body;
  try {
    const project = await Project.create({
      user: req.user._id,
      title,
      description,
      link,
    });
    res.status(201).json(project);
  } catch {
    res.status(500).json({ msg: "Project creation failed" });
  }
};

export const getAllProjects = async (req, res) => {
  const q = req.query.q;
  let filter = {};
  if (q) {
    filter.title = { $regex: q, $options: "i" };
  }

  const projects = await Project.find(filter).populate("user", "name");
  res.json(projects);
};

export const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id).populate("user", "name");
  if (!project) return res.status(404).json({ msg: "Project not found" });
  res.json(project);
};
