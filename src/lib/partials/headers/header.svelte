<script lang="ts">
	import { Card } from '$lib/components/ui/card/index';
</script>

<header>
	<Card class="p-2">
		<div class="m-auto flex w-full max-w-screen-xl items-center justify-between">
			<slot />
		</div>
	</Card>
</header>
