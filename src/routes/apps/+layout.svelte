<script lang="ts">
	import * as Footer from '$lib/partials/footers/index';
	import * as Card from '$lib/components/ui/card/index';
</script>

<main class="m-auto flex h-max w-full flex-col items-center justify-center px-4 py-8">
	<Card.Root class="mx-auto max-w-sm">
		<slot />
	</Card.Root>
</main>

<Footer.Root>
	<Footer.Copyright />
</Footer.Root>
