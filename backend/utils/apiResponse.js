export const apiResponse = {
  success: (res, statusCode = 200, data = {}, message = "Success") => {
    return res.status(statusCode).json({ success: true, message, data });
  },

  errorISE: (res, statusCode = 500, message = "Internal Server Error", error = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  },
};