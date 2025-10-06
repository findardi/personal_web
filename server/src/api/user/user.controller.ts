import { Context } from "hono";
import { UserService } from "./user.service";
import { createUserSchema, loginUserSchema } from "./dto/create.user.dto";
import { Response } from "@/core/constant/api-response";
import { HTTP_STATUS } from "@/core/constant/http-code";
import { JWTPayload } from "hono/utils/jwt/types";

const userService = new UserService();

export const userController = {
  create: async (c: Context) => {
    const body = await c.req.json();
    const data = createUserSchema.parse(body);
    const result = await userService.createUser(data);

    return c.json(
      Response.success("Success create new user", result, HTTP_STATUS.CREATED)
    );
  },

  login: async (c: Context) => {
    const body = await c.req.json();
    const data = loginUserSchema.parse(body);
    const result = await userService.loginUser(data);

    return c.json(
      Response.success("Success login user", result, HTTP_STATUS.OK)
    );
  },

  verify: async (c: Context) => {
    const context = c.get("payload") as JWTPayload;
    console.log(context);

    return c.json(
      Response.success("Payload retrieved", context ?? null, HTTP_STATUS.OK)
    );
  },
};
