import Joi from "joi";

export const message = Joi.object({
  accountId: Joi.string().required(),
  message: Joi.string().alphanum().min(3).max(5000).required(),
});
