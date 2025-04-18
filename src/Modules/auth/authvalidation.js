import { query } from "express";
import joi from "joi";
// creating an object for signup validation
export const signup_old = {
  body: joi.object({
    userName: joi.string().alphanum().min(2).max(30).required(),
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 3,
        tlds: { allow: ["com", "net", "edu"] },
      })
      .required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
    DOB: joi.date().less("now"),
    gender: joi.string().valid("male", "female"),
    phone: joi.string().min(10).max(15).required(),
    address: joi.string().min(2).max(50),
  }),
  query: joi.object({
    lang: joi.string().valid("en", "ar").default("en"),
  }),
};
export const signup = joi.object({
  userName: joi.string().alphanum().min(2).max(30).required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ["com", "net", "edu"] },
    })
    .required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
  DOB: joi.date().less("now"),
  gender: joi.string().valid("male", "female"),
  phone: joi.string().min(10).max(15).required(),
  address: joi.string().min(2).max(50),
  lang: joi.string().valid("en", "ar").default("en"),
});

export const login = joi.object({
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ["com", "net", "edu"] },
    })
    .required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,30}$")).required(),
});
