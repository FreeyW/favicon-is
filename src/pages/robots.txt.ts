import type { APIRoute } from 'astro';
import { SITE_URL } from '../site.config';

export const GET: APIRoute = () =>
	new Response(
		`User-agent: *
Allow: /
Disallow: /api/
Disallow: /*?*download=

Sitemap: ${SITE_URL}/sitemap.xml
`,
		{ headers: { 'content-type': 'text/plain; charset=utf-8' } },
	);
