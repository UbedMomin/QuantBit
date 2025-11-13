// routes/uploadRoutes.js
import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadPhoto } from "../controllers/uploadController.js";

const router = express.Router();

// Cloudinary upload
router.post("/", upload.single("sitePhoto"), uploadPhoto);

export default router;
