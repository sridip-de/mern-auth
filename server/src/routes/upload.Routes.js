import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import parser from "../configs/multer.config.js";
import { uploadImage } from "../controllers/upload.controller.js";

const uploadRouter = express.Router();

uploadRouter.post('/profile', authMiddleware, parser.single('profile-picture'), uploadImage);

export default uploadRouter;

// NOTE
// in parser.single('image') the name inside the bracked must be matched with 
// the field name in FormData
