import { userSchema } from '$lib/schema/user.schema';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { LOGIN_POST } from '$lib/utils/api';
import { isRedirect, redirect } from '@sveltejs/kit';

export const load = (async () => {
	return {
		form: await superValidate(zod(userSchema))
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		try {
			// Gunakan superValidate untuk parse multipart form data
			const form = await superValidate(request, zod(userSchema));

			if (!form.valid) {
				return fail(400, { form });
			}

			const { username, password } = form.data;
			const apiHeaders: Record<string, string> = {};
			const apiPayload = JSON.stringify({
				username,
				password
			});
			apiHeaders['Content-Type'] = 'application/json';

			const response = await fetch(`${LOGIN_POST}`, {
				method: 'POST',
				headers: apiHeaders,
				body: apiPayload
			});

			if (!response.ok) {
				const errorText = await response.json();
				return fail(response.status, {
					form,
					message: errorText || response.statusText
				});
			}

			const token = await response.json().then((res) => res.body.data);
			if (!token) {
				return fail(500, { form, message: 'No token provide' });
			}

			cookies.set('token', token, {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				maxAge: 60 * 60 * 24 * 7
			});

			console.log('login');
			redirect(303, `/`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			return fail(500, {
				form: undefined,
				message:
					'Something went wrong: ' + (error instanceof Error ? error.message : 'Unknown error')
			});
		}
	}
} satisfies Actions;
