import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id, fullName: user.fullName },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id, fullName: user.fullName },
    process.env.REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
