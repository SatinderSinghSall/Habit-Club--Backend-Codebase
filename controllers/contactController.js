import ContactMessage from "../models/ContactMessage.js";

export const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save(); // 👈 Save into MongoDB

    res.status(200).json({ message: "Thank you for contacting us!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong. Try again later." });
  }
};

//! Get all the users chat:
export const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
};
