import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Configure storage location and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploads");
    
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename while preserving the original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

// Configure file filter for PDFs and Word documents
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimetypes = [
    "application/pdf", // PDF files
    "application/msword", // DOC files
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX files
  ];
  
  if (allowedMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format. Only PDF and Word documents are allowed."));
  }
};

// Configure upload size limits (10MB)
const maxSize = 10 * 1024 * 1024; // 10MB in bytes

// Create the multer instance with configuration
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxSize,
  },
});
