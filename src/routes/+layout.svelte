<script lang="ts">
	import '../app.css';
	import AOS from 'aos';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-sonner';

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
</script>

<Toaster />
<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
</svelte:head>

<div class="scroll-smooth">
	{@render children?.()}
</div>
