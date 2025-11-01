<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	export let data: PageData;

	const handleClick = (slug: string) => goto(`/projects/${slug}`);
</script>

<!-- Git-style timeline -->
<div class="relative px-8 py-12 md:px-20">
	<!-- Vertical line -->
	<div class="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>

	{#each data.projects as project, i}
		<div
			class="group relative mb-20 flex cursor-pointer items-center justify-between"
			on:click={() => handleClick(project.slug)}
		>
			<!-- Left/right alternation -->
			{#if i % 2 === 0}
				<!-- Left project -->
				<div class="hidden w-1/2 pr-8 text-right md:block">
					<h3 class="text-xl font-bold transition-colors group-hover:text-primary">
						{project.name}
					</h3>
					<p class="text-sm text-muted-foreground">{project.year}</p>
				</div>
			{/if}

			<!-- Node -->
			<div class="z-10 h-6 w-6 rounded-full border-4 border-background bg-primary shadow-md"></div>

			<!-- Right project -->
			{#if i % 2 === 1}
				<div class="hidden w-1/2 pl-8 md:block">
					<h3 class="text-xl font-bold transition-colors group-hover:text-primary">
						{project.name}
					</h3>
					<p class="text-sm text-muted-foreground">{project.year}</p>
				</div>
			{/if}

			<!-- Mobile stacked layout -->
			<div class="mt-6 flex w-full flex-col items-center text-center md:hidden">
				<h3 class="text-lg font-semibold">{project.name}</h3>
				<p class="text-sm text-muted-foreground">{project.year}</p>
			</div>
		</div>
	{/each}
</div>
