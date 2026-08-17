<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import DanceTypes from '$lib/components/DanceTypes.svelte';
	import Prices from '$lib/components/Prices.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<SeoHead seo={data.page.properties} />

<Hero heroTitle={data.page.properties.heroTitle} />
<About />
<DanceTypes />
<Prices />
<Testimonials />
<Contact />
