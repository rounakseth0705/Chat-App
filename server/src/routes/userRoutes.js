import express from "express";
import { connectUser, generateConnectId, login, register, verifyUser } from "../controllers/userControllers.js";
import { authUser } from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/verify-user", authUser, verifyUser);
userRouter.post("/generate-connect-id", authUser, generateConnectId);
userRouter.post("/connect-user", authUser, connectUser);

export default userRouter;