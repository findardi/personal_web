<script lang="ts">
	import { goto } from '$app/navigation';
	import { getRandomBanner } from '$lib/utils/getrandombanner';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex flex-col">
	{#await data.blog}
		{#each { length: 8 }}
			<div class="mb-2 h-4 w-full skeleton rounded-md"></div>
			<div class="mb-2 h-4 w-full skeleton rounded-md"></div>
			<div class="mb-2 h-4 w-full skeleton rounded-md"></div>
		{/each}
	{:then blog}
		<!-- image blog -->
		<div class="card w-full">
			<figure>
				<img src={blog.banner ? blog.banner : getRandomBanner()} alt="Shoes" />
			</figure>
		</div>
		<!-- blog content -->
		<div class="mt-6 flex flex-col space-y-4 p-0">
			<div class="flex w-full items-center justify-between">
				<div class="flex items-center justify-start gap-2">
					<p class="text-sm font-bold">Creator name</p>
					<time datetime="2025-09-19" class="text-xs font-bold text-base-content/60"
						>{blog.createdAt}</time
					>
				</div>
				<div>
					<button class="btn rounded-md btn-primary" onclick={() => goto(`/blog/${blog.slug}/edit`)}
						>Edit</button
					>
				</div>
			</div>

			<!-- blog title -->
			<div class="flex flex-col space-y-2">
				<div>
					<h1 class="text-5xl font-bold text-base-content">{blog.title}</h1>
				</div>
				<div class="flex space-x-1">
					{#each blog.tags[0].split(',') as tag}
						<div class="badge badge-outline badge-sm badge-primary">{tag}</div>
					{/each}
				</div>
			</div>

			<div class="divider"></div>

			<!-- body -->
			<div class="mt-1">
				{#if blog.content}
					<div class="prose prose-lg max-w-none text-justify text-base-content">
						{@html blog.content}
					</div>
				{:else}
					<p class="text-justify text-base-content">Konten tidak tersedia.</p>
				{/if}
			</div>
		</div>
	{:catch error}
		<p>Failed to load blog: {error.message}</p>
	{/await}
</div>
