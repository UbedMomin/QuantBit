// routes/requestRoutes.js
import express from "express";

import {
  createRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
  updateDeliveryStatus,
} from "../controllers/requestController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Engineer — Create Request (with photo)
router.post("/", authMiddleware, upload.single("sitePhoto"), createRequest);

// Engineer / Manager — View All Requests
router.get("/", authMiddleware, getAllRequests);

// Manager — Approve / Reject / Change Status
router.put("/:id/approve", authMiddleware, roleMiddleware("Manager"), approveRequest);
router.put("/:id/reject", authMiddleware, roleMiddleware("Manager"), rejectRequest);
router.put("/:id/status", authMiddleware, roleMiddleware("Manager"), updateDeliveryStatus);

export default router;
