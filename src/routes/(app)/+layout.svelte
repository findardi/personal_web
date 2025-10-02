<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex min-h-screen flex-col pt-16 sm:pt-20 md:pt-24">
	<div class="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center sm:top-4">
		<div class="pointer-events-auto mx-2 sm:mx-4">
			<Navbar />
		</div>
	</div>

	<div class="my-4 flex flex-grow flex-col items-center justify-center space-y-2 sm:my-6">
		<div class="w-full max-w-7xl px-3 sm:px-4 lg:px-8">
			{@render children()}
			<div class="divider mt-4 sm:mt-5"></div>
		</div>
	</div>

	<div class="mt-auto">
		<Footer />
	</div>
</div>
