import { sql } from "drizzle-orm";
import {
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const blog = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar({ length: 255 }).notNull().unique(),
  slug: text("slug").notNull().unique(),
  content: jsonb("content").notNull(),
  tags: jsonb("tags").notNull(),
  description: text("description").notNull().default(""),
  banner: varchar({ length: 255 }),
  createdBy: varchar({ length: 25 }).notNull().default("anonymous"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
