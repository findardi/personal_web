import { pgTable, serial, text, jsonb, varchar, date } from 'drizzle-orm/pg-core';

export const blog = pgTable('blog', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	banner: varchar('banner'),
	content: jsonb('content').notNull(),
	description: text('description').notNull().default(''),
	tags: varchar('tags').array(),
	createdAt: date('created_at').notNull().defaultNow(),
	updatedAt: date('updated_at').notNull().defaultNow()
});
