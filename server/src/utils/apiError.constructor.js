class ApiError extends Error {
  constructor(
    errorCodeObj,
    customMessage,
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

// **Note**
// this.message → Global / human summmary
// - One Sentence
// - safe to show as toDateString();
//  - Always present
//
// this.errors =[] → What exactly is wrong, and where?
//  - Zero, one, or many
//  - Field Specfic
//  - Used by forms and programmatic logic
