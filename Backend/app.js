import dotenv from "dotenv";
import express from "express";
import cors from "cors";


dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

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

app.use("/api/contact", contactRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/get-started", getStartedRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/ai-chat", aiChatRoutes);
app.use("/api/forms", formRoutes);

// HEALTH
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API running" });
});

export default app;