import express from 'express';
import authMiddleware from "../middlewares/auth.middleware.js"

import getUserProfile from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get('/data',authMiddleware, getUserProfile);

export default userRouter;