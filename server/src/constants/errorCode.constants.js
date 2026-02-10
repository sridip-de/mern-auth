// constants/errorCodes.js

export const ErrorCodes = {
  // Authentication errors (4xx)
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    httpStatus: 401,
    message: 'Invalid email or password'
  },
  TOKEN_EXPIRED: {
    code: 'TOKEN_EXPIRED',
    httpStatus: 401,
    message: 'Your session has expired. Please login again'
  },
  TOKEN_INVALID: {
    code: 'TOKEN_INVALID',
    httpStatus: 401,
    message: 'Invalid authentication token'
  },
  TOKEN_MISSING: {
    code: 'TOKEN_MISSING',
    httpStatus: 401,
    message: 'Authentication token is required'
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    httpStatus: 401,
    message: 'You must be logged in to access this resource'
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    httpStatus: 403,
    message: 'You do not have permission to access this resource'
  },

  // User errors (4xx)
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    httpStatus: 404,
    message: 'User not found'
  },
  USER_ALREADY_EXISTS: {
    code: 'USER_ALREADY_EXISTS',
    httpStatus: 409,
    message: 'User already exists'
  },
  EMAIL_ALREADY_EXISTS: {
    code: 'EMAIL_ALREADY_EXISTS',
    httpStatus: 409,
    message: 'Email already in use'
  },
  EMAIL_ALREADY_VERIFIED: {
    code: 'EMAIL_ALREADY_VERIFIED',
    httpStatus: 400,
    message: 'Email already verified'
  },
  // Validation errors (4xx)
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    httpStatus: 400,
    message: 'Validation failed'
  },
  MISSING_FIELDS: {
    code: 'MISSING_FIELDS',
    httpStatus: 400,
    message: 'All required fields must be provided'
  },
  INVALID_INPUT: {
    code: 'INVALID_INPUT',
    httpStatus: 400,
    message: 'Invalid input provided'
  },
  INVALID_EMAIL: {
    code: 'INVALID_EMAIL',
    httpStatus: 400,
    message: 'Please provide a valid email address'
  },

  // Resource errors (4xx)
  RESOURCE_NOT_FOUND: {
    code: 'RESOURCE_NOT_FOUND',
    httpStatus: 404,
    message: 'Resource not found'
  },

  TOO_MANY_REQUESTS: {
    code: 'TOO_MANY_REQUESTS',
    httpStatus: 429,
    message: 'Too many request, Please try again after some time'
  },

  // Server errors (5xx)
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    httpStatus: 500,
    message: 'An unexpected error occurred'
  },
  DATABASE_ERROR: {
    code: 'DATABASE_ERROR',
    httpStatus: 500,
    message: 'Database operation failed'
  },
  SERVICE_UNAVAILABLE: {
    code: 'SERVICE_UNAVAILABLE',
    httpStatus: 503,
    message: 'Service temporarily unavailable'
  }
};

export default ErrorCodes;
