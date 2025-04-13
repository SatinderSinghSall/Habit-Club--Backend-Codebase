import express from "express";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendsList,
  getPendingRequests,
  getSentRequests,
  cancelFriendRequest,
  getFriendProgress,
} from "../controllers/friendController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getUserByEmail } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, getFriendsList);

router.get("/requests", protect, getPendingRequests);
router.post("/request/:id", protect, sendFriendRequest);
router.post("/accept/:id", protect, acceptFriendRequest);
router.post("/reject/:id", protect, rejectFriendRequest);
router.get("/email/:email", protect, getUserByEmail);
router.get("/sent", protect, getSentRequests);
router.post("/cancel/:id", protect, cancelFriendRequest);
router.get("/progress/:id", protect, getFriendProgress);

export default router;
