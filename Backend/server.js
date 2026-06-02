import app from "./app.js";
import connectDB from "./config/db.js";
import { initializeAdmin } from "./controllers/authController.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("Starting server...");

    await connectDB();   // MUST NOT HANG

    console.log("DB OK");

    await initializeAdmin(); // TEMPORARY COMMENT TEST (see step below)

    console.log("Admin OK");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Startup failed:", err.message);
    process.exit(1);
  }
};

startServer();