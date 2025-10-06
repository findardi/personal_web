CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" text NOT NULL,
	"content" jsonb NOT NULL,
	"tags" jsonb NOT NULL,
	"createdBy" varchar(25) DEFAULT 'anonymous' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blogs_title_unique" UNIQUE("title"),
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
