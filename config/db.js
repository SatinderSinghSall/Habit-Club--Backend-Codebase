import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB database connected");
  } catch (error) {
    console.error("❌ MongoDB database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
