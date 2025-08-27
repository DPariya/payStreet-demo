import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { authRouter } from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//Database connection
connectDB();

//Health Route
app.get("/api/health", (req, res) => {
  res.send("Server is up with ES6!");
});

//app routes
app.use("/api/auth", authRouter);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
