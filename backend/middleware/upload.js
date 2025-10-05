import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "book_pdfs",        
    resource_type: "raw",       
    allowed_formats: ["pdf"],    
  },
});

export const upload = multer({ storage });


