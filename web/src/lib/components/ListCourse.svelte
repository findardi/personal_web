<script lang="ts">
	import type { courseContent } from '$lib/assets/dummy/dummy_course';

	let { courses }: { courses: courseContent[] } = $props();
</script>

<ul class="list rounded-box bg-base-100/80 shadow-sm">
	{#each courses as course}
		<li class="list-row">
			<div class="flex flex-col space-y-1">
				<h3 class="text-md font-jost font-bold text-base-content lg:text-lg">{course.name}</h3>
				<div class="font-jost text-xs font-semibold uppercase opacity-60">{course.heading}</div>
			</div>
			<p class="list-col-wrap font-jost text-sm lg:text-lg">{course.description}</p>
			<button
				class="btn btn-square btn-ghost"
				aria-label="Open link"
				onclick={() => window.open(course.link, '_blank')}
			>
				<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						fill="none"
					>
						<path d="M15 7h2a5 5 0 0 1 0 10h-2"></path>
						<path d="M9 17H7a5 5 0 0 1 0-10h2"></path>
						<path d="M8 12h8"></path>
					</g>
				</svg>
			</button>
		</li>
	{/each}
</ul>
