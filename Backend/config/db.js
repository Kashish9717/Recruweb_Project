import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI missing in .env file");
    }

    await mongoose.connect(uri);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;