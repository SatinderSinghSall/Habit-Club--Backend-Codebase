import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdmins = async (req, res) => {
  try {
    // Find all admins
    const admins = await Admin.find().select("name email role"); // Adjust based on actual fields in Admin model

    res.json(admins);
  } catch (error) {
    console.error("Failed to fetch admins:", error);
    res.status(500).json({ message: "Server error fetching admins." });
  }
};
