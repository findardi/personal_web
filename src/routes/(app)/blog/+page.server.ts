import type { blogType } from '$lib/schema/type';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const response = await fetch(`${url.origin}/api/blog`);

	if (!response.ok) {
		throw new Error('Failed to fetch blogs');
	}

	const data = await response.json();

	return {
		blogs: data.blogs as blogType[],
		metadata: data.metadata
	};
}) satisfies PageServerLoad;
