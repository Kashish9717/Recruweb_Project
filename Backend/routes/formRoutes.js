import express from "express";
import path from "path";
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
  deleteClientRequirement,
} from "../controllers/formController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();


// ---------------- CLOUDINARY STORAGE (FIXED) ----------------
const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const ext = path.extname(file.originalname).toLowerCase();

    return {
      folder: "recruweb/resumes",

      // IMPORTANT for PDFs
      resource_type: "raw",

      // unique file name
      public_id: `resume-${Date.now()}-${file.originalname.split(".")[0]}`,

      allowed_formats: ["pdf", "doc", "docx"],
    };
  },
});


// ---------------- FILE FILTER ----------------
const fileFilter = (req, file, cb) => {
  const allowedExt = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExt.includes(ext)) {
    return cb(new Error("Only PDF, DOC, DOCX allowed"), false);
  }

  cb(null, true);
};


// ---------------- MULTER ----------------
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});


// ---------------- ROUTES ----------------

/* CANDIDATE */
router.post("/candidate", upload.single("resume"), createCandidateForm);
router.get("/candidate", protect, getCandidates);
router.get("/candidate/:id", protect, getCandidate);
router.put("/candidate/:id", protect, updateCandidate);
router.delete("/candidate/:id", protect, deleteCandidate);

/* CLIENT */
router.post("/client", protect, createClientForm);
router.get("/client", protect, getClientRequirements);
router.get("/client/:id", protect, getClientRequirement);
router.put("/client/:id", protect, updateClientRequirement);
router.delete("/client/:id", protect, deleteClientRequirement);

export default router;