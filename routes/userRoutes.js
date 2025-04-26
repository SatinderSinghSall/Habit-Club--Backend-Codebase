import express from "express";
import { getUserByEmail } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/email/:email", protect, getUserByEmail);

//! Route to get all users:
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    // Adding status to each user based on their last login (updatedAt)
    const usersWithStatus = users.map((user) => {
      const lastLogin = user.updatedAt; // Assuming updatedAt is the last login timestamp
      const status =
        new Date() - new Date(lastLogin) > 7 * 24 * 60 * 60 * 1000
          ? "Inactive"
          : "Active"; // If more than a week has passed, mark as inactive
      return {
        ...user._doc, // Spread the user data to maintain all original fields
        status, // Add the status field
      };
    });

    res.json(usersWithStatus); // Send the modified user data with the status
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users." });
  }
});

export default router;
