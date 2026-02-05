import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standerdHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
})
