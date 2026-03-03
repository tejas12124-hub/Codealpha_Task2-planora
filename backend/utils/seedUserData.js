const Project = require("../models/Project");
const Task = require("../models/Task");
const Notification = require("../models/Notification");

const seedUserData = async (userId) => {
  // prevent duplicate seeding
  const existingProjects = await Project.find({ user: userId });
  if (existingProjects.length > 0) return;

  // 🟣 Projects
  const project1 = await Project.create({
    title: "Welcome to Planora",
    description: "Learn how Planora works",
    user: userId,
  });

  const project2 = await Project.create({
    title: "Sample Work Project",
    description: "Demo project for practice",
    user: userId,
  });

  // 🟣 Tasks
  await Task.insertMany([
    {
      title: "Explore dashboard",
      project: project1._id,
      user: userId,
    },
    {
      title: "Create your first project",
      project: project1._id,
      user: userId,
    },
    {
      title: "Add tasks to a project",
      project: project2._id,
      user: userId,
    },
    {
      title: "Complete a task",
      project: project2._id,
      user: userId,
    },
  ]);

  // 🟣 Notifications
  await Notification.insertMany([
    {
      user: userId,
      message: "🎉 Welcome to Planora!",
    },
    {
      user: userId,
      message: "📌 You can create projects & tasks",
    },
    {
      user: userId,
      message: "✅ Complete tasks to stay productive",
    },
  ]);
};

module.exports = seedUserData;
