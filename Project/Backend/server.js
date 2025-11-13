import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

// CONNECT DATABASE
connectDB();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Serve uploaded images (if using local uploads)
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/report", reportRoutes);

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
