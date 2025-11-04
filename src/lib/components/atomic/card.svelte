<script
	context="module"
	lang="ts"
>
	export type AtomicCardData = {
		title: string;
		content: string;
		date?: string;
		image?: string;
	};
</script>

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

	export let data: AtomicCardData;
	export let preview: boolean = false;
	export let className: HTMLAttributes<HTMLDivElement>['class'] = undefined;
	export { className as class };
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

	<CardHeader class="flex flex-row flex-wrap items-center justify-between gap-2 pb-2">
		<CardTitle class="leading-tight">{data.title}</CardTitle>
		{#if data.date}
			<CardDescription class="text-sm leading-tight text-muted-foreground">
				{data.date}
			</CardDescription>
		{/if}
	</CardHeader>

	<CardContent>
		<p class={cn('text-sm text-muted-foreground', preview ? 'line-clamp-3' : '')}>
			{data.content}
		</p>
	</CardContent>
</Card>
