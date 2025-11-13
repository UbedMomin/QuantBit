//Handles reports — pending summary, material history.


// routes/reportRoutes.js
import express from "express";
import {
  getPendingSummary,
  getMaterialHistory,
} from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/pending-summary", protect, getPendingSummary);
router.get("/history", protect, getMaterialHistory);

export default router;
