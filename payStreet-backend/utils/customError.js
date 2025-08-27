class CustomError extends Error {
  constructor(message, statusCode = 500, code = "UNKNOWN_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
