<script lang="ts">
	import { page } from '$app/stores';

	$: isDetail = $page.url.pathname.startsWith('/projects/');
</script>

<div class="flex h-full w-full overflow-hidden">
	<!-- Left side: project tree -->
	<div
		class="overflow-y-auto border-r border-border bg-background transition-all duration-500 ease-in-out
        {isDetail ? 'w-1/2 md:w-2/5' : 'w-full'}"
	>
		<slot />
	</div>

	<!-- Right side: project detail -->
	{#if isDetail}
		<div class="hidden flex-1 overflow-y-auto bg-muted/40 md:flex">
			<slot name="detail" />
		</div>
	{/if}
</div>
