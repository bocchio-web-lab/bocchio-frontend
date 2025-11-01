<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.apps as app}
	<Card.Root
		class="group flex w-full flex-wrap justify-between gap-8 transition-transform odd:flex-row-reverse hover:scale-105"
	>
		<div class="grow-[2] basis-96 content-center">
			<Card.Header>
				<Card.Title>{app.title}</Card.Title>
				<Card.Description>{app.description}</Card.Description>
			</Card.Header>

			<Card.Content>
				{app.content}
			</Card.Content>
		</div>
		<div class="grow-[1] basis-60 content-center">
			<img
				src="/icons/github.svg"
				class="m-auto max-h-52 max-w-full rounded-2xl bg-white p-6 transition-transform group-hover:scale-110"
				alt="GitHub logo"
			/>
		</div>

		<Card.Footer class="mt-auto block w-full">
			<a
				href={app.link}
				class=" w-full"
			>
				<Button class="w-full">Try the app!</Button>
			</a>
		</Card.Footer>
	</Card.Root>
{/each}
