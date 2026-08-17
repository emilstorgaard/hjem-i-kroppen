import type { SeoProperties } from './seo';

export type HomePageProperties = SeoProperties & {
	heroTitle: string;
};

export type HomePage = {
	id: string;
	name: string;
	contentType: string;
	properties: HomePageProperties;
};
