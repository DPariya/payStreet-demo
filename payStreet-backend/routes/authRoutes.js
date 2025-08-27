import express from "express";
import { validateRegister } from "../validator/validateRegister.js";
import { register } from "../controller/authController.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", (req, res) => {
  res.send("login route");
});

export default router;
