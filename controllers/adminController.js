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

//! Controller for creating a new admin
export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  // ✅ ADD THIS VALIDATION CHECK
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "All fields (name, email, password) are required." });
  }

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists." });
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json(newAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

//! Update Admin:
export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const admin = await Admin.findById(id);
    if (!admin) return res.status(404).json({ message: "Admin not found." });

    admin.name = name || admin.name;
    admin.email = email || admin.email;

    const updatedAdmin = await admin.save();
    res.json(updatedAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

//! Delete Admin:
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    await Admin.findByIdAndDelete(id); // use this instead of admin.remove()

    res.json({ message: "Admin deleted successfully." });
  } catch (err) {
    console.error("Delete admin error:", err);
    res.status(500).json({ message: "Server error deleting admin." });
  }
};
