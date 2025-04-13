import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

import sendEmail from "../utils/sendEmail.js";
import welcomeEmail from "../utils/templates/welcomeEmail.js";

// ===================== SIGNUP =====================
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  //! Basic input validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please provide name, email, and password",
    });
  }

  try {
    //! Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already registered. Try logging in!" });
    }

    //! Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //! Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //! Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Account created successfully 🎉",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });

    //! Onboarding Email:
    await sendEmail({
      to: email,
      subject: "🎉 Welcome to Habit Club!",
      html: welcomeEmail(name),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// ===================== LOGIN =====================
export const login = async (req, res) => {
  const { email, password } = req.body;

  //! Input validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  try {
    //! Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with that email" });
    }

    //! Compare entered password with hashed one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }

    //! Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful ✨",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

//! Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
