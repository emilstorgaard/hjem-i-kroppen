<script lang="ts">
	import { testimonials } from '$lib/content';

	// Only worth carousel-ing when there are more than fit in one row (3).
	const isCarousel = testimonials.length > 3;
	const autoplayDelay = 6000;

	let trackEl: HTMLDivElement | undefined = $state();
	let activeIndex = $state(0);
	let isPaused = $state(false);
	// How many cards fit in the visible track at once (matches the sm/lg width breakpoints below).
	let visibleCount = $state(1);

	// The last index that can actually scroll further right - clicking past it just loops back to 0.
	const maxIndex = $derived(Math.max(0, testimonials.length - visibleCount));

	$effect(() => {
		if (typeof window === 'undefined') return;
		const mqSm = window.matchMedia('(min-width: 640px)');
		const mqLg = window.matchMedia('(min-width: 1024px)');
		const update = () => {
			visibleCount = mqLg.matches ? 3 : mqSm.matches ? 2 : 1;
		};
		update();
		mqSm.addEventListener('change', update);
		mqLg.addEventListener('change', update);
		return () => {
			mqSm.removeEventListener('change', update);
			mqLg.removeEventListener('change', update);
		};
	});

	function scrollToIndex(index: number) {
		if (!trackEl) return;
		const count = maxIndex + 1;
		const clamped = ((index % count) + count) % count;
		activeIndex = clamped;
		const card = trackEl.children[clamped] as HTMLElement | undefined;
		// Scroll the track directly (not scrollIntoView) so the page itself never scrolls vertically.
		if (card) trackEl.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
	}

	function next() {
		scrollToIndex(activeIndex + 1);
	}

	function prev() {
		scrollToIndex(activeIndex - 1);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			next();
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			prev();
		}
	}

	// Keep the active dot in sync when the user drags/swipes the track manually.
	function handleScroll() {
		if (!trackEl) return;
		const track = trackEl;
		let closest = 0;
		let closestDistance = Infinity;
		[...track.children].forEach((child, i) => {
			const distance = Math.abs((child as HTMLElement).offsetLeft - track.scrollLeft);
			if (distance < closestDistance) {
				closestDistance = distance;
				closest = i;
			}
		});
		activeIndex = Math.min(closest, maxIndex);
	}

	$effect(() => {
		if (!isCarousel || typeof window === 'undefined') return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const interval = setInterval(() => {
			if (!isPaused) next();
		}, autoplayDelay);
		return () => clearInterval(interval);
	});
</script>

{#snippet stars(rating: number)}
	<div class="flex gap-1 text-sand-500" role="img" aria-label="{rating} ud af 5 stjerner">
		{#each { length: 5 } as _, i (i)}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill={i < rating ? 'currentColor' : 'none'}
				stroke="currentColor"
				stroke-width="1"
				aria-hidden="true"
				class="h-5 w-5"
			>
				<path
					d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77-4.19-4.08 5.79-.84L10 1.5z"
				/>
			</svg>
		{/each}
	</div>
{/snippet}

{#snippet testimonialCard(testimonial: (typeof testimonials)[number])}
	<figure class="flex flex-col rounded-3xl bg-sand-50 p-8 shadow-sm ring-1 ring-sand-200">
		{@render stars(testimonial.rating)}
		<blockquote class="mt-5 flex-1 text-lg leading-relaxed text-sand-800 italic">
			&laquo;{testimonial.quote}&raquo;
		</blockquote>
		<figcaption class="mt-6 text-sm font-medium tracking-wide text-sand-600 uppercase">
			{testimonial.name}
		</figcaption>
	</figure>
{/snippet}

<section
	id="anmeldelser"
	aria-labelledby="anmeldelser-heading"
	class="bg-sand-100 px-6 py-24 lg:px-8"
>
	<div class="mx-auto max-w-6xl">
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-sm font-medium tracking-[0.3em] text-sand-600 uppercase">Anmeldelser</p>
			<h2
				class="mt-4 font-serif text-4xl font-semibold text-sand-900 sm:text-5xl"
				id="anmeldelser-heading"
			>
				Hvad kunderne siger
			</h2>
		</div>

		{#if isCarousel}
			<div
				class="mt-16"
				role="region"
				aria-roledescription="karrusel"
				aria-label="Anmeldelser"
				onmouseenter={() => (isPaused = true)}
				onmouseleave={() => (isPaused = false)}
				onfocusin={() => (isPaused = true)}
				onfocusout={() => (isPaused = false)}
			>
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<div
					bind:this={trackEl}
					onscroll={handleScroll}
					onkeydown={handleKeydown}
					tabindex="0"
					role="group"
					aria-label="Brug piletasterne for at bladre i anmeldelser"
					class="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-1 pb-1 focus:outline-none"
				>
					{#each testimonials as testimonial, i (testimonial.name)}
						<div
							class="w-full shrink-0 snap-start sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
							role="group"
							aria-roledescription="slide"
							aria-label="{i + 1} af {testimonials.length}"
						>
							{@render testimonialCard(testimonial)}
						</div>
					{/each}
				</div>

				<div class="mt-8 flex items-center justify-center gap-6">
					<button
						type="button"
						onclick={prev}
						aria-label="Forrige anmeldelse"
						class="flex h-10 w-10 items-center justify-center rounded-full text-sand-600 ring-1 ring-sand-300 transition-colors hover:bg-sand-200/60 hover:text-sand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-600"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							class="h-5 w-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 19.5 8.25 12l7.5-7.5"
							/>
						</svg>
					</button>

					<div class="flex items-center gap-2">
						{#each { length: maxIndex + 1 } as _, i (i)}
							<button
								type="button"
								onclick={() => scrollToIndex(i)}
								aria-label="Gå til anmeldelse {i + 1}"
								aria-current={i === activeIndex}
								class={[
									'h-2.5 rounded-full transition-all',
									i === activeIndex ? 'w-6 bg-sand-700' : 'w-2.5 bg-sand-300 hover:bg-sand-400'
								]}
							></button>
						{/each}
					</div>

					<button
						type="button"
						onclick={next}
						aria-label="Næste anmeldelse"
						class="flex h-10 w-10 items-center justify-center rounded-full text-sand-600 ring-1 ring-sand-300 transition-colors hover:bg-sand-200/60 hover:text-sand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-600"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							class="h-5 w-5"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
						</svg>
					</button>
				</div>
			</div>
		{:else}
			<div class="mt-16 grid gap-8 md:grid-cols-3">
				{#each testimonials as testimonial (testimonial.name)}
					{@render testimonialCard(testimonial)}
				{/each}
			</div>
		{/if}
	</div>
</section>
