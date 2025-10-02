import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { blogSchema } from '$lib/schema/blog.schema';
import type { blogType } from '$lib/schema/type';

export const load = (async ({ fetch, params }) => {
	const response = await fetch(`/api/blog/${params.slug}`);

	if (!response.ok) {
		throw new Error('Failed to fetch blog');
	}

	const blog = await response.json().then((res) => res as blogType);

	const formData = {
		title: blog.title,
		description: blog.description,
		tags: blog.tags,
		content: blog.content
	};

	return {
		form: await superValidate(formData, zod(blogSchema)),
		currentBanner: blog.banner
	};
}) satisfies PageServerLoad;
