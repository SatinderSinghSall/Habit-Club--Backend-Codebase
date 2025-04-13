import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Habit name is required"],
    },
    streak: {
      type: Number,
      default: 0,
    },
    lastCheckIn: {
      type: Date,
    },
    checkIns: {
      type: [Date],
      default: [],
    },

    //! Goal and milestones
    goal: {
      type: Number,
      default: 21, // You can adjust this default
    },
    milestones: [
      {
        target: Number, // Milestone number (e.g., 5, 10, etc.)
        achievedOn: Date,
      },
    ],
  },
  { timestamps: true }
);

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;
