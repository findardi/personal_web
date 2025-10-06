import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { blogSchema } from '$lib/schema/blog.schema';
import { isRedirect, redirect } from '@sveltejs/kit';
import { BLOG_POST } from '$lib/utils/api';
import slugify from '@sindresorhus/slugify';

export const load = (async ({ locals }) => {
	const superRole = locals.user?.role === 'SUPER';

	if (!superRole) {
		redirect(303, '/blog');
	}
	return {
		form: await superValidate(zod(blogSchema)),
		title: 'Create Blog',
		description: 'Create new blog by Ardi Sasongko'
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		try {
			// Gunakan superValidate untuk parse multipart form data
			const form = await superValidate(request, zod(blogSchema));

			if (!form.valid) {
				return fail(400, { form });
			}

			// Extract data dari superValidate result
			const { title, tags, content, description, banner } = form.data;
			const slug = slugify(title);

			const apiHeaders: Record<string, string> = {};
			const apiPayload = JSON.stringify({
				title,
				tags: tags || [],
				content,
				description,
				slug,
				banner
			});

			// const token = await cookies.get('token');
			// apiHeaders['Authorization'] = `Bearer ${token}`;

			apiHeaders['Content-Type'] = 'application/json';

			const response = await fetch(`${BLOG_POST}`, {
				method: 'POST',
				headers: apiHeaders,
				body: apiPayload
			});

			if (!response.ok) {
				const errorText = await response.json();
				return fail(response.status, {
					form,
					message: errorText || response.statusText
				});
			}

			const responseData = await response.json().then((res) => res.body.data);
			redirect(303, `/blog/${responseData}`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			return fail(500, {
				form: undefined,
				message:
					'Something went wrong: ' + (error instanceof Error ? error.message : 'Unknown error')
			});
		}
	}
} satisfies Actions;
