import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import CORS_CONFIG from './src/configs/cors.config.js'

const app = express();
// Middleware setup
app.use(cors(CORS_CONFIG));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Imort Routes
import authRouter from './src/routes/auth.Routes.js';
import userRouter from './src/routes/user.Routes.js'

//app.use('/',(req,res,next)=>{res.send("okay running")})

// Use Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Global Error Handler Middleware
import errorHandler from './src/middlewares/errorHandler.js';
app.use(errorHandler);


export default app;