import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));