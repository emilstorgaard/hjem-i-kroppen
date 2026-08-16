<script lang="ts">
	type Props = {
		metaTitle?: string;
		metaDescription?: string;
		ogImage?: string;
		noindex?: boolean;
	};

	let {
		metaTitle = 'Hjem i Kroppen – Danse- og Bevægelsesterapi',
		metaDescription = 'Hjem i Kroppen – Danse- og bevægelsesterapi. Danserum, Kvinderum og Retreats, der hjælper dig hjem i din egen krop.',
        ogImage = "https://hjemikroppen.dk/logo.jpg",
		noindex = false
	}: Props = $props();

</script>

<svelte:head>
	<title>{metaTitle}</title>
	<meta name="description" content={metaDescription} />
	<link rel="canonical" href="https://hjemikroppen.dk/" />
    {#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<meta property="og:type" content="'website'" />
	<meta property="og:url" content="https://hjemikroppen.dk/" />
	<meta property="og:title" content={metaTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:alt" content="Hjem i Kroppen – logo" />
	<meta property="og:image:width" content="1254" />
	<meta property="og:image:height" content="1254" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={metaTitle} />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content="Hjem i Kroppen – logo" />
</svelte:head>
