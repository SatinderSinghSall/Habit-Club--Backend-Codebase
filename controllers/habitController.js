import Habit from "../models/Habit.js";

//! Create new habit
export const createHabit = async (req, res) => {
  const { name, goal = 21 } = req.body; // default goal to 21

  if (!name) return res.status(400).json({ message: "Name is required" });

  // 👉 Generate milestones based on goal
  // const milestoneFractions = [0.25, 0.5, 0.75, 1.0];
  const milestoneFractions = [1 / goal, 0.25, 0.5, 0.75, 1.0]; // includes day 1

  const milestones = milestoneFractions.map((fraction) => ({
    target: Math.ceil(goal * fraction),
    achievedOn: null,
  }));

  const habit = await Habit.create({
    user: req.user._id,
    name,
    goal,
    milestones, // ✅ Now added
  });

  res.status(201).json(habit);
};

//! Get all habits for user
export const getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id }).sort("-createdAt");
  res.status(200).json(habits);
};

//! Daily check-in
export const checkInHabit = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const habit = await Habit.findOne({ _id: id, user: userId });

  if (!habit) {
    return res.status(404).json({ message: "Habit not found" });
  }

  const today = new Date().toDateString();
  const lastCheck = habit.lastCheckIn
    ? new Date(habit.lastCheckIn).toDateString()
    : null;

  if (today === lastCheck) {
    return res.status(400).json({ message: "Already checked in today!" });
  }

  // Update streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const continuedStreak =
    habit.lastCheckIn &&
    new Date(habit.lastCheckIn).toDateString() === yesterday.toDateString();

  habit.streak = continuedStreak ? habit.streak + 1 : 1;
  habit.lastCheckIn = new Date();
  habit.checkIns.push(new Date());

  // ✅ Auto-mark achieved milestones
  if (habit.milestones?.length) {
    habit.milestones.forEach((m) => {
      if (!m.achievedOn && habit.streak >= m.target) {
        m.achievedOn = new Date();
      }
    });
  }

  await habit.save();

  res.json(habit);
};

//! Getting a habit by id:
export const getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!habit) return res.status(404).json({ error: "Habit not found" });

    res.status(200).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//! Update habit name
export const updateHabit = async (req, res) => {
  const { name, goal } = req.body;

  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!habit) return res.status(404).json({ message: "Habit not found" });

    if (name !== undefined) habit.name = name;
    if (goal !== undefined) {
      habit.goal = goal;

      // Calculate milestone targets based on goal
      const milestoneFractions = [0.25, 0.5, 0.75, 1.0];
      habit.milestones = milestoneFractions.map((fraction) => {
        const target = Math.ceil(goal * fraction);
        const achievedOn =
          habit.checkIns.length >= target
            ? new Date()
            : habit.milestones?.find((m) => m.target === target)?.achievedOn ||
              null;

        return { target, achievedOn };
      });
    }

    await habit.save();
    res.json(habit);
  } catch (err) {
    console.error("Update habit error:", err);
    res.status(500).json({ message: "Server error while updating habit" });
  }
};

//! Delete habit
export const deleteHabit = async (req, res) => {
  await Habit.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: "Habit deleted" });
};
