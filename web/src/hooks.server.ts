import { validateToken } from '$lib/utils/validateToken';
import type { Handle } from '@sveltejs/kit';
import { BASE_API_URL } from './lib/utils/api';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	if (token) {
		event.locals.user = await validateToken(event.fetch, token);

		// set header cookies
		const originalFetch = event.fetch;
		event.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
			const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
			const isApiCall = url.includes('/api/') || url.startsWith(BASE_API_URL || '');

			if (isApiCall) {
				const headers = new Headers(init?.headers);
				if (!headers.has('Authorization')) {
					headers.set('Authorization', `Bearer ${token}`);
				}

				return originalFetch(input, {
					...init,
					headers
				});
			}

			return originalFetch(input, init);
		};
	}

	return resolve(event);
};
