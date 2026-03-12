import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToDB from "./config/db.js";

export const app = express();

connectToDB();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());