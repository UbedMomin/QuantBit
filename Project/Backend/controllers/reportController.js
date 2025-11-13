// controllers/reportController.js
import Request from "../models/Request.js";

export const getPendingSummary = async (req, res) => {
  try {
    const pending = await Request.find({ status: "Pending" });
    res.json({
      success: true,
      count: pending.length,
      pending,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMaterialHistory = async (req, res) => {
  try {
    const history = await Request.find({ status: "Delivered" })
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email")
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
