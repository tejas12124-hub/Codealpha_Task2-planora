const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Task = require("../models/Task");
const Notification = require("../models/Notification");
const {
  createTask,
  getAllTasks,
  toggleTaskStatus,
  deleteTask,
  getTasksByProject, 
} = require("../controllers/taskController");

router.get("/", protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

router.get("/project/:projectId", protect, getTasksByProject);

router.post("/", protect, async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      user: req.user.id,
    });

    await Notification.create({
      user: req.user.id,
      message: `New task "${task.title}" created`,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Task creation failed" });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    task.completed = !task.completed;
    await task.save();

    if (task.completed) {
      await Notification.create({
        user: req.user.id,
        message: `Task "${task.title}" completed 🎉`,
      });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Task update failed" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
