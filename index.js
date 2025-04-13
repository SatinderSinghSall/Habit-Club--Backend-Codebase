import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import habitRoutes from "./routes/habitRoutes.js";
import sendReminders from "./scripts/sendReminders.js";
import { sendWeeklySummary } from "./jobs/weeklySummaryJob.js";
import friendRoutes from "./routes/friendRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

//! Middleware
app.use(cors());
app.use(express.json());

//! Connect DB
connectDB();

//! Routes
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/users", userRoutes);

//! Automation Reminder:
cron.schedule("0 8 * * *", () => {
  sendReminders(); // runs every day at 8 AM
});

//! Send Weekly Summary:
app.get("/test-weekly-summary", async (req, res) => {
  try {
    await sendWeeklySummary();
    res.send("✅ Weekly summary test email sent!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Failed to send summary.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
