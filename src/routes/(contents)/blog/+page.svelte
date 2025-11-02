<script lang="ts">
	import { onMount } from 'svelte';
	import { Card } from '$lib/components/ui/card';
	import AtomicCard from '$lib/components/atomic/card.svelte';
	import { goto } from '$app/navigation';

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
		<AtomicCard
			data={{
				title: post.title,
				excerpt: post.preview,
				content: expandedId === post.id ? post.content : undefined,
				date: post.date
			}}
			class="cursor-pointer"
			clickable={true}
			on:click={() => toggleExpand(post.id)}
		/>
	{/each}
</div>
