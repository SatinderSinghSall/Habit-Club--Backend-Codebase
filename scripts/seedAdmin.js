import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const seedAdmin = async () => {
  const email = "satindersinghsall111@gmail.com";
  const plainPassword = "Satinder_Admin@123";
  const name = "Satinder Singh Sall";

  try {
    const existing = await Admin.findOne({ email });

    if (existing) {
      console.log("⚠️ Admin already exists!");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("✅ Admin created:", newAdmin.email);
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
