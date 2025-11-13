const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - No user found",
        });
      }

      if (req.user.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: `Access denied: Only ${requiredRole} can access this`,
        });
      }

      next();
    } catch (error) {
      console.error("Role Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error in role middleware",
      });
    }
  };
};

export default roleMiddleware;
