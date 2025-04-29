import express from "express";
import {
  loginAdmin,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/list", getAdmins);
router.post("/", createAdmin); //! Create an admin
router.put("/:id", updateAdmin); //! Update admin
router.delete("/:id", deleteAdmin); //! Delete admin

export default router;
