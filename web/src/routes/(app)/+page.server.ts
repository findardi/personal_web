import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		title: 'About Me',
		description:
			'Ardi Sasongko - Full Stack Developer passionate about building modern web applications. Experienced in TypeScript, Node.js, Svelte, and Go. Currently working at Panemu software house.'
	};
}) satisfies PageServerLoad;
