<script lang="ts">
	import { EyeIcon, EyeOffIcon } from 'lucide-svelte';
	import type { InputConstraint } from 'sveltekit-superforms';
	export let value: string;
	export let label: string | undefined = undefined;
	export let errors: any = undefined;
	export let constraints: InputConstraint | undefined = undefined;

	let inputType = 'password';
	let inputRef: HTMLInputElement | null = null;

	$: inputRef ? (inputRef.type = inputType) : null;
</script>

<div class="input-group">
	<label class="relative">
		{#if label}<span class="mb-2 text-sm inline-block">{label}</span><br />{/if}

		<input
			bind:value
			aria-invalid={errors ? 'true' : undefined}
			bind:this={inputRef}
			class="pr-8 z-0 {$$restProps.class}"
			{...constraints}
			{...$$restProps}
		/>

		<button
			on:click={() => (inputType = inputType === 'password' ? 'text' : 'password')}
			type="button"
			class="bg-transparent absolute right-3 -bottom-1 z-10 transition-all p-1 hover:bg-accent rounded-full"
		>
			{#if inputType === 'text'}
				<EyeIcon size={20} />
			{:else}
				<EyeOffIcon size={20} />
			{/if}
		</button>
	</label>

	{#if errors}
		<small class="text-red-500 mt-1">{errors}</small>
	{/if}
</div>
