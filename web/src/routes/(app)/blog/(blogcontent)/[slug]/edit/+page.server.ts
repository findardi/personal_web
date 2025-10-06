import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { blogSchema } from '$lib/schema/blog.schema';
import type { blogType } from '$lib/schema/type';
import { BLOG_GET } from '$lib/utils/api';
import slugify from '@sindresorhus/slugify';
import { fail } from 'sveltekit-superforms';
import { redirect } from '@sveltejs/kit';
import { isRedirect } from '@sveltejs/kit';

export const load = (async ({ fetch, params, locals }) => {
	const response = await fetch(`${BLOG_GET}/${params.slug}`);
	if (!response.ok) {
		throw new Error('Failed to fetch blog');
	}

	const blog = await response.json().then((res) => res.body?.data?.[0] as blogType);

	const formData = {
		title: blog.title,
		description: blog.description,
		tags: blog.tags,
		content: blog.content
	};

	if (!locals.user) {
		redirect(303, `/blog/${params.slug}`);
	}

	return {
		form: await superValidate(formData, zod(blogSchema)),
		currentBanner: blog.banner,
		title: `Edit ${blog.title}`,
		description: `Edit ${blog.description}`
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch, params }) => {
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
			const response = await fetch(`${BLOG_GET}/${params.slug}`, {
				method: 'PATCH',
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
			// console.log(responseData);
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
