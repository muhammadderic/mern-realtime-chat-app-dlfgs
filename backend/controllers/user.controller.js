import User from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    apiResponse.success(res, filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    apiResponse.errorISE(res);
  }
};
