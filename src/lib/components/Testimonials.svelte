<script lang="ts">
	import { testimonials } from '$lib/content';
</script>

{#snippet stars(rating: number)}
	<div class="flex gap-1 text-sand-500">
		{#each { length: 5 } as _, i (i)}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill={i < rating ? 'currentColor' : 'none'}
				stroke="currentColor"
				stroke-width="1"
				class="h-5 w-5"
			>
				<path
					d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77-4.19-4.08 5.79-.84L10 1.5z"
				/>
			</svg>
		{/each}
	</div>
{/snippet}

<section id="anmeldelser" class="bg-sand-100 px-6 py-24 lg:px-8">
	<div class="mx-auto max-w-6xl">
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-sm font-medium tracking-[0.3em] text-sand-600 uppercase">Anmeldelser</p>
			<h2 class="mt-4 font-serif text-4xl font-semibold text-sand-900 sm:text-5xl">
				Hvad kunderne siger
			</h2>
		</div>

		<div class="mt-16 grid gap-8 md:grid-cols-3">
			{#each testimonials as testimonial (testimonial.name)}
				<figure class="flex flex-col rounded-3xl bg-sand-50 p-8 shadow-sm ring-1 ring-sand-200">
					{@render stars(testimonial.rating)}
					<blockquote class="mt-5 flex-1 text-lg leading-relaxed text-sand-800 italic">
						&laquo;{testimonial.quote}&raquo;
					</blockquote>
					<figcaption class="mt-6 text-sm font-medium tracking-wide text-sand-600 uppercase">
						{testimonial.name}
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>
