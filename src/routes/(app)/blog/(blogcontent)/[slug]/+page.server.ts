import type { PageServerLoad } from './$types';
import type { blogType } from '$lib/schema/type';

export const load = (async ({ params, fetch, url }) => {
	async function getBlog() {
		const response = await fetch(`${url.origin}/api/blog/${params.slug}`);
		if (!response.ok) {
			throw new Error('Failed to fetch blog');
		}

		const blog = await response.json().then((res) => res as blogType);
		return blog;
	}

	return {
		blog: getBlog()
	};
}) satisfies PageServerLoad;
