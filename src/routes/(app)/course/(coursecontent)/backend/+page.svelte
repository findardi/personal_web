<script lang="ts">
	import { backendCourse } from '$lib/assets/dummy/dummy_course';
	import ListCourse from '$lib/components/ListCourse.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ListCourse courses={backendCourse} />
