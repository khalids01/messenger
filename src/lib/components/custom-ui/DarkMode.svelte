<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Moon, Sun } from 'lucide-svelte';
	import { page } from '$app/stores';

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme');

		if (theme) {
			document.documentElement.setAttribute('class', theme);
		}
	};
</script>

<form method="POST" use:enhance={submitUpdateTheme}>
	<button
		aria-label="Light mode"
		class="btn outline icon circle hidden dark:inline-block"
		formaction="/?/setTheme&theme=light&redirectTo={$page.url.pathname}"
	>
		<Sun />
	</button>
	<button
		aria-label="Dark mode"
		class="btn outline icon circle inline-block dark:hidden"
		formaction="/?/setTheme&theme=dark&redirectTo={$page.url.pathname}"
	>
		<Moon />
	</button>
</form>
