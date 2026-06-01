import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

import {
  createCandidateForm,
  getCandidates,
  getCandidate,
  updateCandidate,
  deleteCandidate,

  createClientForm,
  getClientRequirements,
  getClientRequirement,
  updateClientRequirement,
  deleteClientRequirement
} from "../controllers/formController.js";

import { protect } from "../middleware/auth.js";

/*
|--------------------------------------------------------------------------
| FILE SETUP (RESUME UPLOAD)
|--------------------------------------------------------------------------
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads/resumes");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recruweb/resumes",
    allowed_formats: ["pdf", "doc", "docx"],
    resource_type: "raw",
  },
});
const fileFilter = (req, file, cb) => {
  const allowed = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowed.includes(ext)) {
    return cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const router = express.Router();

/*
|--------------------------------------------------------------------------
| CANDIDATE ROUTES (CRM)
|--------------------------------------------------------------------------
*/

// Create Candidate (public form)
router.post(
  "/candidate",
  upload.single("resume"),
  createCandidateForm
);

// Get all candidates (CRM)
router.get("/candidate", protect, getCandidates);

// Get single candidate
router.get("/candidate/:id", protect, getCandidate);

// Update candidate
router.put("/candidate/:id", protect, updateCandidate);

// Delete candidate
router.delete("/candidate/:id", protect, deleteCandidate);

/*
|--------------------------------------------------------------------------
| CLIENT ROUTES (CRM)
|--------------------------------------------------------------------------
*/

// Create client requirement (IMPORTANT FIXED: now protected)
router.post("/client", protect, createClientForm);

// Get all clients (CRM table)
router.get("/client", protect, getClientRequirements);

// Get single client (DETAIL PAGE)
router.get("/client/:id", protect, getClientRequirement);

// Update client
router.put("/client/:id", protect, updateClientRequirement);

// Delete client
router.delete("/client/:id", protect, deleteClientRequirement);

export default router;