import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';

import getUserProfile from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/data', authMiddleware, getUserProfile);

export default userRouter;