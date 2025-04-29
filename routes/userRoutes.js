import express from "express";
import { getUserByEmail } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import bcrypt from "bcryptjs";
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

//! Route to add new user:
router.post("/", async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    // Optional: exclude password from response
    const { password: _, ...userData } = savedUser._doc;
    res.status(201).json(userData);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Error creating user." });
  }
});

//! PUT /users/:id - To update a User:
router.put("/:id", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();
    const { password: _, ...userData } = updatedUser._doc;

    res.json(userData);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user" });
  }
});

//! DELETE /users/:id - To delete a User:
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default router;
