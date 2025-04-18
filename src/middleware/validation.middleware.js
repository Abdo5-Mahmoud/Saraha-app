export const validation_old = (schema) => {
  return (req, res, next) => {
    let errors = [];
    for (const key in schema) {
      const validationError = schema[key].validate(req[key], {
        abortEarly: false,
      });
      if (validationError.error) {
        errors.push({ key, message: validationError.error.details });
      }
    }
    // console.log(errors);
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation Error",
        message: errors,
      });
    }
    return next();
  };
};
export const validation = (schema) => {
  return (req, res, next) => {
    const authorization = req.headers.authorization;
    let validationError;
    if (authorization) {
      validationError = schema.validate(
        { ...req.body, authorization },
        { abortEarly: false }
      );
    } else {
      validationError = schema.validate({ ...req.body }, { abortEarly: false });
    }
    if (validationError.error) {
      return res.status(400).json({
        message: "validation result",
        validationError: validationError.error.details,
      });
    }
    return next();
  };
};
