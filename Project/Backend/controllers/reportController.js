// Summaries and material consumption history


// reportController.js
import Request from "../models/Request.js";

export const getPendingSummary = async (req, res) => {
  try {
    const pending = await Request.find({ status: "Pending" });
    res.json({ count: pending.length, pending });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMaterialHistory = async (req, res) => {
  try {
    const history = await Request.find({ status: "Delivered" })
      .populate("createdBy", "name email")
      .sort({ updatedAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
