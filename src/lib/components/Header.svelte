<script lang="ts">
	let mobileMenuOpen = $state(false);
	let topBarEl: HTMLDivElement | undefined = $state();

	// Expose the header's height as a CSS var so sections below can clear it exactly (instead of a guessed padding value).
	$effect(() => {
		const el = topBarEl;
		if (!el) return;

		const updateHeight = () => {
			document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
		};
		updateHeight();

		const observer = new ResizeObserver(updateHeight);
		observer.observe(el);
		return () => observer.disconnect();
	});

	const navLinks = [
		{ href: '#om-mig', label: 'Om mig' },
		{ href: '#tilbud', label: 'Tilbud' },
		{ href: '#priser', label: 'Priser' },
		{ href: '#anmeldelser', label: 'Anmeldelser' },
		{ href: '#kontakt', label: 'Kontakt' }
	];

	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<header
	class="fixed inset-x-0 top-0 z-50 border-b border-sand-200/60 bg-sand-50/80 backdrop-blur-md"
>
	<div
		bind:this={topBarEl}
		class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8"
	>
		<a
			href="#top"
			class="flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-600"
		>
			<img
				src="/logo.jpg"
				alt="Hjem i Kroppen"
				class="h-12 w-12 rounded-full object-cover shadow-sm"
			/>
			<span class="font-serif text-xl font-semibold tracking-wide text-sand-900"
				>Hjem i Kroppen</span
			>
		</a>

		<nav class="hidden items-center gap-9 lg:flex" aria-label="Hovedmenu">
			{#each navLinks as link (link.href)}
				<a
					href={link.href}
					class="rounded-sm text-sm font-medium tracking-wide text-sand-700 transition-colors hover:text-sand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-600"
				>
					{link.label}
				</a>
			{/each}
			<a
				href="#kontakt"
				class="rounded-full bg-sand-800 px-5 py-2.5 text-sm font-medium text-sand-50 shadow-sm transition-colors hover:bg-sand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-600"
			>
				Book en tid
			</a>
		</nav>

		<button
			type="button"
			class="flex h-10 w-10 items-center justify-center rounded-full text-sand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-600 lg:hidden"
			aria-label={mobileMenuOpen ? 'Luk menu' : 'Åbn menu'}
			aria-expanded={mobileMenuOpen}
			aria-controls="mobile-menu"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
		>
			{#if mobileMenuOpen}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					class="h-6 w-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					class="h-6 w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
					/>
				</svg>
			{/if}
		</button>
	</div>

	{#if mobileMenuOpen}
		<nav
			id="mobile-menu"
			class="flex flex-col gap-1 border-t border-sand-200/60 bg-sand-50 px-6 py-4 lg:hidden"
			aria-label="Mobilmenu"
		>
			{#each navLinks as link (link.href)}
				<a
					href={link.href}
					onclick={closeMenu}
					class="rounded-lg px-3 py-2.5 text-base font-medium text-sand-800 transition-colors hover:bg-sand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-600"
				>
					{link.label}
				</a>
			{/each}
			<a
				href="#kontakt"
				onclick={closeMenu}
				class="mt-2 rounded-full bg-sand-800 px-5 py-3 text-center text-base font-medium text-sand-50 transition-colors hover:bg-sand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-600"
			>
				Book en tid
			</a>
		</nav>
	{/if}
</header>
