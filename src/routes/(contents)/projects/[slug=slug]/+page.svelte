<script lang="ts">
	export let data: { project: any };
</script>

<div class="mx-auto w-full max-w-2xl p-10">
	<img
		src={data.project.image}
		alt={data.project.name}
		class="mb-6 w-full rounded-xl object-cover shadow-lg"
	/>

	<h1 class="mb-3 text-3xl font-bold">{data.project.name}</h1>
	<p class="mb-4 text-muted-foreground">{data.project.year}</p>

	<p class="mb-6 leading-relaxed">{data.project.description}</p>

	<!-- Example of rendering markdown readme -->
	<!-- {#if data.project.readme_html}
		<div class="prose dark:prose-invert max-w-none" {@html data.project.readme_html}></div>
	{/if} -->
</div>
