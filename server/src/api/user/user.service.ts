import db from "@/core/utils/database/connection";
import { CreateUserInput, LoginUserInput } from "./dto/create.user.dto";
import { user } from "@/core/utils/database/schema/user";
import { BadRequest, NotFound } from "@/core/utils/error/error-handler";
import { eq } from "drizzle-orm";
import { generatedToken } from "@/core/utils/middleware/jwt";

export class UserService {
  async createUser(request: CreateUserInput) {
    const { username, password } = request;

    try {
      const hashPassword = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 7,
      });

      const [result] = await db
        .insert(user)
        .values({
          username: username,
          password: hashPassword,
        })
        .returning({ id: user.id });

      if (!result) {
        throw new BadRequest("failed to create new user");
      }

      return result.id;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(request: LoginUserInput) {
    const { username, password } = request;

    try {
      const [findUser] = await db
        .select({ password: user.password, id: user.id, role: user.role })
        .from(user)
        .where(eq(user.username, username));

      if (!findUser) {
        throw new BadRequest("Invalid username or password");
      }

      const isValid = await Bun.password.verify(password, findUser.password);
      if (!isValid) {
        throw new BadRequest("Invalid username or password");
      }

      const token = await generatedToken({
        id: findUser.id,
        username: username,
        role: findUser.role,
      });

      return token;
    } catch (error) {
      throw error;
    }
  }
}
