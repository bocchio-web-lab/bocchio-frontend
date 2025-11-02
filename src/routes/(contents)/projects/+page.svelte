<script>
	import {
		Timeline,
		TimelineItem,
		TimelineSeparator,
		TimelineDot,
		TimelineConnector,
		TimelineContent,
		TimelineOppositeContent
	} from 'svelte-vertical-timeline';

	import { cn } from '$lib/utils';
	import { goto } from '$app/navigation';
	import AtomicCard from '$lib/components/atomic/card.svelte';

	export let data;
</script>

<svelte:head>
	<title>Projects | Bocchio Web Lab</title>
	<meta
		name="description"
		content="Explore a collection of robotics and web development projects."
	/>
</svelte:head>

<Timeline position="alternate">
	{#each data.projects as project, i}
		<TimelineItem>
			<TimelineSeparator>
				<TimelineDot
					style="width: 15rem; height: 15rem; background-color: transparent; border: none;"
				>
					<button on:click={() => goto(`/projects/${project.slug}`)}>
						<img
							src={project.image}
							alt={project.name}
							class="h-full w-full object-cover"
						/>
					</button>
				</TimelineDot>

				{#if i < data.projects.length - 1}
					<TimelineConnector style={'height: 100px;'} />
				{/if}
			</TimelineSeparator>
			<TimelineContent>
				<AtomicCard
					data={{
						title: project.name,
						excerpt: project.description
					}}
					class={cn('mt-2', i % 2 === 0 ? 'text-left' : 'text-right')}
					clickable={true}
					on:click={() => goto(`/projects/${project.slug}`)}
				/>
			</TimelineContent>
		</TimelineItem>
	{/each}
</Timeline>
