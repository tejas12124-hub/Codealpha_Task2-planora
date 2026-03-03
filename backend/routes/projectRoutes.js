const express = require("express");
const Project = require("../models/Project");
const Notification = require("../models/Notification");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
  createProject,
  getProjects,
  deleteProject,
} = require("../controllers/projectController");

router.post("/", protect, async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,        
      description: req.body.description,
      user: req.user.id,
    });

    await Notification.create({
      user: req.user.id,
      message: `New project "${project.title}" created`, 
    });

    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Project creation failed" });
  }
});


router.get("/", protect, async (req, res) => {
  const projects = await Project.find({ user: req.user.id });
  res.json(projects);
});

router.delete("/:id", protect, deleteProject); 

module.exports = router;
