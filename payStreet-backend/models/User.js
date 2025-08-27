import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "please provide a valid email"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "please provide password"],
      minLength: 6,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    beneficiaries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beneficiary",
      },
    ],
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true }
);
//Hash Password before save
userSchema.pre("save", async function () {
  this.fullName = `${this.firstName} ${this.lastName}`.trim();

  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.error("Error hashing password:", err);
    throw new Error("Password encryption failed. Please try again.");
  }
});

//compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password encryption failed. Please try again.");
    //TODO
    // throw new CustomError('Password comparison failed. Please try again.', 500);
  }
};
const User = mongoose.model("User", userSchema);
export default User;
