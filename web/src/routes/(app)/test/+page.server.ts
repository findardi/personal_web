import { API_HEALTH } from '$lib/utils/api';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	console.log(API_HEALTH);
	const response = await fetch(API_HEALTH, {
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		console.log(await response.json());
	}

	console.log(await response.json());
	return {};
}) satisfies PageServerLoad;
