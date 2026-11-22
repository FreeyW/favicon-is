import type { APIRoute } from 'astro';
import { POPULAR_DOMAINS } from '../data/popular';
import { renderUrlset, xmlResponse } from '../lib/sitemap';

export const GET: APIRoute = () =>
	xmlResponse(renderUrlset(POPULAR_DOMAINS.map((domain) => ({ path: `/site/${domain}/`, changefreq: 'monthly', priority: 0.5 }))));
