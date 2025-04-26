import express from "express";
import { loginAdmin, getAdmins } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/list", getAdmins);

export default router;
