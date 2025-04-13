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

const router = express.Router();

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
