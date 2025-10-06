<script lang="ts">
	import type { portfolioContent } from '$lib/assets/dummy/portfolio';

	let { portfolio }: { portfolio: portfolioContent } = $props();
</script>

<div
	class="card w-full bg-base-200 p-3 shadow-sm transition-shadow duration-300 hover:shadow-md sm:aspect-square sm:p-6 md:p-8"
>
	<div class="flex h-full flex-col justify-between space-y-3 sm:space-y-0">
		<!-- Heading -->
		<div>
			<p class="font-jost text-xs font-bold sm:text-sm md:text-base lg:text-xl">{portfolio.no}</p>
			<p class="font-jost text-sm font-bold sm:text-base md:text-lg lg:text-2xl">
				{portfolio.title}
			</p>
		</div>

		<!-- Description -->
		<div class="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0 md:space-x-2">
			<div class="flex flex-col space-y-2">
				<div class="flex flex-wrap gap-1">
					{#each portfolio.tech as tech}
						<div class="badge badge-outline badge-xs sm:badge-sm">{tech}</div>
					{/each}
				</div>
				<div>
					<p class="font-jost text-xs text-base-content sm:text-sm md:text-base lg:text-lg">
						{portfolio.description}
					</p>
				</div>
			</div>
			<div class="flex flex-row space-x-2 md:flex-col md:space-y-2 md:space-x-0">
				<!-- GitHub Link -->
				<a
					href={portfolio.github ?? '#'}
					target={portfolio.github ? '_blank' : undefined}
					rel={portfolio.github ? 'noopener noreferrer' : undefined}
					class="tooltip flex items-center space-x-1 text-base-content transition-colors hover:text-primary sm:space-x-2"
					data-tip={portfolio.github ? 'See my GitHub' : 'Sorry no resource'}
					onclick={portfolio.github ? undefined : (e) => e.preventDefault()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
					<span class="hidden font-jost text-xs sm:text-sm md:block">GitHub</span>
				</a>

				<!-- Demo Link -->
				<a
					href={portfolio.demo ?? '#'}
					target={portfolio.demo ? '_blank' : undefined}
					rel={portfolio.demo ? 'noopener noreferrer' : undefined}
					class="tooltip flex items-center space-x-1 text-base-content transition-colors hover:text-primary sm:space-x-2"
					data-tip={portfolio.demo ? 'See my Demo' : 'Sorry no resource'}
					onclick={portfolio.demo ? undefined : (e) => e.preventDefault()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
						<circle cx="12" cy="12" r="3" />
					</svg>
					<span class="hidden font-jost text-xs sm:text-sm md:block">Demo</span>
				</a>

				<!-- Website Link -->
				<a
					href={portfolio.website ?? '#'}
					target={portfolio.website ? '_blank' : undefined}
					rel={portfolio.website ? 'noopener noreferrer' : undefined}
					class="tooltip flex items-center space-x-1 text-base-content transition-colors hover:text-primary sm:space-x-2"
					data-tip={portfolio.website ? 'See my Website' : 'Sorry no resource'}
					onclick={portfolio.website ? undefined : (e) => e.preventDefault()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
						<polyline points="15,3 21,3 21,9" />
						<line x1="10" y1="14" x2="21" y2="3" />
					</svg>
					<span class="hidden font-jost text-xs sm:text-sm md:block">Website</span>
				</a>
			</div>
		</div>
	</div>
</div>
