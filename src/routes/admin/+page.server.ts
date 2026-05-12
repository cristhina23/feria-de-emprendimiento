import { env } from '$env/dynamic/private';
import { getParticipants } from '$services/participants';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!env.ADMIN_PASSWORD) {
		return {
			isConfigured: false,
			isAdmin: false,
			participants: []
		};
	}

	if (!locals.isAdmin) {
		return {
			isConfigured: true,
			isAdmin: false,
			participants: []
		};
	}

	return {
		isConfigured: true,
		isAdmin: true,
		participants: await getParticipants()
	};
}

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const password = String(formData.get('password') ?? '');

		if (!env.ADMIN_PASSWORD) {
			return fail(500, { message: 'Configure ADMIN_PASSWORD en las variables de entorno.' });
		}

		if (password !== env.ADMIN_PASSWORD) {
			return fail(401, { message: 'Clave incorrecta.' });
		}

		cookies.set('admin_session', password, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 8
		});

		throw redirect(303, '/admin');
	},
	logout: async ({ cookies }) => {
		cookies.delete('admin_session', { path: '/' });
		throw redirect(303, '/admin');
	}
};
