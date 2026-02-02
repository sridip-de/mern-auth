class ApiError extends Error {
  constructor(
    errorCodeObj,
    customMessage,
    errorCode = "INTERNAL_ERROR",
    errors = [],
    stack = ''
  ) {
    // Use custom message if provided
    const message = customMessage || errorCodeObj.message;

    super(message);
    this.statusCode = errorCodeObj.httpStatus;
    this.success = false;
    this.message = message;
    this.errors = errors; // For Validation error Array;
    this.errorCode = errorCodeObj.code;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
