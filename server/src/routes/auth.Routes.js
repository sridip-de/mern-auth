import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';

import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyOtp,
} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', authMiddleware, logout);
authRouter.post('/send-verify-otp', authMiddleware, sendVerifyOtp);
authRouter.post('/verify-otp',authMiddleware, verifyOtp);

export default authRouter;