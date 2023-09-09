<script lang="ts">
	import { PUBLIC_NAME } from '$env/static/public';
	import DarkMode from '$lib/components/custom-ui/DarkMode.svelte';
	import Logo from '$lib/components/custom-ui/Logo.svelte';
	import GithubBtn from '$lib/components/custom-ui/button/Github.svelte';
	import GoogleBtn from '$lib/components/custom-ui/button/Google.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { z } from 'zod';
	import type { SuperValidated } from 'sveltekit-superforms';
	import Input from '$lib/components/custom-ui/input/input.svelte';
	import PasswordInput from '$lib/components/custom-ui/input/passwordInput.svelte';

	const schema = z.object({
		username: z
			.string({ required_error: 'Username is required' })
			.min(4, { message: 'Minimum 4 characters' }),
		email: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Please enter a valid email' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(6, { message: 'Minimum 6 characters' })
			.max(20, { message: 'Maximum 20 characters' })
	});

	export let data: SuperValidated<typeof schema>;

	// @ts-ignore
	const { form, errors, enhance, constraints, delayed } = superForm(data.form, {
		id: 'entry-form',
		taintedMessage: 'Are you sure you want leave?',
		validators: schema,
		delayMs: 500,
		timeoutMs: 8000
	});
</script>

<header class="container mx-auto px-4 max-w-7xl flex justify-between items-center py-3">
	<Logo />
	<DarkMode />
</header>
<section class="flex justify-center pt-12">
	<div class={`card space-y-6 mx-auto`}>
		<h1 class=" text-2xl text-center font-semibold gradient-text">Welcome to {PUBLIC_NAME}</h1>

		<form action="POST" class="space-y-4">
			<div class="flex justify-stretch gap-4">
				<GithubBtn formaction="?/auth&provider=github" disabled={$delayed} type="submit" />
				<GoogleBtn formaction="?/auth&provider=google" disabled={$delayed} type="submit" />
			</div>
		</form>

		<div class="divider">
			<span>OR</span>
		</div>

		<form method="POST" use:enhance>
			<div class="space-y-4">
				<Input
					name="username"
					label="Username"
					class="input"
					required
					placeholder={'@username'}
					bind:value={$form.username}
					errors={$errors.username}
					constraints={$constraints.username}
				/>

				<Input
					name="email"
					label="Email"
					class="input"
					type="email"
					required
					placeholder={'email@domain.com'}
					bind:value={$form.email}
					errors={$errors.email}
					constraints={$constraints.email}
				/>

				<PasswordInput
					name="password"
					class="input"
					label="Password"
					placeholder="password"
					required
					errors={$errors.email}
					constraints={$constraints.password}
					bind:value={$form.password}
				/>

				<div class="input-group pt-2">
					<button
						type={'submit'}
						class=" bg-transparent transition-all hover:bg-accent border w-full block px-4 rounded-md py-3 border-border font-medium"
					>
						Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</section>

<!-- <style lang="scss">
	.neon {
		@apply bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300;
	} 
</style> -->
