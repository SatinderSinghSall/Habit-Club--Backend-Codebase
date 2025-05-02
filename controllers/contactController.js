import ContactMessage from "../models/ContactMessage.js";
import sendEmail from "../utils/sendEmail.js";
import contactEmail from "../utils/templates/contactEmail.js";
import contactConfirmationEmail from "../utils/templates/contactConfirmationEmail.js";

export const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // 1. Save the message to MongoDB:
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    // 2. Send email to your support/admin inbox:
    await sendEmail({
      to: process.env.SUPPORT_EMAIL,
      subject: "New Contact Form Submission",
      html: contactEmail({ name, email, message }),
    });

    // 3. Send confirmation email to the user:
    await sendEmail({
      to: email,
      subject: "We've received your message!",
      html: contactConfirmationEmail(name),
    });

    // 4. Respond to client:
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

//! Delete a contact message
export const deleteContactMessage = async (req, res) => {
  const { id } = req.params;

  try {
    // Correct model: use ContactMessage for deleting
    const contact = await ContactMessage.findByIdAndDelete(id);

    // Check if the contact was found
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact", error });
  }
};
