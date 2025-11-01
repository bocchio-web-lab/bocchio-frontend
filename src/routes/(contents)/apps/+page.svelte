<script lang="ts">
	import { onMount } from 'svelte';
	import { Card } from '$lib/components/ui/card';

	type AppEntry = {
		id: string;
		title: string;
		description: string;
		image: string;
		url: string;
	};

	let apps: AppEntry[] = [];

	onMount(async () => {
		const res = await fetch('/api/apps');
		apps = await res.json();
	});
</script>

<!-- Grid layout -->
<div class="grid justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each apps as app}
		<Card
			class="w-full max-w-sm cursor-pointer overflow-hidden shadow-lg transition-all hover:translate-y-[-2px] hover:shadow-xl"
		>
			<img
				src={app.image}
				alt={app.title}
				class="h-48 w-full object-cover"
			/>

			<div class="flex h-full flex-col justify-between p-6">
				<div>
					<h2 class="mb-2 text-xl font-semibold">{app.title}</h2>
					<p class="mb-4 line-clamp-3 text-sm text-muted-foreground">
						{app.description}
					</p>
				</div>
			</div>
		</Card>
	{/each}
</div>
