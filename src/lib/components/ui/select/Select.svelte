<script lang="ts">
	import { createSelect } from '@melt-ui/svelte';
	import { Check } from 'lucide-svelte';
	import { ChevronDown } from 'lucide-svelte';

	const { label, trigger, menu, option, isSelected, group, groupLabel } = createSelect();

	const options = {
		sweet: ['Caramel', 'Chocolate', 'Strawberry', 'Cookies & Cream'],
		savory: ['Basil', 'Bacon', 'Rosemary', 'Balsamic Fig']
	};
</script>

<button class="trigger" melt={$trigger} aria-label="Food">
	{$label || 'Select an option'}
	<ChevronDown />
</button>

<div class="menu" melt={$menu}>
	{#each Object.entries(options) as [key, arr]}
		<div melt={$group(key)}>
			<div class="label label" melt={$groupLabel(key)}>{key}</div>
			{#each arr as item}
				<div class="option" melt={$option({ value: item, label: item })}>
					{#if $isSelected(item)}
						<div class="check">
							<Check />
						</div>
					{/if}
					{item}
				</div>
			{/each}
		</div>
	{/each}

</div>

<style lang="scss">
	.label {
		@apply py-1 pl-4 pr-4  font-semibold capitalize text-neutral-800;
	}

	.menu {
		@apply z-10 flex max-h-[360px]  flex-col overflow-y-auto;
		@apply rounded-md bg-white p-1;
		@apply ring-0;
	}
	.option {
		@apply relative cursor-pointer rounded-md py-1 pl-8 pr-4 text-neutral-800;
		@apply focus:z-10 focus:text-purple-700;
		@apply data-[highlighted]:bg-purple-50 data-[highlighted]:text-purple-900;
		@apply data-[selected]:bg-purple-100 data-[selected]:text-purple-900;
	}
	.trigger {
		@apply flex h-10 min-w-[220px] items-center justify-between rounded-md bg-white px-3;
		@apply py-2 text-purple-700 transition-opacity hover:opacity-90;
	}
	.check {
		@apply absolute left-2 top-1/2 z-20 text-purple-500;
		translate: 0 calc(-50% + 1px);
	}
</style>
