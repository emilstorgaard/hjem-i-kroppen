<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Hjem i Kroppen – Danse- og Bevægelsesterapi</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-sand-50 font-sans text-sand-900">
	<main class="flex-1">
		{@render children()}
	</main>
</div>
