import { Hono } from "hono";
import { userController } from "./user.controller";
import { authMiddleware } from "@/core/utils/middleware/jwt";

const userRoute = new Hono();

userRoute.post("/", userController.create);
userRoute.post("/login", userController.login);
userRoute.post("/verify", authMiddleware, userController.verify);

export default userRoute;
