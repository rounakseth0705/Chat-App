import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { sendMessage } from "../controllers/messageControllers.js";
import upload from "../config/multer.js";

const messageRouter = express.Router();

messageRouter.post("/send-message", upload.single("image"), authUser, sendMessage);

export default messageRouter;