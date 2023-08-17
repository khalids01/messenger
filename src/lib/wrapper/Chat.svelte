<main>
    <slot name="left" />
	<div>
		<slot name="header" />
		<slot />
	</div>
	<slot name="right" />
</main>

<style lang="scss">
	main {
		height: 100%;
		width: 100%;
		overflow: hidden;
		@apply bg-background text-foreground;
	}
</style>
