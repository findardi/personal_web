import { z } from 'zod';

export const blogSchema = z.object({
	title: z.string().min(5, 'Title minimum must have 5 characters'),
	description: z.string().min(25, 'Description minimum must have 25 characters'),
	tags: z
		.array(z.string())
		.min(1, 'Tags minimum must have 1 tag')
		.max(5, 'Tags maximum must have 5 tags'),
	content: z.string().min(25, 'Content minimum must have 25 characters'),
	banner: z
		.any()
		.optional()
		.refine(
			(file) => {
				if (!file) return true; // Allow empty/undefined
				return file instanceof File;
			},
			{ message: 'Banner must be a file' }
		)
		.refine(
			(file) => {
				if (!file) return true; // Allow empty/undefined
				return file.size <= 5 * 1024 * 1024;
			},
			{ message: 'File size maximum must be 5MB' }
		)
		.refine(
			(file) => {
				if (!file) return true; // Allow empty/undefined
				return ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type);
			},
			{ message: 'File format must be JPEG, PNG, or WebP' }
		)
});

export type BlogSchema = z.infer<typeof blogSchema>;
