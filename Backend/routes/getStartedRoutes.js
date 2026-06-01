import express from "express";
import {
  createGetStarted,
  getGetStartedSubmissions,
  getGetStarted,
  updateGetStartedStatus
} from "../controllers/getStartedController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createGetStarted);
router.get("/", protect, getGetStartedSubmissions);
router.get("/:id", protect, getGetStarted);
router.put("/:id", protect, updateGetStartedStatus);

export default router;