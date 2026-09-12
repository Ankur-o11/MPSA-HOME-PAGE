import multer from 'multer';
import path from 'path';

// Use memory storage for serverless compatibility (prevents EROFS read-only filesystem errors on Vercel)
const storage = multer.memoryStorage();

// File Filter for Image Security (RULE #16)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype.toLowerCase();

  if (allowedExtensions.includes(ext) || allowedMimeTypes.includes(mime)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only JPG, JPEG, PNG, WEBP, and SVG image files are allowed.'), false);
  }
};

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
