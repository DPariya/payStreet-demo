import User from "../models/User.js";
import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";
import { sendAuthResponse } from "../utils/sendAuthResponse.js"; //Register

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError(
        "Email already exists",
        400,
        "EMAIL_ALREADY_EXISTS"
      );
    }
    const user = await User.create({ firstName, lastName, email, password });

    return sendAuthResponse(res, user);
  } catch (err) {
    next(err); // Forward to errorHandler
  }
};
