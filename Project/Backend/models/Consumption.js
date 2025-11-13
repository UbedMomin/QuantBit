//Logs historical material usage and consumption per site


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

const Consumption = mongoose.model("Consumption", consumptionSchema);
export default Consumption;
