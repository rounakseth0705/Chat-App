import express from "express";
import { generateConnectId, login, register } from "../controllers/userControllers.js";
import { authUser } from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/generate-connect-id", authUser, generateConnectId);

export default userRouter;