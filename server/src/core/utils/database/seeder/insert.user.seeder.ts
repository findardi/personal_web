import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import env from "../../env";
import { user } from "../schema/user";

export const insertUserSeeder = async () => {
  const connectionString = `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client);

  console.log("🌱 Seeding users...");

  try {
    const hashPassword = await Bun.password.hash(env.DEFAULT_PASSWORD, {
      algorithm: "bcrypt",
      cost: 7,
    });

    const [result] = await db
      .insert(user)
      .values({
        username: env.DEFAULT_USERNAME,
        password: hashPassword,
        role: "SUPER",
      })
      .onConflictDoNothing()
      .returning({ id: user.id, username: user.username });

    if (result) {
      console.log(`✅ User created: ${result.username}`);
    } else {
      console.log("ℹ️ User already exists");
    }
  } catch (error) {
    console.error("❌ User seeder failed:", error);
    throw error;
  } finally {
    await client.end();
  }
};
