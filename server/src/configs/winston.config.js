import winston from "winston";

const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

// Custom format to clean stack traces
const cleanStack = winston.format((info) => {
  if (info.stack) {
    // Remove full file paths, keep only filename and location
    info.stack = info.stack
      .split('\n')
      .map(line => line.replace(/file:\/\/\/.*?([^\/]+\.js)/g, '$1'))
      .slice(0, 4) // Limit to first 4 lines
      .join('\n');
  }
  return info;
});

const logger = winston.createLogger({
  level: level,
  format: winston.format.combine(
    winston.format.errors({ stack: true }), // Crucial for ApiError stack traces!
    winston.format.json(), // Standard for production
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    cleanStack(),
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
