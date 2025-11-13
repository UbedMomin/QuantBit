// controllers/requestController.js
import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const { siteName, materialType, quantity, remarks } = req.body;

    const newRequest = await Request.create({
      siteName,
      materialType,
      quantity,
      remarks,
      createdBy: req.user._id,
      status: "Pending",
      sitePhoto: req.file?.path || "",   // CLOUDINARY URL
    });

    res.status(201).json({
      success: true,
      message: "Material request created successfully",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request)
      return res.status(404).json({ success: false, message: "Request not found" });

    request.status = "Approved";
    request.approvedBy = req.user._id;
    await request.save();

    res.json({ success: true, message: "Request approved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request)
      return res.status(404).json({ success: false, message: "Request not found" });

    request.status = "Rejected";
    request.approvedBy = req.user._id;
    await request.save();

    res.json({ success: true, message: "Request rejected successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findById(req.params.id);
    if (!request)
      return res.status(404).json({ success: false, message: "Request not found" });

    request.status = status;
    if (status === "Delivered") request.deliveryDate = new Date();
    await request.save();

    res.json({ success: true, message: "Delivery status updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
