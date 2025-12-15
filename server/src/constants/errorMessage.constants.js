const ERROR_MESSAGE = {
  // Authentication Errors
  AUTH: {
    TOKEN_MISSING: "Authentication token is required. Please login.",
    TOKEN_INVALID: "Invalid authentication token",
    TOKEN_EXPIRED: "Your session has expired. Please login again",
    USER_NOT_FOUND: "User accaunt not found. Please login again",
    UNAUTHORIZED: "You are not authorized to perform this action",
  },

  // OTP Errors
  OTP: {
    INVALID_OTP: "The provided OTP is invalid",
    EXPIRED_OTP: "The provided OTP has expired",  
    OTP_SEND_FAILED: "Failed to send OTP. Please try again later",
  },
  
  // User Errors
  USER: {
    NOT_FOUND: "User not found",
    ALREADY_EXISTS: "Invalid email or password",
    INVALID_CREDENTIALS: "Invalid email or password",
    EMAIL_NOT_VERIFIED: "Please verify your email address",
    EMAIL_ALREADY_VERIFIED: "Email address is already verified",
  },

  // Server Errors
  SERVER: {
    INTERNAL_ERROR: "Something went wrong",
    DATABASE_ERROR: "Database Operation failed",
    SERVER_UNAVAILABLE: "Service temporarily unavailable",
  },
};

export default ERROR_MESSAGE;