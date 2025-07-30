import express from "express";
import { createProject, getAllProjects, getProject } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", getAllProjects);
router.get("/:id", getProject);

export default router;
