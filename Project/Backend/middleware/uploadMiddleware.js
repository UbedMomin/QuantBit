import multer from "multer";
import path from "path";

// Storage Location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/site_photos");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Allowed file types
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png"];

  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPG, JPEG, PNG allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
