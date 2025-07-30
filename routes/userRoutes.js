import express from "express";
import { getUser, updateUser, searchUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", searchUsers);
router.get("/:id", getUser);
router.put("/update", protect, updateUser);

export default router;
