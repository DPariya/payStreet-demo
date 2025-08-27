import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { authRouter, beneficiaryRouter } from "./routes/index.js";
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
//auth
app.use("/api/auth", authRouter);
//beneficiary
app.use("/api/beneficiary", beneficiaryRouter);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
