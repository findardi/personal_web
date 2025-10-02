<script lang="ts">
	import { profile01, profile02 } from '$lib/assets/personal';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let techstack: string[] = [
		'TypeScript',
		'Bun',
		'Node.js',
		'Svelte',
		'Tailwind CSS',
		'Go',
		'JavaScript',
		'Docker',
		'Linux'
	];

	function scrollToMore() {
		const element = document.getElementById('more');
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}

	let isDark = $state(false);

	onMount(() => {
		// Ambil theme dari data-theme attribute
		const theme = document.documentElement.getAttribute('data-theme');
		isDark = theme === 'night';

		// Listen untuk perubahan theme
		const observer = new MutationObserver(() => {
			const currentTheme = document.documentElement.getAttribute('data-theme');
			isDark = currentTheme === 'night';
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		return () => observer.disconnect();
	});

	function getMonth() {
		const startDate = new Date(2025, 6, 1); // July 2024 (month is 0-indexed)
		const currentDate = new Date();

		const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
		const monthsDiff = currentDate.getMonth() - startDate.getMonth();

		return yearsDiff * 12 + monthsDiff;
	}
</script>

<div class="flex flex-col gap-y-4">
	<div class="hero min-h-[calc(100vh-6rem)] px-4">
		<div class="hero-content w-full items-center justify-center text-left">
			<div class="grid grid-cols-1 place-content-center gap-6 md:grid-cols-2 md:gap-8">
				<div class="w-full max-w-4xl space-y-4 text-center md:text-left">
					<span
						class="mx-auto badge w-fit badge-outline badge-sm font-jost badge-primary md:mx-0 md:badge-md"
						data-aos="fade-right"
						data-aos-delay="100">Full‑stack Developer</span
					>
					<h1
						class="font-jost text-4xl leading-tight font-extrabold md:text-6xl lg:text-7xl"
						data-aos="fade-up"
						data-aos-delay="200"
					>
						Hola, Cukuruk
					</h1>
					<p
						class="mx-auto max-w-3xl text-justify font-jost text-base leading-relaxed text-base-content/70 md:mx-0 md:text-lg lg:text-xl"
						data-aos="fade-up"
						data-aos-delay="300"
					>
						Hey there! I'm <span class="font-bold text-primary">Ardi Sasongko</span>, a fullstack
						developer who loves keeping things simple and exploring new tech. Always learning,
						always building. Currently working at
						<span class="font-semibold text-secondary">Panemu</span> software house in Indonesia for
						the past <span class="font-mono font-bold text-accent">{getMonth()}</span>
						{getMonth() === 1 ? 'month' : 'months'} and counting.
					</p>
					<div
						class="flex justify-center gap-3 md:justify-start"
						data-aos="fade-up"
						data-aos-delay="400"
					>
						<a href="/portfolio" class="btn btn-neutral">What I Make</a>
						<button class="btn btn-ghost" onclick={scrollToMore}>know me more</button>
					</div>
				</div>
				<div class="flex justify-center md:justify-end">
					<div
						class="card w-fit rounded-lg bg-base-100 p-3 shadow-lg ring-2 ring-base-300 sm:p-4"
						data-aos="fade-left"
						data-aos-delay="500"
					>
						<figure class="hover-gallery w-40 max-w-full rounded-xs sm:w-52 md:w-56 lg:w-60">
							<img src={isDark ? profile02 : profile01} alt="" />
							<img src={isDark ? profile01 : profile02} alt="" />
						</figure>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div
		class="hero min-h-[calc(100vh-6rem)] rounded-t-2xl bg-base-200 p-2 sm:p-4"
		id="more"
		data-aos="fade-up"
	>
		<div
			class="m-0.5 flex h-auto w-full flex-col gap-3 rounded-3xl sm:m-1 sm:gap-2 lg:h-[calc(100vh-6rem-0.5rem)] lg:flex-row lg:gap-2"
		>
			<!-- Left Column: Tech Stack & Free Time -->
			<div class="flex flex-1 flex-col space-y-3 rounded-2xl sm:space-y-2">
				<!-- Tech Stack Card -->
				<div
					class="flex flex-1 flex-col justify-center rounded-2xl from-primary/10 to-primary/5 p-4 sm:p-6"
					data-aos="fade-right"
					data-aos-delay="200"
				>
					<div class="space-y-3 text-center sm:space-y-4">
						<div
							class="mb-2 text-2xl transition-all duration-300 hover:-translate-y-1 sm:mb-4 sm:text-3xl"
						>
							🔥
						</div>
						<h3 class="mb-2 text-xl font-bold text-primary sm:mb-3 sm:text-2xl">Amunition Tech</h3>
						<p class="text-sm leading-relaxed text-base-content/80 sm:text-base">
							equipment and abilities that I master
						</p>
						<div class="mt-3 flex flex-wrap justify-center gap-1.5 sm:mt-4 sm:gap-2">
							{#each techstack as tech, index}
								<span
									class="badge badge-sm transition-all duration-300 badge-neutral hover:-translate-y-1 sm:badge-md md:badge-lg"
									data-aos="zoom-in"
									data-aos-delay={300 + index * 50}>{tech}</span
								>
							{/each}
						</div>
					</div>
				</div>

				<!-- Development Focus Card -->
				<div
					class="flex flex-1 flex-col justify-center rounded-2xl border-2 border-gray-700/30 from-secondary/10 to-secondary/5 p-4 sm:border-4 sm:p-6"
					data-aos="fade-right"
					data-aos-delay="400"
				>
					<div class="space-y-3 text-center sm:space-y-4">
						<div
							class="mb-2 text-2xl transition-all duration-300 hover:-translate-y-1 sm:mb-4 sm:text-3xl"
						>
							💻
						</div>
						<h3 class="mb-2 text-xl font-bold text-secondary sm:mb-3 sm:text-2xl">
							What I'm Good At
						</h3>
						<p class="text-sm leading-relaxed text-base-content/80 sm:text-base">
							The tech stuff I'm really into and pretty solid at
						</p>
						<div class="mt-3 space-y-2 text-left sm:mt-4">
							<div class="flex items-start gap-2">
								<span class="text-lg">🎯</span>
								<div class="flex-1">
									<p class="text-xs font-semibold sm:text-sm">Backend Development</p>
									<p class="text-xs text-base-content/70">
										Building APIs, microservices, and designing databases that actually work
									</p>
								</div>
							</div>
							<div class="flex items-start gap-2">
								<span class="text-lg">🎨</span>
								<div class="flex-1">
									<p class="text-xs font-semibold sm:text-sm">Frontend Development</p>
									<p class="text-xs text-base-content/70">
										Crafting slick UIs that look good on any screen
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Right Column: Current Learning -->
			<div
				class="flex flex-1 flex-col items-center justify-center rounded-2xl from-accent/10 to-accent/5 p-4 sm:p-6"
				data-aos="fade-left"
				data-aos-delay="600"
			>
				<div class="w-full space-y-4 text-center sm:space-y-6">
					<div
						class="mb-2 text-3xl transition-all duration-300 hover:-translate-y-1 sm:mb-4 sm:text-4xl"
					>
						📚
					</div>
					<h3 class="mb-3 text-xl font-bold text-accent sm:mb-4 sm:text-2xl">
						Currently Exploring
					</h3>
					<p class="text-sm leading-relaxed text-base-content/80 sm:text-base">
						Technologies and concepts I'm currently digging into
					</p>
					<div class="mx-auto w-full max-w-md space-y-3">
						<div
							class="rounded-lg border border-accent/30 bg-accent/5 p-3 text-left transition-all duration-300 hover:border-accent/50 hover:bg-accent/10"
							data-aos="zoom-in"
							data-aos-delay="700"
						>
							<div class="flex items-center gap-2">
								<span class="text-xl">🚀</span>
								<div class="flex-1">
									<p class="text-sm font-semibold">Performance Optimization</p>
									<p class="text-xs text-base-content/70">
										Learning to boost app speed and efficiency, from database queries to the
										functions I use
									</p>
								</div>
							</div>
						</div>
						<div
							class="rounded-lg border border-accent/30 bg-accent/5 p-3 text-left transition-all duration-300 hover:border-accent/50 hover:bg-accent/10"
							data-aos="zoom-in"
							data-aos-delay="800"
						>
							<div class="flex items-center gap-2">
								<span class="text-xl">🔐</span>
								<div class="flex-1">
									<p class="text-sm font-semibold">Security Best Practices</p>
									<p class="text-xs text-base-content/70">
										Implementing security measures on both frontend and backend
									</p>
								</div>
							</div>
						</div>
						<div
							class="rounded-lg border border-accent/30 bg-accent/5 p-3 text-left transition-all duration-300 hover:border-accent/50 hover:bg-accent/10"
							data-aos="zoom-in"
							data-aos-delay="900"
						>
							<div class="flex items-center gap-2">
								<span class="text-xl">⚙️</span>
								<div class="flex-1">
									<p class="text-sm font-semibold">DevOps</p>
									<p class="text-xs text-base-content/70">
										Implementing DevOps practices to level up app efficiency and quality
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="my-4">
		<div class="divider"></div>
		<div class="mb-4 text-center" data-aos="fade-up" data-aos-delay="100">
			<h2 class="mb-4 text-3xl font-bold">My Journey</h2>
			<p class="text-base-content/70">A short story about how I got into tech.</p>
		</div>
		<ul class="timeline timeline-vertical space-y-4 timeline-snap-icon max-md:timeline-compact">
			<li>
				<div class="timeline-middle" data-aos="zoom-in" data-aos-delay="150">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-5 w-5"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class="timeline-start mb-10 md:text-end" data-aos="fade-right" data-aos-delay="200">
					<time class="font-mono italic">2020</time>
					<div class="text-md font-black md:text-lg">Fresh Start in Tech</div>
					<div
						class="mt-2 space-y-2 text-left text-xs leading-relaxed text-base-content/80 md:text-right md:text-sm"
					>
						<p>
							Jumped into IT with literally zero coding experience. Had no idea what I was getting
							into, honestly.
						</p>
						<p>
							Started with C++ (brutal first language, btw), then picked up HTML, CSS, and PHP.
							Can't remember much PHP anymore though.
						</p>
						<p>
							Layouts were a nightmare at first. Then Java came along with OOP concepts and things
							started clicking.
						</p>
						<p>
							Most of that C++ knowledge? Gone lol. Oh, and this was all during COVID lockdown, so
							learning remotely made it way harder.
						</p>
					</div>
				</div>
				<hr />
			</li>
			<li>
				<hr />
				<div class="timeline-middle" data-aos="zoom-in" data-aos-delay="250">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-5 w-5"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class="timeline-end md:mb-10" data-aos="fade-left" data-aos-delay="300">
					<time class="font-mono italic">2022</time>
					<div class="text-md font-black md:text-lg">Reality Check</div>
					<div
						class="mt-2 space-y-2 text-left text-xs leading-relaxed text-base-content/80 md:text-sm"
					>
						<p>Hit semester 5 and realized my coding skills were pretty rough, not gonna lie.</p>
						<p>Started teaching myself on the side, questioning if I even picked the right path.</p>
						<p>Kept at it though, and eventually figured out what I'd been missing all along.</p>
					</div>
				</div>
				<hr />
			</li>
			<li>
				<hr />
				<div class="timeline-middle" data-aos="zoom-in" data-aos-delay="350">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-5 w-5"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class="timeline-start mb-10 md:text-end" data-aos="fade-right" data-aos-delay="400">
					<time class="font-mono italic">2023 - 2024</time>
					<div class="text-md font-black md:text-lg">Turning Point</div>
					<div
						class="mt-2 space-y-2 text-left text-xs leading-relaxed text-base-content/80 md:text-right md:text-sm"
					>
						<p>Semester 5 - joined the government's Kampus Merdeka program. Huge game changer.</p>
						<p>
							Got into backend development, though I was definitely playing catch-up with my team.
						</p>
						<p>Took online courses on Dicoding, dove into JavaScript and Node.js.</p>
						<p>
							Semester 6 really pushed me. Finally started understanding what programming is
							actually about, not just syntax.
						</p>
						<p>
							Semester 7 - back to Kampus Merdeka with MIKTI, this time learning Go. Yeah, another
							new language.
						</p>
						<p>
							Each step taught me something real. Semester 8 was all about my thesis (networking
							stuff, not coding).
						</p>
						<p>
							Not the most exciting story, but hey - graduated in 4 years and 1 month, so I'll take
							it.
						</p>
					</div>
				</div>
				<hr />
			</li>
			<li>
				<hr />
				<div class="timeline-middle" data-aos="zoom-in" data-aos-delay="450">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-5 w-5"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class="timeline-end md:mb-10" data-aos="fade-left" data-aos-delay="500">
					<time class="font-mono italic">2025</time>
					<div class="text-md font-black md:text-lg">Breaking Into the Industry</div>
					<div
						class="mt-2 space-y-2 text-left text-xs leading-relaxed text-base-content/80 md:text-sm"
					>
						<p>Spent six months grinding, looking for my first real gig.</p>
						<p>
							After graduating, I put in 4 solid months learning on Udemy and YouTube. Felt pretty
							behind and honestly a bit insecure.
						</p>
						<p>
							Two months of applications - most job posts wanted "3+ years experience, 10+ skills."
							Had a few interviews, bombed some because my communication wasn't great.
						</p>
						<p>
							Finally landed at a software house. Still feel like I've got a lot to prove, but I'm
							here to soak up as much experience as I can.
						</p>
					</div>
				</div>
				<hr />
			</li>
		</ul>
		<div class="divider"></div>
	</div>

	<div class="hero mt-2 min-h-[calc(100vh-6rem)]">
		<div class="flex w-[calc(100%-0.5rem)] flex-col items-center justify-center gap-4">
			<div class="mb-8 text-center" data-aos="fade-up">
				<h2 class="mb-4 text-3xl font-bold">Get to Know Me Better</h2>
				<p class="text-base-content/70">
					Curious about who I am beyond the code? Here are some fun facts!
				</p>
			</div>

			<!-- <div
				class="collapse w-full max-w-4xl border border-base-300 bg-base-100"
				data-aos="fade-up"
				data-aos-delay="100"
			>
				<input type="checkbox" />
				<div class="collapse-title font-semibold">
					☕ What's your favorite way to start the day?
				</div>
				<div class="collapse-content text-sm">
					<p>
						As a Muslim, the first thing I do in the morning is prayer, that's how I start my day.
					</p>
				</div>
			</div> -->

			<div
				class="collapse w-full max-w-4xl border border-base-300 bg-base-100"
				data-aos="fade-up"
				data-aos-delay="200"
			>
				<input type="checkbox" />
				<div class="collapse-title font-semibold">
					🎮 What do you do for fun when you're not coding?
				</div>
				<div class="collapse-content text-sm">
					<p>
						Great question! I don't really do much, other than maybe scrolling through YouTube,
						watching movies or anime, and at the end of the week I usually go for a workout. And
						usually, I'm exploring new tech, because, you know, tech is always moving forward!
					</p>
				</div>
			</div>

			<div
				class="collapse w-full max-w-4xl border border-base-300 bg-base-100"
				data-aos="fade-up"
				data-aos-delay="300"
			>
				<input type="checkbox" />
				<div class="collapse-title font-semibold">🍕 What's your go-to comfort food?</div>
				<div class="collapse-content text-sm">
					<p>
						Hey, this is tough! But if I had to choose, I'd say my favorite salad is actually a
						lotek. lotek is a salad from Indonesia, but it's more flavorful. Trust me, lotek is the
						best salad ever.
					</p>
				</div>
			</div>

			<div
				class="collapse w-full max-w-4xl border border-base-300 bg-base-100"
				data-aos="fade-up"
				data-aos-delay="400"
			>
				<input type="checkbox" />
				<div class="collapse-title font-semibold">
					🌍 If you could travel anywhere right now, where would you go?
				</div>
				<div class="collapse-content text-sm">
					<p>
						Oh, that's an interesting question! I think I'd start with Indonesia, because I think
						there are many hidden spots in Indonesia that aren't well-known yet. And I think I'd
						like to visit Mongolia, with its vast savannas, and see where the wild things roam. And
						maybe Japan, because of its beautiful culture.
					</p>
				</div>
			</div>

			<div
				class="collapse w-full max-w-4xl border border-base-300 bg-base-100"
				data-aos="fade-up"
				data-aos-delay="600"
			>
				<input type="checkbox" />
				<div class="collapse-title font-semibold">🎵 What's currently on your playlist?</div>
				<div class="collapse-content text-sm">
					<p>
						Currently, I don't have a specific type of music that I like, basically I like anything
						that's good to listen to. So, I like hip-hop, R&B, pop, and traditional music, basically
						anything that's enjoyable to listen to.
					</p>
				</div>
			</div>

			<div
				class="collapse w-full max-w-4xl border border-base-300 bg-base-100"
				data-aos="fade-up"
				data-aos-delay="500"
			>
				<input type="checkbox" />
				<div class="collapse-title font-semibold">
					💡 What's your approach to learning new tech?
				</div>
				<div class="collapse-content text-sm">
					<p>
						I usually kick things off by watching video tutorials on different platforms. Get
						familiar with the basics first, jot down the tricky parts I don't quite get, then ask AI
						to break it down for me. After that, I start building projects - keeping it simple at
						first. Mix in some official docs reading and articles from blogs here and there. Bottom
						line? There's tons of resources out there for learning new tech. It's really just about
						how you start and how you adapt along the way.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
