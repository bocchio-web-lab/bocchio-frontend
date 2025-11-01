<script lang="ts">
	import { page } from '$app/stores';
	import * as Header from '$lib/partials/headers/index';
	import Slogan from '$lib/components/slogan/slogan.svelte';

	$: isHome = $page.url.pathname === '/';
</script>

<Header.Root>
	<Header.Logo />
	<Header.Links />
	<Header.Profile />
</Header.Root>

{#if !isHome}
	<Slogan />
{/if}

<div class="mx-auto my-6 w-11/12 max-w-screen-xl">
	<slot />
</div>
