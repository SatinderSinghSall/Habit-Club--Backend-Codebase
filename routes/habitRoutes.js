import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createHabit,
  getHabits,
  checkInHabit,
  getHabitById,
  updateHabit,
  deleteHabit,
} from "../controllers/habitController.js";
import Habit from "../models/Habit.js";

const router = express.Router();

router.get("/public", async (req, res) => {
  try {
    const habits = await Habit.find()
      .populate("user", "name") // Populate only the 'name' field from User
      .exec();

    res.status(200).json(habits);
  } catch (err) {
    console.error("Error fetching public habits:", err);
    res.status(500).json({ message: "Error fetching public habits" });
  }
});

//! DELETE a habit by ID
router.delete("/:id", async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting habit" });
  }
});

router.use(protect); //! All below routes require auth

router.post("/", createHabit);
router.get("/", getHabits);
router.get("/:id", getHabitById);
router.put("/:id/checkin", checkInHabit);

//! PUT /api/habits/:id
router.put("/:id", updateHabit);

//! DELETE /api/habits/:id
router.delete("/:id", deleteHabit);

export default router;
