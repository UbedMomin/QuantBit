//Handles material request CRUD, approvals, and delivery status.


// routes/requestRoutes.js
import express from "express";
import {
  createRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
  updateDeliveryStatus,
} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Engineer routes
router.post("/", protect, createRequest);
router.get("/", protect, getAllRequests);

// Manager routes
router.put("/:id/approve", protect, approveRequest);
router.put("/:id/reject", protect, rejectRequest);
router.put("/:id/status", protect, updateDeliveryStatus);

export default router;