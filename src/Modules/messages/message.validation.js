import Joi from "joi";

export const message = Joi.object({
  accountId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid accountId format",
      "any.required": "accountId is required",
    }),
  message: Joi.string().min(3).max(5000).required(),
});
