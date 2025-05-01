/**
 * API Response Utility
 * --------------------
 * Provides standardized JSON response helpers based on common HTTP status codes.
 * This utility ensures consistent response shapes across the entire backend,
 * making it easier for frontend applications and API consumers to parse results.
 *
 * Available Response Methods:
 * - success(status: 200):     General successful response.
 * - created(status: 201):     Used when a new resource is successfully created.
 * - badRequest(status: 400):  Used for invalid or malformed client requests.
 *
 * Response Structure:
 * {
 *   success: boolean,   // indicates success or failure
 *   message: string,    // human-readable description
 *   data: object        // optional payload (varies by method)
 * }
 *
 * Usage Examples:
 *   return apiResponse.success(res, userData, "Login successful");
 *   return apiResponse.created(res, newUser, "User created");
 *   return apiResponse.badRequest(res, "Passwords don't match");
 *
 * This module helps maintain clean, predictable, and maintainable API responses.
 */

export const apiResponse = {
  success: (res, data = {}, message = "Success") => {
    return res.status(200).json({
      success: true,
      message,
      data
    });
  },

  created: (res, data = {}, message = "Created") => {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  },

  badRequest: (res, error = {}, message = "Bad Request") => {
    return res.status(400).json({
      success: false,
      message,
      error,
    });
  },

  errorISE: (res, error = null, message = "Internal Server Error") => {
    return res.status(500).json({
      success: false,
      message,
      error,
    });
  },
};