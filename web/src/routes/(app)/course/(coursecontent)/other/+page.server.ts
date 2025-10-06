import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		title: 'Course - Other',
		description:
			'Additional programming courses covering DevOps, security, performance optimization, and various tech topics'
	};
}) satisfies PageServerLoad;
