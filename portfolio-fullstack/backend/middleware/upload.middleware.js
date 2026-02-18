import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'others';
    
    if (file.fieldname === 'profileImage' || file.fieldname === 'coverImage') {
      folder = 'profiles';
    } else if (file.fieldname === 'projectImage' || file.fieldname === 'thumbnail') {
      folder = 'projects';
    } else if (file.fieldname === 'skillIcon') {
      folder = 'skills';
    } else if (file.fieldname === 'resume') {
      folder = 'resumes';
    }
    
    const destPath = path.join(uploadsDir, folder);
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|gif|webp|svg/;
  const allowedDocTypes = /pdf|doc|docx/;
  
  const extname = path.extname(file.originalname).toLowerCase();
  const isImage = allowedImageTypes.test(extname);
  const isDoc = allowedDocTypes.test(extname);
  
  if (file.fieldname === 'resume') {
    if (isDoc) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed for resume!'));
    }
  } else {
    if (isImage) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
};

// Configure multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Helper to delete file
export const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
