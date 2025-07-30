import express from "express";
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// CORS config
app.use(cors({
  origin: process.env.CLIENT_URL, // e.g., 'https://your-frontend.vercel.app'
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ Add root route for Render health check
app.get("/", (req, res) => {
  res.send("DevConnect API is running ✅");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/comments", commentRoutes);

// MongoDB connection
import connectToMongo from "./config/mongoDb-connect.js";

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectToMongo();
});
