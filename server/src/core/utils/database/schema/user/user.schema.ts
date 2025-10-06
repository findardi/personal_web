import { sql } from "drizzle-orm";
import {
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", [
  "SUPER",
  "ADMIN",
  "USER",
] as const);

export type UserRoleType = (typeof userRole.enumValues)[number];

export const user = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRole("role").notNull().default("USER"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
