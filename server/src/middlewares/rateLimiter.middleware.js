import rateLimit from "express-rate-limit";
import ErrorCodes from '../constants/errorCode.constants';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: ErrorCodes.TOO_MANY_REQUESTS,
})  
