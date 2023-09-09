import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');
		// const redirectTo = url.searchParams.get('redirectTo');
		if (theme) {
			cookies.set('color-theme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			});
		}

		// throw redirect(303, redirectTo ?? '/');
	}
};

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	// if the user is already logged in return them to the account page
	if (session) {
		throw redirect(303, '/');
	}

	return { url: url.origin };
};
