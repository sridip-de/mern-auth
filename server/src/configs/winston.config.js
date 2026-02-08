import winston from "winston";

const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

const logger = winston.createLogger({
  level: level,
  format: winston.format.combine(
    winston.format.errors({ stack: true }), // Crucial for ApiError stack traces!
    winston.format.json(), // Standard for production
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

export default logger;
