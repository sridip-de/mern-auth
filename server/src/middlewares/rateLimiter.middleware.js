import rateLimit from "express-rate-limit";
import ErrorCodes from '../constants/errorCode.constants.js';
import ApiError from "../utils/apiError.constructor.js";

export const limiter = rateLimit({
  windowMs: 15 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  handler: (req, res, next) => {
    const error = new ApiError(ErrorCodes.TOO_MANY_REQUESTS);
    next(error);
  }
})  
