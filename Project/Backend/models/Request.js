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
      min: 1,
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

    // Cloudinary URL or Local Upload
    sitePhoto: {
      type: String,
      default: "",
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

    deliveryDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
