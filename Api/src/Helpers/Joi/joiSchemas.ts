import joi, { number } from "joi";

export const commonPasswordSchema = joi
  .string()
  .alphanum()
  .min(8)
  .max(30)
  .regex(/[A-Z]/, "upper-case")
  .regex(/[a-z]/, "lower-case")
  .regex(/[0-9]/, "number")
  .required();

export const registerSchema = joi.object({
  firstName: joi.string().min(2).max(20).required(),
  lastName: joi.string().min(0).max(20),
  userName: joi.string().email().min(8).max(30).required(),
  password: commonPasswordSchema,
  passwordConfirm: joi.ref("password"),
});
export const changeInfoSchema = joi.object({
  firstName: joi.string().min(0).max(20),
  lastName: joi.string().min(0).max(20),
  password: commonPasswordSchema,
  newPassword: commonPasswordSchema,
  passwordConfirm: joi.ref("newPassword"),
});

export const creditCardSchema = joi.object({
  name: joi.string().pattern(/^\d+$/, { invert: true }).min(4).max(20).required(),
  number: joi.string().creditCard().required(),
  fullExpiry: joi.string().length(4).required(),
  cvc: joi.string().length(3).required(),
});