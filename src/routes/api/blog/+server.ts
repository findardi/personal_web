import { db } from '$lib/server/db';
import { blog } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import slugify from '@sindresorhus/slugify';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const contentType = request.headers.get('content-type');
		let body;

		if (contentType?.includes('multipart/form-data')) {
			const formData = await request.formData();

			body = {
				title: formData.get('title') as string,
				description: formData.get('description') as string,
				content: formData.get('content') as string,
				tags: JSON.parse((formData.get('tags') as string) || '[]'),
				banner: formData.get('banner') as File
			};
		} else {
			body = await request.json();
		}

		const { title, tags, content, description, banner } = body;

		// Validation
		if (!title || !content || !description) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const slug = slugify(title);

		// Handle banner jika ada (untuk sekarang skip upload)
		const bannerUrl = null;
		if (banner && banner instanceof File && banner.size > 0) {
			// TODO: Implement file upload
		}

		const blogData = {
			title,
			slug,
			tags: tags || [],
			content,
			description,
			banner: bannerUrl
		};

		const blogID = await db
			.insert(blog)
			.values(blogData)
			.returning({ id: blog.id })
			.then((res) => res[0]?.id);

		if (!blogID) {
			return json({ error: 'Failed to create blog' }, { status: 500 });
		}

		return json({ slug }, { status: 201 });
	} catch (err) {
		return json(
			{ error: 'Failed to create blog: ' + (err instanceof Error ? err.message : 'Unknown error') },
			{ status: 500 }
		);
	}
};

export const GET: RequestHandler = async ({ url }) => {
	try {
		// Ambil parameter query untuk pagination
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = parseInt(url.searchParams.get('limit') || '10');
		const offset = (page - 1) * limit;

		// Validasi parameter
		if (page < 1 || limit < 1 || limit > 100) {
			throw error(400, 'Parameter page dan limit tidak valid');
		}

		// Ambil semua blog dengan pagination
		const blogs = await db
			.select()
			.from(blog)
			.orderBy(desc(blog.createdAt))
			.limit(limit)
			.offset(offset);

		// Hitung total blog untuk metadata pagination
		const totalBlogs = await db.select({ count: blog.id }).from(blog);
		const totalPages = Math.ceil(totalBlogs.length / limit);

		return json({
			blogs,
			metadata: {
				currentPage: page,
				totalPages,
				totalBlogs: totalBlogs.length,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1
			}
		});
	} catch (err) {
		console.error('Error mengambil blog:', err);
		throw error(500, 'Terjadi kesalahan server');
	}
};
