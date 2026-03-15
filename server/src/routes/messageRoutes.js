import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { sendMessage } from "../controllers/messageControllers.js";

const messageRouter = express.Router();

messageRouter.post("/send-message", authUser, sendMessage);

export default messageRouter;