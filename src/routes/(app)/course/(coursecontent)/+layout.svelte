<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	let url = $derived(page.url.pathname);
</script>

<div class="flex flex-col space-y-3">
	<div class="flex justify-evenly">
		<div class="flex w-full flex-col space-y-4 text-left">
			<div class="flex items-center space-x-1" data-aos="fade-right" data-aos-delay="200">
				<div aria-label="info" class="status status-info"></div>
				<p class="font-jost text-xs font-bold md:text-lg">Courses</p>
			</div>
			<h1
				class="font-jost text-2xl font-bold text-base-content md:text-7xl"
				data-aos="fade-right"
				data-aos-delay="400"
			>
				Everything resource i learn
			</h1>
			<div data-aos="fade-up" data-aos-delay="600">
				<p class="font-ubuntu text-xs font-light text-base-content md:text-sm">
					I'm glad you're here! Feel free to explore my resources.
				</p>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div role="tablist" class="tabs-lift tabs tabs-sm md:tabs-lg">
		<a href="/course/backend" role="tab" class="tab {url.includes('/backend') ? 'tab-active' : ''} "
			>Backend</a
		>
		<a
			href="/course/frontend"
			role="tab"
			class="tab {url.includes('/frontend') ? 'tab-active' : ''} ">frontend</a
		>
		<a href="/course/other" role="tab" class="tab {url.includes('/other') ? 'tab-active' : ''} "
			>other</a
		>
		<span class="tab"></span>
	</div>

	<div class="mt-6">
		{@render children()}
	</div>
</div>
