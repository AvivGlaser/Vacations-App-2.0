import { object } from "joi";
import jwt from "jsonwebtoken";

export function signToken(currentUser: object) {
  if(!currentUser || currentUser === null || currentUser === undefined || typeof currentUser !== 'object') return;
  const token: string = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return token;
}

