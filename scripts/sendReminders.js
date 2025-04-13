import "dotenv/config.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import sendEmail from "../utils/sendEmail.js";

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB ✅");
};

const isTodayCheckedIn = (checkIns) => {
  const today = new Date().toDateString();
  return checkIns.some((date) => new Date(date).toDateString() === today);
};

const sendReminders = async () => {
  await connect();

  const users = await User.find({});
  for (const user of users) {
    const habits = await Habit.find({ user: user._id });

    const missedHabits = habits.filter(
      (habit) => !isTodayCheckedIn(habit.checkIns)
    );

    if (missedHabits.length > 0) {
      const habitNames = missedHabits.map((h) => `• ${h.name}`).join("<br/>");

      const html = `
        <h2>Hey ${user.name.split(" ")[0]} 👋</h2>
        <p>You haven't checked in for these habits today:</p>
        <p>${habitNames}</p>
        <p><a href="https://yourapp.com/dashboard">Click here to check in now</a></p>
        <p>Keep going strong! 💪</p>
        <p>– The Habit Club Team</p>
      `;

      await sendEmail(user.email, "⏰ Daily Habit Reminder", html);
      console.log(`Sent reminder to ${user.email}`);
    }
  }

  mongoose.disconnect();
};

export default sendReminders;
