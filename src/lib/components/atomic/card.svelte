<script lang="ts">
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card/index';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	export let data: {
		title: string;
		excerpt: string;
		content?: string;
		date?: string;
		image?: string;
	};

	export let className: HTMLAttributes<HTMLDivElement>['class'] = undefined;
	export { className as class };

	$: isRight = typeof className === 'string' && className.includes('text-right');
</script>

<Card
	class={cn('group w-full', className)}
	{...$$restProps}
	on:click
>
	{#if data.image}
		<img
			src={data.image}
			alt={data.title}
			class="h-44 w-full rounded-t-lg object-cover"
		/>
	{/if}

	<CardHeader
		class={cn(
			'flex flex-wrap items-center justify-between gap-2 pb-2',
			isRight ? 'flex-row-reverse' : 'flex-row'
		)}
	>
		<CardTitle class="leading-tight">{data.title}</CardTitle>
		{#if data.date}
			<CardDescription class="text-sm leading-tight text-muted-foreground">
				{data.date}
			</CardDescription>
		{/if}
	</CardHeader>

	{#if data.content}
		<CardContent>
			<p class="text-sm text-muted-foreground">
				{data.content}
			</p>
		</CardContent>
	{:else}
		<CardContent>
			<p class="line-clamp-3 text-sm text-muted-foreground">
				{data.excerpt}
			</p>
		</CardContent>
	{/if}
</Card>
