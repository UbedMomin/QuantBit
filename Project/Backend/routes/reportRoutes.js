// routes/reportRoutes.js
import express from "express";
import {
  getPendingSummary,
  getMaterialHistory,
} from "../controllers/reportController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/pending-summary", authMiddleware, getPendingSummary);
router.get("/history", authMiddleware, getMaterialHistory);

export default router;
