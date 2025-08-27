import express from "express";
import { addBeneficiary } from "../controller/beneficiaryController.js";
import { authMiddleware } from "./../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addBeneficiary);

export default router;
