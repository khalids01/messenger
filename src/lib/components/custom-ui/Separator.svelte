<script>
	export let text = '';
	export let weight = 1;
	export let textCls = 'bg-background';
	export let cls = '';
</script>

<div class="relative {cls}">
	<dib class="h-[{weight}px] relative bg-border" />
	<span class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-3 py-2 {textCls}"
		>{text}</span
	>
</div>
