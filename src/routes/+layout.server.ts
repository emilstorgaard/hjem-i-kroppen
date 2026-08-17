import { getContentByPath } from '$lib/api/umbraco';
import type { ErrorPage } from '$lib/types/errorPage';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const [errorPage] = await Promise.all([
		getContentByPath('errorPage', fetch)
			.then((d) => d as ErrorPage)
			.catch(() => null)
	]);

	return {
		errorPage
	};
};
