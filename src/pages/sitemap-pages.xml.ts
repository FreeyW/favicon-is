import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderUrlset, xmlResponse, type SitemapPage } from '../lib/sitemap';
import { TLD_DATA } from '../lib/tlds';

const today = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
	const guides = (await getCollection('guides')).filter((entry) => entry.id.startsWith('en/'));
	const pages: SitemapPage[] = [
		{ path: '/', changefreq: 'weekly', priority: 1, lastmod: today },
		{ path: '/docs/', changefreq: 'monthly', priority: 0.9, lastmod: today },
		{ path: '/examples/', changefreq: 'monthly', priority: 0.8, lastmod: today },
		{ path: '/checker/', changefreq: 'monthly', priority: 0.8, lastmod: today },
		{ path: '/popular/', changefreq: 'weekly', priority: 0.8, lastmod: today },
		{ path: '/tlds/', changefreq: 'weekly', priority: 0.6, lastmod: TLD_DATA.generatedAt },
		{ path: '/guides/', changefreq: 'monthly', priority: 0.7, lastmod: today },
		...guides
			.sort((a, b) => a.data.order - b.data.order)
			.map((entry) => ({
				path: `/guides/${entry.id.slice(3)}/`,
				changefreq: 'monthly' as const,
				priority: 0.7,
				lastmod: entry.data.updated.toISOString().slice(0, 10),
			})),
		{ path: '/faq/', changefreq: 'monthly', priority: 0.6, lastmod: today },
		{ path: '/about/', changefreq: 'yearly', priority: 0.4 },
		{ path: '/privacy/', changefreq: 'yearly', priority: 0.2 },
		{ path: '/terms/', changefreq: 'yearly', priority: 0.2 },
	];
	return xmlResponse(renderUrlset(pages));
};
