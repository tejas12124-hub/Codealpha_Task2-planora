const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments({
      user: req.user.id,
    });

    const pendingTasks = await Task.countDocuments({
      user: req.user.id,
      status: "pending",
    });

    const notifications = 0; 
    res.json({
      totalProjects,
      pendingTasks,
      notifications,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};

module.exports = { getDashboardStats };
