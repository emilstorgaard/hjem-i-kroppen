<script lang="ts">
	import { page } from '$app/state';
	import SeoHead from '$lib/components/SeoHead.svelte';

	const status = $derived(page.status);
	const isNotFound = $derived(status === 404);
	const heading = $derived(isNotFound ? 'Siden blev ikke fundet' : 'Der opstod en fejl');
	const message = $derived(
		isNotFound
			? 'Siden du leder efter findes desværre ikke, eller er blevet flyttet.'
			: (page.error?.message ?? 'Prøv at genindlæse siden, eller gå tilbage til forsiden.')
	);
</script>

<SeoHead title={`${heading} – Hjem i Kroppen`} description={message} noindex={true} />

<section
	class="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-sand-100 px-6 py-24 text-center lg:px-8"
	style="padding-top: var(--header-h, 4.5rem)"
>
	<div
		class="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sand-300/50 blur-3xl"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute top-1/3 -right-32 h-112 w-md rounded-full bg-sand-400/30 blur-3xl"
		aria-hidden="true"
	></div>

	<div class="relative flex w-full max-w-xl flex-col items-center">
		<img
			src="/logo.jpg"
			alt="Hjem i Kroppen logo"
			class="mb-4 h-16 w-16 rounded-full object-cover shadow-lg ring-4 ring-sand-50 sm:h-32 sm:w-32"
		/>

		<p class="font-serif text-6xl font-semibold text-sand-800 sm:text-7xl">{status}</p>

		<h1 class="mt-4 font-serif text-2xl font-semibold text-sand-900 sm:text-3xl">
			{heading}
		</h1>

		<p class="mt-4 text-base leading-relaxed text-sand-700 sm:text-lg">
			{message}
		</p>

		<a
			href="/"
			class="mt-8 rounded-full bg-sand-800 px-8 py-3 text-base font-medium text-sand-50 shadow-md transition-colors hover:bg-sand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-600"
		>
			Tilbage til forsiden
		</a>
	</div>
</section>
