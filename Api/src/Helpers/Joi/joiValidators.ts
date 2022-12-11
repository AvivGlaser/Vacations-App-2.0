import {
  changeInfoSchema,
  creditCardSchema,
  registerSchema,
} from "./joiSchemas";
import messages from "../serverMessages";

export function joiValidateRegister(req, res, next) {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: messages.failure });
  next();
}
export function joiValidateInfo( req, res, next,) {
  const { error } = changeInfoSchema.validate(req.body);
  if (error) return res.status(400).json({ message: messages.failure });
  next();
}
export function joiValidateCreditCard(req, res, next) {
  const { error } = creditCardSchema.validate(req.body);
  if (error) return res.status(400).json({ message: messages.failure });
  next();
}
