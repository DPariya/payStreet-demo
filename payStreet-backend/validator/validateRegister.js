import z from "zod";
import { handleZodValidation } from "../utils/handleZod.js";

//zod schema for validate register

const registerSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  //   accNumber: z.string().min(6, "Password must be at least 6 characters"),
});

export const validateRegister = handleZodValidation(registerSchema);
