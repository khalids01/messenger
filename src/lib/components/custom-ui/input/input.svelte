<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms';
	export let value: string;
	export let label: string | undefined = undefined;
	export let errors: any = undefined;
	export let constraints: InputConstraint | undefined = undefined;
</script>

<div class="input-group">
	<label>
		{#if label}<span class="mb-2 text-sm inline-block">{label}</span><br />{/if}

		<input
			bind:value
			aria-invalid={errors ? 'true' : undefined}
			{...constraints}
			{...$$restProps}
		/>
	</label>

	{#if errors}
		<small class="text-red-500 mt-1">{errors}</small>
	{/if}
</div>
