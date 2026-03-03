const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Notification = require("../models/Notification");


router.get("/", protect, async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(notifications);
});

router.put("/read", protect, async (req, res) => {
  await Notification.updateMany(
    { user: req.user.id },
    { read: true }
  );

  res.json({ message: "Notifications marked as read" });
});

router.delete("/clear", protect, async (req, res) => {
  await Notification.deleteMany({ user: req.user.id });
  res.json({ message: "Notifications cleared" });
});

module.exports = router;
