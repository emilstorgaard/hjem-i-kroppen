<script lang="ts">
	import '$lib/styles/app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<div class="flex min-h-screen flex-col bg-sand-50 font-sans text-sand-900">
	<a
		href="#main-content"
		class="sr-only rounded-full bg-sand-800 px-5 py-2.5 text-sm font-medium text-sand-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z"
	>
		Spring til indhold
	</a>
	<Header settings={data.settings} />
	<main id="main-content" class="flex-1">
		{@render children()}
	</main>
	<Footer settings={data.settings} />
</div>
