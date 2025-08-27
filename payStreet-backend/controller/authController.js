import User from "../models/User.js";
import CustomError from "../utils/customError.js";
import { sendAuthResponse } from "../utils/sendAuthResponse.js"; //Register

//register
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

//Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError(
        "User not found, register instead",
        404,
        "USER_NOT_FOUND"
      );
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new CustomError("Invalid password", 401);
    }
    return sendAuthResponse(res, user);
  } catch (error) {
    next(error);
  }
};
