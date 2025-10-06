<script lang="ts">
	import type { blogType } from '$lib/schema/type';
	import { getRandomBanner } from '$lib/utils/getrandombanner';

	let { blog, size = 'default' }: { blog: blogType; size?: 'default' | 'compact' } = $props();

	let tags: string[] = $derived(blog?.tags[0].split(',') || []);

	let bannerSource = $derived(blog?.banner ? blog.banner : getRandomBanner());

	// Limit tags based on size
	let displayTags = $derived(size === 'compact' ? tags.slice(0, 2) : tags);

	// Description length based on size
	let descLength = $derived(size === 'compact' ? 10 : 25);
</script>

<div
	class="card h-full w-full cursor-pointer bg-base-100 transition-shadow duration-300 hover:shadow-md"
>
	<a href={`/blog/${blog.slug}`}>
		<figure class="aspect-video">
			<img src={bannerSource} alt="Blog post thumbnail" class="h-full w-full object-cover" />
		</figure>
		<div class="card-body flex-1 {size === 'compact' ? 'p-3' : 'p-4'}">
			<div class="flex h-full flex-col {size === 'compact' ? 'gap-1.5' : 'gap-2'}">
				<div class="flex items-center justify-between">
					<div class="flex flex-wrap {size === 'compact' ? 'gap-0.5' : 'gap-1'}">
						{#each displayTags as tag}
							<div
								class="badge badge-xs transition-all duration-300 badge-primary hover:-translate-y-1"
							>
								{tag}
							</div>
						{/each}
					</div>
					{#if size === 'default'}
						<div class="flex">
							<time
								datetime={new Date(blog.createdAt).toISOString()}
								class="text-xs text-base-content/60"
							>
								{new Date(blog.createdAt).toLocaleDateString('id-ID')}
							</time>
						</div>
					{/if}
				</div>
				<div class="flex-1 {size === 'compact' ? 'mt-1' : 'mt-2'}">
					<h3
						class="line-clamp-2 font-semibold {size === 'compact'
							? 'text-sm'
							: 'text-base md:text-lg'}"
					>
						{blog.title}
					</h3>
					<p
						class="line-clamp-3 text-base-content/70 {size === 'compact'
							? 'mt-1 text-xs'
							: 'mt-2 text-sm'}"
					>
						{blog.description.slice(0, descLength)}...
					</p>
				</div>
			</div>
		</div>
	</a>
</div>
