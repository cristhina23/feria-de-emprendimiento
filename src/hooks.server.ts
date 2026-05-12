import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const adminSession = event.cookies.get('admin_session');
	const expectedPassword = env.ADMIN_PASSWORD;

	event.locals.isAdmin = Boolean(expectedPassword && adminSession === expectedPassword);

	return resolve(event);
};
