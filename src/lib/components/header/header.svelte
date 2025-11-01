<script lang="ts">
	import { Card } from '$lib/components/ui/card/index';
</script>

<header class="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-sm">
	<Card class="p-2 shadow-card-foreground/10">
		<div class="m-auto flex w-full max-w-screen-xl items-center justify-between">
			<slot />
		</div>
	</Card>
</header>
