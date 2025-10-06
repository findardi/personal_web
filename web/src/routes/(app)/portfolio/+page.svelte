<script lang="ts">
	import { portfolioContents } from '$lib/assets/dummy/portfolio';
	import CardPortfolio from '$lib/components/CardPortfolio.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex flex-col space-y-4">
	<!-- heading -->
	<div class="grid grid-cols-1 gap-5 md:grid-cols-3" data-aos="fade-up" data-aos-duration="800">
		<div class="flex flex-col space-y-4">
			<div class="flex items-center space-x-1" data-aos="fade-right" data-aos-delay="200">
				<div aria-label="info" class="status status-info"></div>
				<p class="font-jost text-xs font-bold md:text-lg">Portfolio</p>
			</div>
			<h1
				class="font-jost text-2xl font-bold md:text-6xl"
				data-aos="fade-right"
				data-aos-delay="400"
			>
				Everything What I Make
			</h1>
		</div>
		<div
			class="col-span-2 hidden place-content-end md:block"
			data-aos="fade-left"
			data-aos-delay="600"
		>
			<div class="divider"></div>
		</div>
	</div>

	<div class="divider my-2" data-aos="fade-up" data-aos-delay="800"></div>
	<!-- portfolio card -->
	<div
		class="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
		data-aos="fade-up"
		data-aos-delay="1000"
	>
		{#each portfolioContents as portfolio, index}
			<div data-aos="zoom-in" data-aos-delay={1200 + index * 150}>
				<CardPortfolio {portfolio} />
			</div>
		{/each}
	</div>
</div>
