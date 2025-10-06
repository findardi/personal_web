import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		title: 'Portfolio',
		description:
			'Browse through my portfolio of web development projects and applications built with modern technologies'
	};
}) satisfies PageServerLoad;
