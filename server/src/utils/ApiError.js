class ApiError extends Error {
  constructor( statusCode, message, errors = [], stack ='') {
    super(message);
    this.statusCode = statusCode;
    this.sucess = false;
    this.message = message;
    this.errors = errors;
    stack? this.stack = stack 
    : Error.captureStackTrace(this, this.constructor);
    // if (stack) {
    //   this.stack = stack;
    // } else {
    //   Error.captureStackTrace(this, this.constructor);
    // }
  }
}

export default ApiError;