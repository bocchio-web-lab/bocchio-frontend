<script lang="ts">
	import { onMount } from 'svelte';
	import { Card } from '$lib/components/ui/card';

	type BlogPreview = {
		id: string;
		title: string;
		date: string;
		preview: string;
	};

	type BlogPost = BlogPreview & { content?: string };

	let posts: BlogPost[] = [];
	let expandedId: string | null = null;

	// Load previews initially
	onMount(async () => {
		const res = await fetch('/api/blog');
		posts = await res.json();
	});

	async function toggleExpand(id: string) {
		if (expandedId === id) {
			expandedId = null;
			return;
		}

		expandedId = id;
		const index = posts.findIndex((p) => p.id === id);
		if (index === -1) return;

		if (!posts[index].content) {
			const res = await fetch(`/api/blog?id=${id}`);
			const fullPost = await res.json();
			posts[index].content = fullPost.content;

			// Trigger re-render
			posts = [...posts];
		}
	}
</script>

<div class="grid gap-6">
	{#each posts as post}
		<Card
			class="cursor-pointer transition-all hover:translate-y-[-2px]"
			on:click={() => console.log('Card clicked for post ID:', post.id)}
		>
			<div
				class="p-6"
				role="button"
				tabindex="0"
				on:click={() => toggleExpand(post.id)}
				on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleExpand(post.id)}
			>
				<h2 class="mb-2 text-2xl font-semibold">{post.title}</h2>
				<p class="mb-4 text-sm text-muted-foreground">{post.date}</p>

				<p class="text-base leading-relaxed">
					{#if expandedId === post.id}
						{post.content ?? 'Loading...'}
					{:else}
						{post.preview}...
					{/if}
				</p>
			</div>
		</Card>
	{/each}
</div>
