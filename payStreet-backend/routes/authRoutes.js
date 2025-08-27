import express from "express";
import { validateRegister } from "../validator/validateRegister.js";
import { register, login } from "../controller/authController.js";
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", login);

export default router;
