export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      switch (err.name) {
        case "TokenExpiredError":
        case "JsonWebTokenError":
          return next(new Error(err.name, { cause: 400 }));
        default:
          return next(new Error(err.message, { cause: 500 }));
      }
    });
  };
};

export const globalErrorHandler = (err, req, res, next) => {
  if (process.env.MOOD === "Dev") {
    return res.status(err.cause || 500).json({
      message: err.message,
      stack: err.stack,
    });
  } else {
    return res.status(err.cause || 400).json({
      message: err.message,
    });
  }
};
