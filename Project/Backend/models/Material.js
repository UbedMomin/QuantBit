// models/Material.js
import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    unit: {
      type: String, // Bags, Ton, Cubic Feet, etc.
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    currentStock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Material", materialSchema);
