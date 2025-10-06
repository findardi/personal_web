import { Context, Next } from "hono";
import { Unauthorized, Forbidden } from "../error/error-handler";
import { verify } from "hono/jwt";
import env from "../env";
import { JWTPayload } from "./jwt";
import db from "../database/connection";
import { user } from "../database/schema/user";
import type { UserRoleType } from "../database/schema/user";
import { eq } from "drizzle-orm";

export class AccessMiddleware {
  async authenticate(c: Context, next: Next) {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Unauthorized("Token is required");
    }

    try {
      const payload = await verify(token, env.JWT_SECRET);
      c.set("payload", payload);
      await next();
    } catch (error) {
      throw new Unauthorized("Invalid token");
    }
  }

  // middleware factory: authorize("ADMIN") or authorize(["ADMIN","SUPER"])
  authorize(requiredRole: UserRoleType | UserRoleType[]) {
    const allowed = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    return async (c: Context, next: Next) => {
      const context = c.get("payload") as JWTPayload | undefined;
      if (!context) {
        throw new Unauthorized("Missing authentication");
      }

      const userRoleValue = context.role as UserRoleType;

      if (!allowed.includes(userRoleValue)) {
        throw new Forbidden(
          "You do not have permission to access this resource"
        );
      }

      await next();
    };
  }
}
