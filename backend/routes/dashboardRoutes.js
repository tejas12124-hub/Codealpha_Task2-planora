const express = require("express");
const Project = require("../models/Project");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", auth, async (req, res) => {
  try {
    const projects = await Project.countDocuments({ user: req.user.id });
    const tasks = await Task.countDocuments({ user: req.user.id });
    const completed = await Task.countDocuments({
      user: req.user.id,
      status: "completed",
    });

    res.json({
      projects,
      tasks,
      completed,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
});

module.exports = router;
