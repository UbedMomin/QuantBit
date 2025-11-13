// models/Consumption.js
import mongoose from "mongoose";

const consumptionSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
    materialType: {
      type: String,
      required: true,
    },
    quantityUsed: {
      type: Number,
      required: true,
      min: 0,
    },
    usedAtSite: {
      type: String,
      required: true,
    },
    usedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Consumption", consumptionSchema);
