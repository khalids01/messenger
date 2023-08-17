<script lang="ts">
	import DarkMode from '$lib/components/ui/DarkMode.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import { Github } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { Jumper } from 'svelte-loading-spinners';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { z } from 'zod';

	export let data: PageData;

	const schema = z.object({
		email: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Please enter a valid email' })
	});
	// @ts-ignore
	const { form, errors, enhance, constraints, delayed } = superForm(data.form, {
		id: 'entry-form',
		taintedMessage: 'Are you sure you want leave?',
		validators: schema,
		delayMs: 500,
		timeoutMs: 8000
	});
</script>

<!-- <SuperDebug data={$form} /> -->

<header class="container max-w-full flex justify-between items-center py-3">
	<Logo />
	<DarkMode />
</header>

<section class="flex justify-center pt-12">
	<form method="POST" use:enhance class={`card space-y-8 mx-auto`}>
		<h1 class=" text-2xl text-center font-semibold gradient-text">Welcome to Task Messenger</h1>
		<div class="input-group">
			<div class="input-control with-icon">
				<input
					name="email"
					bind:value={$form.email}
					class="input {$errors.email ? '!border-red-500' : ''}"
					type="email"
					id="email"
					placeholder="Enter your email"
				/>
				<button type="button" formaction="/?/login" class="btn input-icon link">Continue</button>
			</div>
			{#if $errors.email}
				<small class="text-red-500 mt-1">{$errors.email}</small>
			{/if}
		</div>
		<div class="divider">
			<span>OR</span>
		</div>
		<div class="flex justify-stretch gap-6">
			<button disabled={$delayed} type="submit" class="btn icon w-full flex gap-4 justify-center">
				{#if $delayed}
					<!-- <Clock color="teal" duration="1s" unit="px" size={'35'} /> -->
					<Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
				{:else}
					<span>Continue with github</span><Github />
				{/if}
			</button>
		</div>
	</form>
</section>

<style lang="scss">
	/* .neon {
		@apply bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300;
	} */
</style>
