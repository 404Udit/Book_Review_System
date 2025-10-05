import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "book_pdfs",         // Cloudinary folder name
    resource_type: "raw",        // raw = for non-image files (like PDFs)
    allowed_formats: ["pdf"],    // restrict to PDFs
  },
});

export const upload = multer({ storage });


