import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";

/**
 * @description Register a new user account
 * @route POST /api/v1/auth/signup
 * @access Public
 */
export const signup = async (req, res) => {
  try {
    // Extract input fields and validate password match
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return apiResponse.badRequest(res, "Passwords don't match");
    }

    // Check if username is already taken
    const user = await User.findOne({ username });
    if (user) {
      return apiResponse.badRequest(res, "Username already exists");
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Prepare profile picture URLs based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create a new user instance
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // Save user and return success response
    await newUser.save();
    apiResponse.created(res, {
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
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
    apiResponse.success(res, "Login");
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
    apiResponse.success(res, "Logout");
  } catch (error) {
    console.log("Error in logout controller", error.message);
    apiResponse.errorISE(res);
  }
};