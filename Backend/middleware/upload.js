import multer from "multer";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ---------------- CLOUDINARY STORAGE ----------------
const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const ext = path.extname(file.originalname).toLowerCase();

    return {
      folder: "recruweb/resumes",

      // IMPORTANT for pdf/doc uploads
      resource_type: "raw",

      public_id: `resume-${Date.now()}-${file.originalname
        .split(".")[0]
        .replace(/\s/g, "-")}`,

      allowed_formats: ["pdf", "doc", "docx"],
    };
  },
});

// ---------------- FILE FILTER ----------------
const fileFilter = (req, file, cb) => {
  const allowed = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowed.includes(ext)) {
    return cb(new Error("Only PDF, DOC, DOCX files allowed"), false);
  }

  cb(null, true);
};

// ---------------- MULTER ----------------
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;