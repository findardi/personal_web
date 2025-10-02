CREATE TABLE "blog" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"banner" varchar,
	"content" jsonb NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"tags" varchar[],
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
