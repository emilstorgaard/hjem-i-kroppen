<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Hjem i Kroppen – Danse- og Bevægelsesterapi</title>
	<link rel="icon" type="image/x-icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-sand-50 font-sans text-sand-900">
	<a
		href="#main-content"
		class="sr-only rounded-full bg-sand-800 px-5 py-2.5 text-sm font-medium text-sand-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
	>
		Spring til indhold
	</a>
	<Header />
	<main id="main-content" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
