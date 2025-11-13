//Handles image uploads via Multer (for site photos).

// routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import { uploadPhoto } from "../controllers/uploadController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/site_photos/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("sitePhoto"), uploadPhoto);

export default router;
