import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		title: 'Course - Backend',
		description:
			'Backend development courses and tutorials covering Node.js, Go, API design, database management, and server-side programming'
	};
}) satisfies PageServerLoad;
