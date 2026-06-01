import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import connectDB from "./config/db.js";

// ROUTES
import contactRoutes from "./routes/contactRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import getStartedRoutes from "./routes/getStartedRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import aiChatRoutes from "./routes/aiChatRoutes.js";
import formRoutes from "./routes/formRoutes.js";

import { initializeAdmin } from "./controllers/authController.js";

dotenv.config();

// ========================
// EXPRESS APP
// ========================
const app = express();

// ========================
// __dirname FIX FOR ES MODULES
// ========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ========================
// DATABASE CONNECTION
// ========================
connectDB();

// ========================
// INITIALIZE ADMIN
// ========================
(async () => {
  try {
    await initializeAdmin();
    console.log("✅ Admin initialized");
  } catch (error) {
    console.log("❌ Admin init error:", error.message);
  }
})();

// ========================
// GLOBAL MIDDLEWARES
// ========================
app.use(
  cors({
    origin: "*",
    credentials: true
  })
);

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb"
  })
);

// ========================
// STATIC UPLOADS
// ========================
app.use("/uploads", express.static(join(__dirname, "uploads")));

// ========================
// API ROUTES
// ========================
app.use("/api/contact", contactRoutes);

app.use("/api/subscribers", subscriberRoutes);

app.use("/api/get-started", getStartedRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/companies", companyRoutes);

app.use("/api/ai-chat", aiChatRoutes);

app.use("/api/forms", formRoutes);

// ========================
// HEALTH CHECK ROUTE
// ========================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 API is running successfully"
  });
});

// ========================
// FRONTEND BUILD PATH
// ========================
const clientPath = join(__dirname, "../client");

app.use(express.static(clientPath));

// ========================
// REACT CATCH-ALL ROUTE
// ========================
app.get("/{*any}", (req, res) => {
  res.sendFile(join(clientPath, "index.html"));
});

// ========================
// GLOBAL ERROR HANDLER
// ========================
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error"
  });
});

// ========================
// START SERVER
// ========================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});