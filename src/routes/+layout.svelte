<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		const saved = localStorage.getItem('theme');
		if (saved) {
			document.documentElement.dataset.theme = saved;
		} else {
			const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			document.documentElement.dataset.theme = systemDark ? 'dark' : 'light';
		}
	});
</script>

<svelte:head>
	<link
		rel="icon"
		href="/favicon.ico"
	/>
</svelte:head>

<slot />
