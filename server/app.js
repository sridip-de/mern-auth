import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import CORS_CONFIG from './src/configs/cors.config.js'
import { limiter } from './src/middlewares/rateLimiter.middleware.js';

const app = express();
// Middleware setup
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(cors(CORS_CONFIG));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Imort Routes
import authRouter from './src/routes/auth.Routes.js';
import userRouter from './src/routes/user.Routes.js';
import uploadRouter from './src/routes/upload.Routes.js';

//app.use('/',(req,res,next)=>{res.send("okay running")})

// Use Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/uploads', uploadRouter);

// Global Error Handler Middleware
import errorHandler from './src/middlewares/errorHandler.js';
app.use(errorHandler);


export default app;
