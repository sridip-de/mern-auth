import express from 'express';
import { resister } from '../controllers/authController.js';

const userRouter = express.Router();

userRouter.post('/register', resister);

export default userRouter;