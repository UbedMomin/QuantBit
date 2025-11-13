import jwt from "jsonwebtoken";
import User from "../models/User.js";  // adjust name if needed

// Middleware to protect private routes
const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Extract token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB and remove sensitive fields
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User does not exist",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid token",
    });
  }
};

export default authMiddleware;
