// ********Stores all material types with stock levels


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
      type: String, // e.g. "Bags", "Ton", "Cubic Feet"
      required: true,
    },
    description: {
      type: String,
    },
    currentStock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);
export default Material;
