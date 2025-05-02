import express from "express";
import {
  submitContactForm,
  getAllMessages,
  deleteContactMessage,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitContactForm);
router.get("/", getAllMessages);
router.delete("/:id", deleteContactMessage);

export default router;
