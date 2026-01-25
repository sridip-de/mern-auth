import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import passport from '../configs/passport.js'

import {
  register,
  login,
  logout,
  refreshAccessToken,
  sendVerifyOtp,
  verifyOtp,
  verifyAuth,
} from '../controllers/auth.controller.js';

import {
  handleGoogleCallback,
} from '../controllers/auth.google.controller.js'

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refresh', refreshAccessToken);
authRouter.post('/logout', authMiddleware, logout);
authRouter.post('/verify-auth',authMiddleware, verifyAuth);
authRouter.post('/send-verify-otp', authMiddleware, sendVerifyOtp);
authRouter.post('/verify-otp',authMiddleware, verifyOtp);

authRouter.get('/google',
  passport.authenticate('google',{scope: ['profile','email']})
);
authRouter.get('/google/callback',
  passport.authenticate('google', {session: false}),
  handleGoogleCallback
)

export default authRouter;