//**** Maintains project site details and assigns responsible engineer */


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
      ref: "User", // Engineer responsible for the site
      required: true,
    },
    startDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "On Hold"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Site = mongoose.model("Site", siteSchema);
export default Site;
