import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { blogSchema } from '$lib/schema/blog.schema';
import { isRedirect, redirect } from '@sveltejs/kit';

export const load = (async () => {
	return {
		form: await superValidate(zod(blogSchema))
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

			// Siapkan payload untuk API
			let apiPayload;
			const apiHeaders: Record<string, string> = {};

			if (banner && banner instanceof File && banner.size > 0) {
				// Jika ada file, gunakan FormData
				const formData = new FormData();
				formData.append('title', title);
				formData.append('description', description);
				formData.append('content', content);
				formData.append('tags', JSON.stringify(tags || []));
				formData.append('banner', banner);

				apiPayload = formData;
				// Jangan set Content-Type untuk FormData, browser akan set otomatis
			} else {
				// Jika tidak ada file, gunakan JSON
				apiPayload = JSON.stringify({
					title,
					tags: tags || [],
					content,
					description
				});
				apiHeaders['Content-Type'] = 'application/json';
			}

			const response = await fetch('/api/blog', {
				method: 'POST',
				headers: apiHeaders,
				body: apiPayload
			});

			if (!response.ok) {
				const errorText = await response.text();
				return fail(response.status, {
					form,
					message: errorText || response.statusText
				});
			}

			const responseData = await response.json();
			redirect(303, `/blog/${responseData.slug}`);
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
