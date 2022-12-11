import {
  changePasswordHandler,
  loginHandler,
  paymentHandler,
  registerHandler,
} from "../../Handlers/authHandler";
import { joiValidateCreditCard, joiValidateInfo } from "../../Helpers/Joi/joiValidators";
import verifyToken from "../../Middlewares/verifyToken";
import { Router } from "express";
import { joiValidateRegister } from "../../Helpers/Joi/joiValidators";

const authRouter = Router();

authRouter.post("/login", loginHandler);
authRouter.post("/register", joiValidateRegister, registerHandler);
authRouter.post(
  "/change-info",
  verifyToken,
  changePasswordHandler,
  joiValidateInfo,
);
authRouter.post("/payment", verifyToken, joiValidateCreditCard, paymentHandler);


export default authRouter;
