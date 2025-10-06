import type { blogType } from '$lib/schema/type';
import { BLOG_GET } from '$lib/utils/api';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`${BLOG_GET}`);

	if (!response.ok) {
		throw new Error('Failed to fetch blogs');
	}
	const data = await response.json().then((res) => res.body.data);

	// Return both blogs and metadata from the API response
	return {
		blogs: data as blogType[]
		// metadata: data.metadata
	};
}) satisfies LayoutServerLoad;
