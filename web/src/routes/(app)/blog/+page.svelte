<script lang="ts">
	import { goto } from '$app/navigation';
	import CardBlog from '$lib/components/CardBlog.svelte';
	import type { PageProps } from './$types';
	import type { blogType } from '$lib/schema/type';

	let { data }: PageProps = $props();

	let tags: string[] = ['tech', 'sport', 'life', 'style'];

	let latestBlog: blogType[] = $derived(data.blogs.slice(0, 2));
</script>

<div class="flex flex-col space-y-3">
	<!-- header kontent -->
	<div class="flex justify-evenly">
		<div class="flex w-full flex-col space-y-4 text-left">
			<div class="flex items-center space-x-1" data-aos="fade-right" data-aos-delay="200">
				<div aria-label="info" class="status status-info"></div>
				<p class="font-jost text-xs font-bold md:text-lg">Blog</p>
			</div>
			<h1
				class="font-jost text-2xl font-bold text-base-content md:text-7xl"
				data-aos="fade-right"
				data-aos-delay="400"
			>
				What in My Mind
			</h1>
			<div data-aos="fade-up" data-aos-delay="600">
				<p class="font-ubuntu text-xs font-light text-base-content md:text-sm">
					I'm glad you're here! Feel free to explore my thoughts and opinions.
				</p>
				<p class="font-ubuntu text-xs font-light text-base-content md:text-sm">
					They're not always about tech, but they're always my yapping.
				</p>
			</div>
		</div>
		<div class="flex flex-col items-end justify-end gap-2 space-y-4">
			<div data-aos="fade-left" data-aos-delay="1000">
				<button
					class="btn rounded-md btn-sm btn-primary md:btn-md {data.isSuper ? 'flex' : 'hidden'}"
					onclick={() => goto('/blog/new')}>Create</button
				>
			</div>
			<div class="flex gap-1" data-aos="fade-left" data-aos-delay="1200">
				{#each tags as tag}
					<div class="badge badge-outline badge-xs badge-primary md:badge-lg">{tag}</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="divider"></div>
	<!-- latest blog -->
	<div class="grid grid-cols-1 place-items-center gap-3 md:grid-cols-2">
		{#if latestBlog.length > 0}
			{#each latestBlog as blog}
				<CardBlog {blog} />
			{/each}
		{:else}
			<div class="col-span-full flex flex-col items-center justify-center space-y-4 py-16">
				<div class="text-6xl opacity-20">📝</div>
				<h2 class="text-center text-3xl font-bold text-base-content">Bip Bip Bip</h2>
				<p class="max-w-md text-center text-lg text-base-content/60">
					Sorry just lazy to write something....
				</p>
			</div>
		{/if}
	</div>
	<div class="divider"></div>
	<!-- all blogs -->

	{#if data.blogs.length > 0}
		<div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
			{#each data.blogs as blog}
				<CardBlog {blog} size={'compact'} />
			{/each}
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center space-y-4 py-12">
			<div class="text-5xl opacity-20">✍️</div>
			<h2 class="text-center text-2xl font-semibold text-base-content">Still Empty</h2>
			<p class="max-w-sm text-center text-base text-base-content/60">Comming soon...</p>
		</div>
	{/if}
</div>
