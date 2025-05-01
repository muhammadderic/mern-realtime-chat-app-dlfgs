import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";

const protectRoute = async (req, res, next) => {
  try {
    // Extract JWT token from request cookies
    const token = req.cookies.jwt;
    if (!token) {
      return apiResponse.unauthorized(res, "No Token Provided");
    }

    // Verify JWT token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return apiResponse.unauthorized(res, "Invalid Token");
    }

    // Fetch user from database by decoded userId
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return apiResponse.notFound(res, "User not found");
    }

    // Attach user object to request
    req.user = user;

    // Call next middleware or route handler
    next();
  } catch (error) {
    // Log error and return 500 response
    console.log("Error in protectRoute middleware: ", error.message);
    apiResponse.errorISE(res);
  }
};

export default protectRoute;