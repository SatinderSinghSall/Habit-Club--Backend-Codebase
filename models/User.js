import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    //! Social features
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sentRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
