import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware setup
app.use(cors({credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Imort Routes
import userRouter from './src/routes/user.routes.js';

//app.use('/',(req,res,next)=>{res.send("okay running")})

// Use Routes
app.use('/api/users', userRouter);

// Global Error Handler Middleware
import errorHandler from './src/middlewares/errorHandler.js';
app.use(errorHandler);


export default app;