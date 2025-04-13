import cron from "node-cron";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import sendEmail from "../utils/sendEmail.js";
import generateWeeklySummaryEmail from "../utils/templates/weeklySummaryEmail.js";

export const sendWeeklySummary = async () => {
  const users = await User.find();

  console.log(
    "📋 All user emails:",
    users.map((u) => u.email)
  );
  for (const user of users) {
    if (
      !user.email ||
      typeof user.email !== "string" ||
      !user.email.includes("@")
    ) {
      console.warn(
        `⚠️ Skipping user ${user._id} — invalid or missing email: ${user.email}`
      );
      continue;
    }

    const habits = await Habit.find({ user: user._id });

    const totalHabits = habits.length;
    const highestStreak = Math.max(...habits.map((h) => h.streak || 0), 0);

    const missedCheckIns = habits.reduce((count, habit) => {
      const last = habit.lastCheckIn ? new Date(habit.lastCheckIn) : null;
      const daysSince = last
        ? Math.floor((Date.now() - last) / (1000 * 60 * 60 * 24))
        : 7;
      return count + (daysSince > 0 ? 1 : 0);
    }, 0);

    const html = generateWeeklySummaryEmail({
      name: user.name?.split(" ")[0] || "there",
      totalHabits,
      highestStreak,
      missedCheckIns,
    });

    console.log(`📤 Preparing to send summary to: ${user.email}`);
    await sendEmail({
      to: user.email,
      subject: "📊 Your Weekly Habit Summary",
      html,
    });

    console.log(`✅ Sent summary to ${user.email}`);
  }
};

//! ⏰ Every Monday at 8am
cron.schedule("0 8 * * 1", () => {
  console.log("📅 Sending weekly summaries...");
  sendWeeklySummary();
});
