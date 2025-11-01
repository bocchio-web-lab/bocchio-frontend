<script lang="ts">
	import * as Footer from '$lib/partials/footers/index';
</script>

<main class="m-auto flex h-max w-full flex-col items-center justify-center px-4 py-8">
	<slot />
</main>

<Footer.Root>
	<Footer.Copyright />
</Footer.Root>
