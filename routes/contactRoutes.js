import express from "express";
import {
  submitContactForm,
  getAllMessages,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitContactForm);
router.get("/", getAllMessages);

export default router;
