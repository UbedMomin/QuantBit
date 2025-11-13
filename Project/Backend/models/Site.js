// models/Site.js
import mongoose from "mongoose";

const siteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    siteEngineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: Date,
    status: {
      type: String,
      enum: ["Active", "Completed", "On Hold"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Site", siteSchema);
