import type { PageServerLoad, Actions } from './$types';
import type { blogType } from '$lib/schema/type';
import { BLOG_GET } from '$lib/utils/api';
import { isRedirect, redirect } from '@sveltejs/kit';
import { fail } from 'sveltekit-superforms';

export const load = (async ({ params, fetch, locals }) => {
	async function getBlog() {
		const response = await fetch(`${BLOG_GET}/${params.slug}`);
		if (!response.ok) {
			throw new Error('Failed to fetch blog');
		}

		const blog = await response.json().then((res) => res.body?.data?.[0] as blogType);

		return blog;
	}

	const blogData = await getBlog();

	const superRole = locals.user?.role === 'SUPER';
	return {
		blog: blogData,
		isSuper: superRole,
		title: blogData.title,
		description: blogData.description
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ fetch, params }) => {
		try {
			const apiHeaders: Record<string, string> = {};

			// const token = await cookies.get('token');
			// apiHeaders['Authorization'] = `Bearer ${token}`;

			apiHeaders['Content-Type'] = 'application/json';

			const response = await fetch(`${BLOG_GET}/${params.slug}`, {
				method: 'DELETE',
				headers: apiHeaders
			});

			if (!response.ok) {
				const errorText = await response.json();
				//console.log(errorText);
				return fail(response.status, {
					message: errorText || response.statusText
				});
			}

			// const responseData = await response.json().then((res) => res.body.data);
			// console.log(responseData);
			redirect(303, `/blog`);
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
