export const errorHandler = (err, req, res, next) => {
  console.error(err); // log for debugging (optional)

  const statusCode = err.statusCode || 500;
  const code = err.code || "SERVER_ERROR";
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    code, // like "EMAIL_ALREADY_EXISTS"
    message, // user-friendly message
  });
};
