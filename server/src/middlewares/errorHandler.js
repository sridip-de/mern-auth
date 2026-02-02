// Error handling middleware (at the end of your middleware chain)
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';
  //console.log(errorCode);

  res.status(statusCode).json({
    success: false,
    message,
    errorCode,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;
