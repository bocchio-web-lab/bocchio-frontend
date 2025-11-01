<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const particles: NodeListOf<HTMLDivElement> = document.querySelectorAll('.particle');

		particles.forEach((particle) => animateParticle(particle));
	});

	const animateParticle = (particle: HTMLDivElement) => {
		const size = Math.random() * 5 + 1;
		const opacity = Math.random();
		const delay = Math.random();

		const xInitial = Math.random() * 100;
		const yInitial = Math.random() * 100;
		const xFinal = Math.random() * 100;
		const yFinal = Math.random() * 100;

		particle.style.width = `${size}px`;
		particle.style.height = `${size}px`;
		particle.style.opacity = `opacity`;
		particle.style.transform = `translate(${xInitial}vw, ${yInitial}vh)`;

		particle.animate(
			[
				{
					transform: `translate(${xFinal}vw, ${yFinal}vh)`
				}
			],
			{
				duration: 100 * 1000,
				iterations: Infinity,
				easing: 'linear',
				delay: delay
			}
		);
	};
</script>

<div class="fixed top-0 -z-50 h-screen w-full animate-particleReveal bg-background opacity-0">
	{#each Array(100) as _, index (index)}
		<figure class="particle absolute m-0 rounded-full bg-foreground"></figure>
	{/each}
</div>
