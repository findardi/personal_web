<script lang="ts">
	import { page } from '$app/state';
	import CardBlog from '$lib/components/CardBlog.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	let url = $derived(page.url.pathname);

	function getBreadcrumbTitle() {
		if (url.includes('/new')) {
			return 'New Blog';
		} else if (url.includes('/edit')) {
			return 'Edit Blog';
		} else {
			return 'Blog Title';
		}
	}
</script>

<div class="min-h-screen bg-base-100 pt-16">
	<div class="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-4 md:px-6 lg:px-8">
		<!-- Breadcrumbs -->
		<nav class="breadcrumbs text-sm">
			<ul class="flex items-center">
				<li>
					<a
						href="/blog"
						class="link text-base-content/60 link-hover transition-colors hover:text-base-content"
					>
						Blog
					</a>
				</li>
				<li class="font-medium text-base-content">
					{getBreadcrumbTitle()}
				</li>
			</ul>
		</nav>

		<!-- Blog Content -->
		<article
			class="mx-auto prose prose-lg w-full max-w-3xl prose-headings:text-base-content prose-p:text-base-content/80 prose-a:text-primary prose-blockquote:border-l-primary prose-blockquote:text-base-content/70 prose-strong:text-base-content prose-code:text-accent prose-pre:bg-base-200"
		>
			{@render children()}
		</article>

		<!-- other blog -->
		{#if !url.includes('/new') && !url.includes('/edit')}
			<footer class="mx-auto mt-12 w-full max-w-3xl border-t border-base-300 pt-8">
				<div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-3">
					{#each data.blogs.slice(0, 3) as blog}
						<CardBlog {blog} size={'compact'} />
					{/each}
				</div>
			</footer>
		{/if}
	</div>
</div>
