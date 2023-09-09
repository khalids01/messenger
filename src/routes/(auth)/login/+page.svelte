<script lang="ts">
	import { PUBLIC_NAME } from '$env/static/public';
	import DarkMode from '$lib/components/custom-ui/DarkMode.svelte';
	import Logo from '$lib/components/custom-ui/Logo.svelte';
	import { Github } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { Jumper } from 'svelte-loading-spinners';
	import { superForm } from 'sveltekit-superforms/client';
	import { z } from 'zod';
	import Input from '$lib/components/custom-ui/input/input.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	const schema = z.object({
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

	let inputType = 'text';

	function typeAction(node: HTMLInputElement) {
		node.type = inputType;
	}
</script>

<header class="container mx-auto px-4 max-w-7xl flex justify-between items-center py-3">
	<Logo />
	<DarkMode />
</header>
<section class="flex justify-center pt-12">
	<div class={`card space-y-8 mx-auto`}>
		<h1 class=" text-2xl text-center font-semibold gradient-text">Welcome to {PUBLIC_NAME}</h1>

		<form action="POST" class="space-y-4">
			<div class="flex justify-stretch gap-6">
				<button
					formaction="?/auth&provider=github"
					disabled={$delayed}
					type="submit"
					class="btn icon w-full flex gap-4 justify-center"
				>
					{#if $delayed}
						<!-- <Clock color="teal" duration="1s" unit="px" size={'35'} /> -->
						<Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
					{:else}
						<span>Continue with github</span><Github />
					{/if}
				</button>
			</div>
			<div class="flex justify-stretch gap-6">
				<button
					formaction="?/auth&provider=github"
					disabled={$delayed}
					type="submit"
					class="btn icon w-full flex gap-4 justify-center"
				>
					{#if $delayed}
						<!-- <Clock color="teal" duration="1s" unit="px" size={'35'} /> -->
						<Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
					{:else}
						<span>Continue with github</span><Github />
					{/if}
				</button>
			</div>
		</form>

		<div class="divider">
			<span>OR</span>
		</div>

		<form method="POST" use:enhance>
			<div class="space-y-4">
				<Input
					name="email"
					label="Email"
					class="input"
					type="email"
					required
					placeholder={"email@domain.com"}
					bind:value={$form.email}
					errors={$errors.email}
					constraints={$constraints.email}
				/>

				<Input
					name="email"
					label="Email"
					class="input"
					type="email"
					required
					placeholder={"email@domain.com"}
					bind:value={$form.email}
					errors={$errors.email}
					constraints={$constraints.email}
				/>
				<div class="input-group">
					<label for="password" class="mb-1 text-sm"> Password </label>
					<div class="input-control">
						<input
							required
							name="password"
							bind:value={$form.password}
							class="input {$errors.password ? '!border-red-500' : ''}"
							use:typeAction
							id="password"
							placeholder="email@domain.com"
						/>
					</div>

					{#if $errors.password}
						<small class="text-red-500 mt-1">{$errors.password}</small>
					{/if}
				</div>

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

<style lang="scss">
	/* .neon {
		@apply bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300;
	} */
</style>
