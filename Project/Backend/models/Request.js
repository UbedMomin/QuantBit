//Stores all material requests, approval info, and delivery status


// models/Request.js
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
    },
    materialType: {
      type: String,
      required: true,
      enum: ["Cement", "Sand", "Bricks", "Steel", "Gravel", "Other"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "In Transit", "Delivered"],
      default: "Pending",
    },
    sitePhoto: {
      type: String, // will store uploaded file path (e.g., /uploads/site_photos/image.jpg)
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
