class CustomError {
  constructor(error) {
    this.originalError = error;
    this.message = error.response?.data?.message || 'An unexpected error occured';
    this.statusCode = error.response?.status;
    this.code = error.code;
    this.isNetworkError = !error.response;
  }

  getMessage() {

    if (this.isNetworkError || !this.statusCode) {

      if (this.code === 'ERR_NETWORK') {
        return 'Unable to reach the server. Please retry';
      }
      if (this.code === 'ECONNABORTED') {
        return 'Request timeout. Please try again';
      }
      return 'Network connection failed. Please check your internet';
    }

    const statusMessages = {
      400: 'Invalid request. Please check your input.',
      401: 'Authentication required. Please login.',
      403: 'Access denied',
      404: 'Resource not found',
      409: 'Conflict. This resource already exists',
      422: 'Validation failed. Please check your intput',
      429: 'Too many requests. Please try again later',
      500: 'Internal server error',
      502: 'Bad Gateway. Service temporarily unavailable',
      503: 'Service unavailable. Please try again later',
    };

    return this.message || statusMessages[this.statusCode];
  }

  getCustomError() {
    return {
      message: this.getMessage(),
      statusCode: this.statusCode,
      code: this.code,
      isNetworkError: this.isNetworkError,
    }
  }
}

export default CustomError;
