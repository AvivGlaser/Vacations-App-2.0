import jwt from "jsonwebtoken";
import messages from "../Helpers/serverMessages";
import timeFormat from "../Helpers/timeFormat";

export default function verifyToken(req, res, next) {
  const authorization = req?.headers?.authorization;
  jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    const time = timeFormat()
    if (err) {
      console.log(`User failed verification. Time: ${time}. Error: ${err.message}`);
      return res.status(401).json({ message: messages.unauthorized });
    } else {
      const userName = decoded?.user_name;
      req.user = userName
      // small logger to track if and when user is verified.
      console.log(`User name: ${userName}, passed verification. Time: ${time}`);
      return next()
    }
  });
}