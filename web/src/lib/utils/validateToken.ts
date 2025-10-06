// src/lib/utils/validateToken.ts
import { VERIFY } from './api';

export async function validateToken(fetch: typeof globalThis.fetch, token: string | undefined) {
	if (!token) {
		return null;
	}

	try {
		const response = await fetch(VERIFY, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			return null;
		}

		const result = await response.json();
		return result.body?.data || result.data || result.user || null;
	} catch (error) {
		console.error('validateToken error:', error);
		return null;
	}
}
