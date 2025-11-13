import multer from "multer";
import path from "path";

// Create folder if not exist
import fs from "fs";
const folderPath = "uploads/site_photos";
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPG, JPEG, PNG files are allowed."), false);
};

// Create multer upload middleware
const upload = multer({
  storage,
  fileFilter,
});

export default upload;
