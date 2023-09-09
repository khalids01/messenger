<script lang="ts">
	import '../app.postcss';
	import '../global.scss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { PUBLIC_NAME } from '$env/static/public';
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>{PUBLIC_NAME}</title>
</svelte:head>

<slot />
