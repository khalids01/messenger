<script lang="ts">
	export let direction = 'vertical'; // 'vertical' or 'horizontal'
	export let width = '8px'; // Scrollbar width

	let scrollableContent;

	function handleScroll(event: any) {
		// Handle scroll event here if needed
	}
</script>

<div class="scroll-area">
	<div class="scroll-content" bind:this={scrollableContent} on:scroll={handleScroll}>
		<slot />
	</div>
</div>

<style lang="scss">
	.scroll-area {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.scroll-content {
		width: 100%;
		height: 100%;
		overflow: auto;
		scrollbar-width: thin;

		&::-webkit-scrollbar {
			width: 8px;
		}
		&::-webkit-scrollbar-thumb {
				background-color: red;
			}
			&::-webkit-scrollbar-track {
				background-color: green;
			}

		// @if direction == 'horizontal' {
		// 	&::-webkit-scrollbar-thumb {
		// 		background-color: red;
		// 	}
		// 	&::-webkit-scrollbar-track {
		// 		background-color: green;
		// 	}
		// } @else if direction == 'vertical' {
		// 	&::-webkit-scrollbar-thumb {
		// 		background-color: red;
		// 	}
		// 	&::-webkit-scrollbar-track {
		// 		background-color: green;
		// 	}
		// }
	}
</style>
