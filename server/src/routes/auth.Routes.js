import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';

import {
  register,
  login,
  logout,
  refreshAccessToken,
  sendVerifyOtp,
  verifyOtp,
  verifyAuth,
} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refresh', refreshAccessToken);
authRouter.post('/logout', authMiddleware, logout);
authRouter.post('/verify-auth',authMiddleware, verifyAuth)
authRouter.post('/send-verify-otp', authMiddleware, sendVerifyOtp);
authRouter.post('/verify-otp',authMiddleware, verifyOtp);

export default authRouter;