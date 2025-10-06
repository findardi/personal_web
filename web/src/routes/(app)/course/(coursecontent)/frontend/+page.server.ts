import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		title: 'Course - Frontend',
		description:
			'Frontend development courses covering Svelte, TypeScript, and modern UI/UX practices'
	};
}) satisfies PageServerLoad;
