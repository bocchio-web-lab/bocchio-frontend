<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/header/header.svelte';
	import Slogan from '$lib/components/atomic/slogan.svelte';

	$: isHome = $page.url.pathname === '/';
</script>

<Header />

{#if !isHome}
	<Slogan />
{/if}

<div class="m-auto mb-16 mt-8 w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
	<slot />
</div>
