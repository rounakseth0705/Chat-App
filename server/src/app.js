import express from "express";
import "dotenv/config";
import cors from "cors";
import { createServer } from "http";
import connectToDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import { Server } from "socket.io";

const app = express();
export const server = createServer(app);
connectToDB();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

export const io = new Server(server, { cors: { origin: "http://localhost:5173", credentials: true } });

io.on("connection", (socket) => {
    
});

app.use(express.json());
app.use("/api/user", userRouter);