// Correct way to export dbConnect function
import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Load env variables from .env file manually
dotenv.config();

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) return;

  const MONGO_URI = process.env.MONGO_URI; // <-- now this works!

  if (!MONGO_URI) {
    throw new Error("❌ MONGO_URI not found in environment variables.");
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "happyHoursDB",
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected:", db.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
};
