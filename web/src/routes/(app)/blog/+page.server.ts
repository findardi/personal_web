import type { blogType } from '$lib/schema/type';
import type { PageServerLoad } from './$types';
import { BLOG_GET } from '$lib/utils/api';

export const load = (async ({ fetch, locals }) => {
	const response = await fetch(`${BLOG_GET}`);

	if (!response.ok) {
		throw new Error('Failed to fetch blogs');
	}

	const data = await response.json().then((res) => res.body.data);

	const superRole = locals.user?.role === 'SUPER';
	return {
		blogs: data as blogType[],
		isSuper: superRole,
		// metadata: data.metadata,
		title: 'Blogs',
		description:
			'Collection of articles and tutorials about web development, programming tips, and tech explorations by Ardi Sasongko'
	};
}) satisfies PageServerLoad;
