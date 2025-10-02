<script lang="ts">
	import BlogForm from '$lib/components/BlogForm.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<p class="text-2xl font-bold text-base-200">Edit Blog</p>

<div>
	<BlogForm form={data.form} />
</div>
