import type { Handle } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

export const handle = (async ({ event, resolve }) => {
	let theme: string | null = null;
	const newTheme = event.url.searchParams.get('theme');
	const cookieTheme = event.cookies.get('color-theme');
	const regex = /class="(light|dark|)"/g;

	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();

		return session;
	};

	if (newTheme) {
		theme = newTheme;
	} else if (cookieTheme) {
		theme = cookieTheme;
	}
	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace(regex, `class=${theme}`),
			filterSerializedResponseHeaders: (name) => {
				return name === 'content-range';
			}
		});
	}

	return await resolve(event);
}) satisfies Handle;
