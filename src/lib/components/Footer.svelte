<script lang="ts">
	import { contactInfo } from '$lib/content';

	const year = new Date().getFullYear();

	const links = [
		{ href: '#om-mig', label: 'Om mig' },
		{ href: '#tilbud', label: 'Tilbud' },
		{ href: '#priser', label: 'Priser' },
		{ href: '#anmeldelser', label: 'Anmeldelser' },
		{ href: '#kontakt', label: 'Kontakt' }
	];
</script>

<footer class="border-t border-sand-800 bg-sand-900 px-6 py-12 lg:px-8">
	<div
		class="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left"
	>
		<a
			href="#top"
			class="flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-200"
		>
			<img src="/logo.jpg" alt="Hjem i Kroppen" class="h-10 w-10 rounded-full object-cover" />
			<span class="font-serif text-lg font-semibold text-sand-50">{contactInfo.name}</span>
		</a>

		<nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footermenu">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="rounded-sm text-sm text-sand-400 transition-colors hover:text-sand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-200"
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</div>

	<div class="mx-auto mt-8 max-w-6xl border-t border-sand-800 pt-6 text-center">
		<p class="text-sm text-sand-500">
			&copy; {year}
			{contactInfo.name} &middot; Danse- og bevægelsesterapi
		</p>
	</div>
</footer>
