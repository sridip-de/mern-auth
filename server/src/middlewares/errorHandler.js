import logger from "../configs/winston.config.js";

// Error handling middleware (at the end of your middleware chain)
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';
  const errors = err.errors;

  logger.error(err.message, {
    errorCode: err.errorcode,
    stack: err.stack,
  })

  res.status(statusCode).json({
    success: false,
    message,
    errorCode,
    errors,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;
