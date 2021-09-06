import ErrorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token";
    error = new ErrorResponse(message, 401);
  }

  if (err.message === "jwt expired") {
    const message = "Session expired, please login again";
    error = new ErrorResponse(message, 401);
  }

  if (err.kind === "ObjectId") {
    const message = "Invalid User";
    error = new ErrorResponse(message, 400);
  }

  if (err.code === 11000) {
    const message = "Email already exits";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
