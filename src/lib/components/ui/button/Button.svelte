<script lang="ts">
	export let type = 'button';
	export let disabled = false;
	export let cls = '';
</script>

<button class={` ${cls}`} {disabled} {type}>
	<slot />
</button>
