import { apiResponse } from "../utils/apiResponse.js";
/**
 * @description Register a new user account
 * @route POST /api/v1/auth/signup
 * @access Public
 */
export const signup = async (req, res) => {
  try {
    apiResponse.success(res, 200, "Signup");
  } catch (error) {
    console.log("Error in signup controller", error.message);
    apiResponse.errorISE(res);
  }
};

/**
 * @description Login user and return auth token
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const login = async (req, res) => {
  try {
    apiResponse.success(res, 200, "Login");
  } catch (error) {
    console.log("Error in login controller", error.message);
    apiResponse.errorISE(res);
  }
};

/**
 * @description Logout user and clear session/token
 * @route POST /api/v1/auth/logout
 * @access Private
 */
export const logout = (req, res) => {
  try {
    apiResponse.success(res, 200, "Logout");
  } catch (error) {
    console.log("Error in logout controller", error.message);
    apiResponse.errorISE(res);
  }
};