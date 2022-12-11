import { isPasswordMatch } from "../Helpers/AuthHelpers/isPasswordMatch";
import { isUserExist } from "../Helpers/AuthHelpers/isUserExist";
import { signToken } from "../Helpers/AuthHelpers/signToken";
import messages from "../Helpers/serverMessages";
import { changeInfoQuery, changePasswordQuery } from "../Queries/authQuery";
import { registerUserQuery } from "../Queries/authQuery";

export async function loginHandler(req, res, next) {
  const { userName, password } = req.body;
  const currentUser = await isUserExist(userName);
  if (!currentUser) return res.status(400).json({ message: messages.failure });
  const result = await isPasswordMatch(currentUser, password);
  if (!result) return res.status(400).json({ message: messages.failure });
  //configuring is_admin key to type Boolean (doesn't exist in mySQL server)
  currentUser?.is_admin === 1
    ? (currentUser.is_admin = true)
    : (currentUser.is_admin = false);
  const token = signToken(currentUser);
  return res.status(200).json({ status: 200, token });
}
export async function registerHandler(req, res, next) {
  const { firstName, lastName, password, passwordConfirm, userName } = req.body;
  const currentUser = await isUserExist(userName);
  if (currentUser)
    return res.status(400).json({ message: messages.userNameTaken });
  if (password !== passwordConfirm)
    return res.status(400).json({ message: messages.doesNotMatch });
  await registerUserQuery(userName, firstName, lastName, password);
  return res.status(200).json({ message: messages.success, status: 201 });
}

export async function changePasswordHandler(req, res, next) {
  const { firstName, lastName, password, newPassword } =
    req.body;
  // get user info via verify token
  const userName = req?.user;
  // validate if user exists in DB
  if (!userName) return res.status(400).json({ message: messages.notFound });
  const currentUser = await isUserExist(userName);
  if (!currentUser) return res.status(400).json({ message: messages.notFound });
  // validate current password really belongs to user
  const result = await isPasswordMatch(currentUser, password);
  if (!result) return res.status(400).json({ message: messages.doesNotMatch });
  // validate new password != current password
  if (newPassword === password) return res.status(400).json({ message: messages.samePassword });
  // if everything is ok- change password
  await changePasswordQuery(newPassword, userName);
  // update user info if he filled the inputs
  if (firstName || lastName !== "") {
    await changeInfoQuery(firstName, lastName, userName);
  }
  return res.status(200).json({ message: messages.success, status: 202 });
}

export async function paymentHandler(req, res, next) {
  const { name, number, fullExpiry, cvc } = req.body;
  if (!name || !number || !fullExpiry || !cvc) return;
  return res.status(200).json({ message: messages.success, status: 203 });
}
