<script lang="ts">
	import { SITE_URL } from '$lib/site';

	type Props = {
		title?: string;
		description?: string;
		path?: string;
		image?: string;
		imageAlt?: string;
		imageWidth?: number;
		imageHeight?: number;
		type?: string;
	};

	let {
		title = 'Hjem i Kroppen – Danse- og Bevægelsesterapi',
		description = 'Hjem i Kroppen – Danse- og bevægelsesterapi. Danserum, Kvinderum og Retreats, der hjælper dig hjem i din egen krop.',
		path = '/',
		image = '/logo.jpg',
		imageAlt = 'Hjem i Kroppen – logo',
		imageWidth = 1254,
		imageHeight = 1254,
		type = 'website'
	}: Props = $props();

	const canonical = $derived(`${SITE_URL}${path}`);
	const imageUrl = $derived(`${SITE_URL}${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="og:image:width" content={String(imageWidth)} />
	<meta property="og:image:height" content={String(imageHeight)} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content={imageAlt} />
</svelte:head>
