import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(3, { message: 'Minimum 3 characters' })
		.max(12, { message: 'Maximum 12 characters' }),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email' })
});

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { data, error: err } = await locals.supabase.auth.signInWithOtp({
			email: form.data.email
		});

		console.log({ data, err });
	}
};
