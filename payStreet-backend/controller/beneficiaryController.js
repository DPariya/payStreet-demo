import Beneficiary from "../models/Beneficiary.js";
import CustomError from "../utils/customError.js";

//Add

export const addBeneficiary = async (req, res, next) => {
  try {
    const { fullName, bankAccountNumber, country, currency } = req.body;
    const beneficiary = await Beneficiary.create({
      user: req.user._id,
      fullName,
      bankAccountNumber,
      country,
      currency,
    });
    res
      .status(201)
      .json({ message: "Beneficiary added successfully", beneficiary });
  } catch (error) {
    next(error);
  }
};
