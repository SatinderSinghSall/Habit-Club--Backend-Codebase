import express from "express";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import ContactMessage from "../models/ContactMessage.js";
import Admin from "../models/Admin.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalHabits = await Habit.countDocuments();
    const totalMessages = await ContactMessage.countDocuments();
    const totalAdmin = await Admin.countDocuments();

    const users = await User.find(); // Fetch all users

    let activeUsers = 0;
    let inactiveUsers = 0;

    users.forEach((user) => {
      const lastLogin = user.updatedAt;
      const isActive =
        new Date() - new Date(lastLogin) <= 7 * 24 * 60 * 60 * 1000;
      if (isActive) {
        activeUsers++;
      } else {
        inactiveUsers++;
      }
    });

    res.json({
      totalUsers,
      totalHabits,
      activeUsers,
      inactiveUsers,
      newMessages: totalMessages,
      totalAdmin,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    res.status(500).json({ message: "Server error fetching dashboard stats." });
  }
});

export default router;
