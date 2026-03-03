const Project = require("../models/Project");
const Task = require("../models/Task");
const Notification = require("../models/Notification");

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Project creation failed" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Task.deleteMany({ project: project._id });

 
    await project.deleteOne();

  
    await Notification.create({
      user: req.user.id,
      message: `🗑️ Project "${project.title}" deleted`,
    });

    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Project deletion failed" });
  }
};