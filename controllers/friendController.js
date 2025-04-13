import User from "../models/User.js";
import Habit from "../models/Habit.js";

//! 📤 Send friend request
export const sendFriendRequest = async (req, res) => {
  const fromUser = req.user._id;
  const toUser = req.params.id;

  if (fromUser.toString() === toUser)
    return res.status(400).json({ message: "You cannot add yourself." });

  const recipient = await User.findById(toUser);
  if (!recipient) return res.status(404).json({ message: "User not found." });

  if (recipient.friendRequests.includes(fromUser))
    return res.status(400).json({ message: "Request already sent." });

  if (recipient.friends.includes(fromUser))
    return res.status(400).json({ message: "Already friends." });

  recipient.friendRequests.push(fromUser);
  await recipient.save();

  res.status(200).json({ message: "Friend request sent!" });
};

//! ✅ Accept friend request
export const acceptFriendRequest = async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const senderId = req.params.id;

  if (!currentUser.friendRequests.includes(senderId))
    return res.status(400).json({ message: "No request from this user." });

  // Add each other as friends
  currentUser.friends.push(senderId);
  currentUser.friendRequests = currentUser.friendRequests.filter(
    (id) => id.toString() !== senderId
  );
  await currentUser.save();

  const sender = await User.findById(senderId);
  sender.friends.push(req.user._id);
  await sender.save();

  res.status(200).json({ message: "Friend request accepted." });
};

//! ❌ Reject friend request
export const rejectFriendRequest = async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const senderId = req.params.id;

  currentUser.friendRequests = currentUser.friendRequests.filter(
    (id) => id.toString() !== senderId
  );
  await currentUser.save();

  res.status(200).json({ message: "Friend request rejected." });
};

//! 👥 Get user's friend list
export const getFriendsList = async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "friends",
    "name email"
  );
  res.status(200).json(user.friends);
};

//! 📬 Get incoming friend requests
export const getPendingRequests = async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "friendRequests",
    "name email"
  );
  res.status(200).json(user.friendRequests);
};

//! 🕒 Get pending friend requests the user has sent
export const getSentRequests = async (req, res) => {
  const sentRequests = await User.find({
    friendRequests: req.user._id,
  }).select("name email");

  res.status(200).json(sentRequests);
};

//! ❌ Cancel a sent friend request
export const cancelFriendRequest = async (req, res) => {
  const senderId = req.user._id;
  const receiverId = req.params.id;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove from both sent and received arrays
    sender.sentRequests.pull(receiverId);
    receiver.friendRequests.pull(senderId);

    await sender.save();
    await receiver.save();

    res.status(200).json({ message: "Friend request canceled" });
  } catch (err) {
    console.error("Cancel request failed", err);
    res.status(500).json({ message: "Server error" });
  }
};

//! Friends Progress:
export const getFriendProgress = async (req, res) => {
  try {
    const friendId = req.params.id;

    // Get all habits tied to this friend
    const progress = await Habit.find({ user: friendId });

    res.json(progress);
  } catch (err) {
    console.error("Error in getFriendProgress:", err.message);
    res.status(500).json({ message: "Failed to fetch friend’s progress" });
  }
};
