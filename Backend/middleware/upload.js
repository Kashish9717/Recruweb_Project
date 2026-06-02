import multer from "multer";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ---------------- CLOUDINARY STORAGE ----------------
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recruweb/resumes",

    resource_type: "auto", // 🔥 FIX (MOST IMPORTANT)
     access_mode: "public", // 🔥 VERY IMPORTANT FIX

    public_id: (req, file) =>
      `resume-${Date.now()}-${file.originalname.split(".")[0]}`,
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