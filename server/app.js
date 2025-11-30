import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware setup
app.use(cors({credentials: true}));
app.use(express.json());
app.use(cookieParser());


export default app;