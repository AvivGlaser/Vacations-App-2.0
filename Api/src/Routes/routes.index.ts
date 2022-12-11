import authRouter from "./auth/auth.routes";
import { Router } from "express";
import vacationsRouter from "./vacations/vacations.routes";
import verifyToken from "../Middlewares/verifyToken";

export const routes = Router();

routes.use("/auth", authRouter);
routes.use(verifyToken);
routes.use("/vacations", vacationsRouter);

export default routes;
