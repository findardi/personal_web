import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().nonempty("Title is required"),
  slug: z.string().nonempty("Slug is required"),
  content: z.string().nonempty("Content is required"),
  description: z.string().nonempty("Description are required"),
  tags: z.array(z.string()).nonempty("Tags are required"),
});

export const updateBlogSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  content: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;

export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
