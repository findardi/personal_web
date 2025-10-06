<script lang="ts">
	import '../app.css';
	import AOS from 'aos';
	import icon from '$lib/assets/icon-no-bg.png';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import { page } from '$app/state';

	let { children } = $props();

	onMount(() => {
		AOS.init({
			duration: 800,
			easing: 'ease-out-cubic',
			once: true,
			offset: 100,
			delay: 0
		});
	});

	const defaultDesc =
		'Ardi Sasongko - Full Stack Developer passionate about building modern web applications. Experienced in TypeScript, Node.js, Svelte, and Go. Currently working at Panemu software house.';
</script>

<Toaster richColors expand={true} />
<svelte:head>
	<link rel="icon" href={icon} />
	<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

	<title>{page.data.title ? `${page.data.title} | Ardi Sasongko` : `Hei, Come Here!`}</title>
	<meta
		name="description"
		content={page.data.description ? `${page.data.description}` : defaultDesc}
	/>
</svelte:head>

<div class="scroll-smooth">
	{@render children?.()}
</div>
