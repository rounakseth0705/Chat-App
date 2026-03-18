import express from "express";
import { connectUser, deleteUser, login, register, sendConnectionRequest, verifyUser } from "../controllers/userControllers.js";
import { authUser } from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/verify-user", authUser, verifyUser);
userRouter.post("/send-connection-request", authUser, sendConnectionRequest);
userRouter.post("/connect-user", authUser, connectUser);
userRouter.delete("delete-user", deleteUser);

export default userRouter;