<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let url = $derived(page.url.pathname);
	let isNight = $state(false);

	onMount(() => {
		const current = document.documentElement.getAttribute('data-theme') ?? 'lofi';
		isNight = current === 'night';
	});

	function toggleTheme(event: Event) {
		const checked = (event.currentTarget as HTMLInputElement).checked;
		const theme = checked ? 'night' : 'lofi';
		document.documentElement.setAttribute('data-theme', theme);
		document.documentElement.style.colorScheme = theme === 'night' ? 'dark' : 'light';
		try {
			localStorage.setItem('theme', theme);
		} catch (_) {}
		isNight = checked;
	}
</script>

<div
	class="flex h-13 w-full max-w-xs items-center justify-center space-x-4 rounded-full bg-base-200/80 px-3 shadow-sm backdrop-blur-md sm:max-w-2xl sm:px-4 md:max-w-4xl md:justify-between md:px-6"
>
	<div class="hidden items-center md:block">
		<p class="text-base font-bold md:text-lg">LOGO</p>
	</div>

	<div class="flex justify-center md:flex-1">
		<div class="flex space-x-1 sm:space-x-3 md:space-x-6">
			<!-- Home / About Me -->
			<a
				href="/"
				class="btn relative btn-ghost transition-all duration-300 btn-sm md:btn-md {url === '/'
					? '-translate-y-1 text-base-content'
					: 'hover:-translate-y-0.5'}"
			>
				<!-- Icon untuk mobile -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 md:hidden"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
					<circle cx="12" cy="7" r="4" />
				</svg>
				<!-- Text untuk desktop -->
				<span class="hidden md:inline">More About Me</span>
				{#if url === '/'}
					<span class="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
					></span>
				{/if}
			</a>

			<!-- Portfolio -->
			<a
				href="/portfolio"
				class="btn relative btn-ghost transition-all duration-300 btn-sm md:btn-md {url.includes(
					'/portfolio'
				)
					? '-translate-y-1 text-base-content'
					: 'hover:-translate-y-0.5'}"
			>
				<!-- Icon untuk mobile -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 md:hidden"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
					<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
				</svg>
				<!-- Text untuk desktop -->
				<span class="hidden md:inline">What I Make</span>
				{#if url.includes('/portfolio')}
					<span class="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
					></span>
				{/if}
			</a>

			<!-- Course -->
			<a
				href="/course"
				class="btn relative btn-ghost transition-all duration-300 btn-sm md:btn-md {url.includes(
					'/course'
				)
					? '-translate-y-1 text-base-content'
					: 'hover:-translate-y-0.5'}"
			>
				<!-- Icon untuk mobile -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 md:hidden"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
					<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
				</svg>
				<!-- Text untuk desktop -->
				<span class="hidden md:inline">What I Learn</span>
				{#if url.includes('/course')}
					<span class="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
					></span>
				{/if}
			</a>

			<!-- Blog -->
			<a
				href="/blog"
				class="btn relative btn-ghost transition-all duration-300 btn-sm md:btn-md {url.includes(
					'/blog'
				)
					? '-translate-y-1 text-base-content'
					: 'hover:-translate-y-0.5'}"
			>
				<!-- Icon untuk mobile -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 md:hidden"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
					<polyline points="14 2 14 8 20 8" />
					<line x1="16" y1="13" x2="8" y2="13" />
					<line x1="16" y1="17" x2="8" y2="17" />
					<polyline points="10 9 9 9 8 9" />
				</svg>
				<!-- Text untuk desktop -->
				<span class="hidden md:inline">What I Write</span>
				{#if url.includes('/blog')}
					<span class="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
					></span>
				{/if}
			</a>
		</div>
	</div>

	<div class="flex items-center">
		<label class="swap swap-rotate">
			<!-- this hidden checkbox controls the state -->
			<input
				type="checkbox"
				class="theme-controller"
				value="night"
				hidden
				bind:checked={isNight}
				onchange={toggleTheme}
			/>

			<!-- sun icon -->
			<svg
				class="swap-off h-6 w-6 fill-current md:h-10 md:w-10"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
				/>
			</svg>

			<!-- moon icon -->
			<svg
				class="swap-on h-6 w-6 fill-current md:h-10 md:w-10"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
				/>
			</svg>
		</label>
	</div>
</div>
