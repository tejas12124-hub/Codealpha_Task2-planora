const Task = require("../models/Task");
const Notification = require("../models/Notification");


exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
      project: null, // ✅ ONLY global tasks
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};


exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId } = req.body;

    const task = await Task.create({
      title,
      description,
      project: projectId || null,
      user: req.user.id,
    });

    await Notification.create({
      user: req.user.id,
      message: `🆕 New task "${task.title}" added`,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Task creation failed" });
  }
};


exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
      project: null,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};


exports.toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const wasCompleted = task.completed;
    task.completed = !task.completed;
    await task.save();

    if (!wasCompleted && task.completed) {
      await Notification.create({
        user: req.user.id,
        message: `✅ Task "${task.title}" completed`,
      });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Task update failed" });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(req.params.id);

    await Notification.create({
      user: req.user.id,
      message: `Task "${task.title}" deleted`,
    });

    res.json({ message: "Task removed" });
  } catch (err) {
    res.status(500).json({ message: "Task deletion failed" });
  }
};
