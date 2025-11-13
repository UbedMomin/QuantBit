//Material requests (CRUD + approvals)


// requestController.js
import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const { siteName, materialType, quantity, remarks } = req.body;
    const request = await Request.create({
      siteName,
      materialType,
      quantity,
      remarks,
      createdBy: req.user._id,
      status: "Pending",
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate("createdBy", "name email");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "Approved";
    await request.save();
    res.json({ message: "Request approved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "Rejected";
    await request.save();
    res.json({ message: "Request rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    await request.save();
    res.json({ message: "Delivery status updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
