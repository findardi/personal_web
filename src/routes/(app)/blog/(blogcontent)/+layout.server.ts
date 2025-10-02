import type { blogType } from '$lib/schema/type';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch('/api/blog');
	if (!response.ok) {
		throw new Error('Failed to fetch blogs');
	}
	const data = await response.json();

	// Return both blogs and metadata from the API response
	return {
		blogs: data.blogs as blogType[],
		metadata: data.metadata
	};
}) satisfies LayoutServerLoad;
