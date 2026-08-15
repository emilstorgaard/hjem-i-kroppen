<script lang="ts">
	import '$lib/styles/app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { contactInfo } from '$lib/content';

	let { children } = $props();

	const siteUrl = 'https://hjemikroppen.dk';

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
		name: contactInfo.name,
		url: `${siteUrl}/`,
		image: `${siteUrl}/logo.jpg`,
		telephone: contactInfo.phone,
		email: contactInfo.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: contactInfo.address
		},
		sameAs: [contactInfo.instagram, contactInfo.facebook]
	};

	const structuredDataJson = JSON.stringify(structuredData).replace(/</g, '\\u003c');
</script>

<svelte:head>
	<title>Hjem i Kroppen – Danse- og Bevægelsesterapi</title>
	{@html `<script type="application/ld+json">${structuredDataJson}</scr` + `ipt>`}
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
