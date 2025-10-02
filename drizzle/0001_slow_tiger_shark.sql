ALTER TABLE "blog" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blog" ADD CONSTRAINT "blog_slug_unique" UNIQUE("slug");