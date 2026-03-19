import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { getMessages, sendMessage } from "../controllers/messageControllers.js";
import upload from "../config/multer.js";

const messageRouter = express.Router();

messageRouter.post("/send-message", upload.single("image"), authUser, sendMessage);
messageRouter.get("/get-messages/:receiverId", authUser, getMessages);

export default messageRouter;