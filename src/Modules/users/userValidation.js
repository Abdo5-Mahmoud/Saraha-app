import Joi from "joi";

export const passwordValidation = Joi.object({
  oldPassword: Joi.string().min(3).max(50).required(),
  password: Joi.string()
    .not(Joi.ref("oldPassword"))
    .pattern(new RegExp("^[a-zA-Z0-9]{5,30}$"))
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export const updateProfileValidation = Joi.object({
  userName: Joi.string().alphanum().min(2).max(30),
  phone: Joi.string().min(10).max(15),
  address: Joi.string().min(2).max(50),
  authorization: Joi.string().required().messages({
    "any.required": "Authorization header is required",
  }),
  DOB: Joi.date().max("now").iso(),
});

export const emailValidation = Joi.object({
  oldEmail: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ["com", "net", "edu"] },
    })
    .required(),
  newEmail: Joi.string()
    .not(Joi.ref("oldEmail"))
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ["com", "net", "edu"] },
    })
    .required(),
});
