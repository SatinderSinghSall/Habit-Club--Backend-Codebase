import express from "express";
import { getUserByEmail } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/email/:email", protect, getUserByEmail);

export default router;
