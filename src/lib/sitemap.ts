import { LOCALES, LOCALE_CODES, absoluteUrl, localizePath } from '../i18n';

export interface SitemapPage {
	/** Unlocalised path, e.g. `/docs/`. */
	path: string;
	lastmod?: string;
	changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
	priority?: number;
}

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** A urlset where every page is listed once per locale with xhtml:link alternates. */
export function renderUrlset(pages: SitemapPage[]): string {
	const urls: string[] = [];
	for (const page of pages) {
		const alternates = LOCALE_CODES.map(
			(code) => `    <xhtml:link rel="alternate" hreflang="${LOCALES[code].hreflang}" href="${escape(absoluteUrl(localizePath(code, page.path)))}"/>`,
		);
		alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(absoluteUrl(page.path))}"/>`);
		for (const code of LOCALE_CODES) {
			urls.push(
				[
					'  <url>',
					`    <loc>${escape(absoluteUrl(localizePath(code, page.path)))}</loc>`,
					...(page.lastmod ? [`    <lastmod>${page.lastmod}</lastmod>`] : []),
					...(page.changefreq ? [`    <changefreq>${page.changefreq}</changefreq>`] : []),
					...(page.priority !== undefined ? [`    <priority>${page.priority.toFixed(1)}</priority>`] : []),
					...alternates,
					'  </url>',
				].join('\n'),
			);
		}
	}
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

export function xmlResponse(body: string): Response {
	return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}
