import { db } from '$lib/server/db';
import { blog } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;

	// const blogId = parseInt(id);
	// if (isNaN(blogId)) {
	// 	throw error(400, 'ID blog tidak valid');
	// }

	try {
		const blogPost = await db.select().from(blog).where(eq(blog.slug, slug)).limit(1);

		// Jika blog tidak ditemukan
		if (blogPost.length === 0) {
			throw error(404, 'Blog tidak ditemukan');
		}

		return json(blogPost[0]);
	} catch (err) {
		console.error('Error mengambil blog:', err);
		throw error(500, 'Terjadi kesalahan server');
	}
};

// Optional: Update blog by ID
export const PUT: RequestHandler = async ({ params, request }) => {
	const { slug } = params;
	// const blogId = parseInt(id);

	// if (isNaN(blogId)) {
	// 	throw error(400, 'ID blog tidak valid');
	// }

	try {
		const { title, tags, content, banner } = await request.json();

		const updatedBlog = await db
			.update(blog)
			.set({
				title,
				tags,
				content,
				banner,
				updatedAt: new Date().toISOString().split('T')[0]
			})
			.where(eq(blog.slug, slug))
			.returning();

		if (updatedBlog.length === 0) {
			throw error(404, 'Blog tidak ditemukan');
		}

		return json(updatedBlog[0]);
	} catch (err) {
		console.error('Error memperbarui blog:', err);
		throw error(500, 'Terjadi kesalahan server');
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	const { slug } = params;
	// const blogId = parseInt(id);

	// if (isNaN(blogId)) {
	// 	throw error(400, 'ID blog tidak valid');
	// }

	try {
		const deletedBlog = await db.delete(blog).where(eq(blog.slug, slug)).returning();

		if (deletedBlog.length === 0) {
			throw error(404, 'Blog tidak ditemukan');
		}

		return json({ message: 'Blog berhasil dihapus :', slug });
	} catch (err) {
		console.error('Error menghapus blog:', err);
		throw error(500, 'Terjadi kesalahan server');
	}
};
