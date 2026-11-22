/**
 * Worker request pipeline (Astro `fetchFile`).
 *
 * The favicon API (`/{domain}`) and the JSON inspect API are answered here,
 * before Astro's router, so the hot path never renders a page. Everything else
 * — the multilingual site — goes through Astro.
 */
import { waitUntil } from 'cloudflare:workers';
import { FetchState, astro } from 'astro/fetch';
import { isIanaTld } from './lib/tlds';
import { serveFavicon } from './lib/favicon/service';
import { handleInspectRequest } from './lib/favicon/inspect';

const FILE_EXTENSION = /\.(?:txt|xml|svg|png|ico|jpe?g|gif|webp|avif|webmanifest|json|js|mjs|css|map|html?|woff2?|ttf|otf|pdf|md|gz|br)$/i;

/**
 * Returns the raw favicon target for paths like `/google.com`,
 * `/www.example.co.uk/` or `/https://example.com/page`, or `null` when the
 * request belongs to the website.
 */
export function faviconTarget(pathname: string): string | null {
	let path = pathname.slice(1);
	try {
		path = decodeURIComponent(path);
	} catch {
		// keep raw
	}
	if (!path || path.startsWith('.') || path.startsWith('_')) return null;
	const first = path.split('/')[0] ?? '';
	if (/^https?:$/i.test(first)) return path;
	if (!first.includes('.')) return null;
	// Files such as /robots.txt or /sitemap.xml belong to the site unless the
	// "extension" is itself a TLD (.map, .zip, .mov, .md ...).
	const last = first.slice(first.lastIndexOf('.') + 1).toLowerCase();
	if (FILE_EXTENSION.test(first) && !isIanaTld(last)) return null;
	return path;
}

/** On-demand favicon pages: /site/{domain}/ and /{locale}/site/{domain}/ */
const SITE_PAGE = /^\/(?:[a-z]{2}(?:-[a-z]{4})?\/)?site\/[^/]+\/$/;

/** Worker responses bypass the CDN cache, so cache rendered domain pages explicitly. */
async function cachedPage(request: Request): Promise<Response> {
	const cache = (caches as unknown as { default: Cache }).default;
	const key = new Request(request.url, { method: 'GET' });
	const hit = await cache.match(key).catch(() => undefined);
	if (hit) return hit;
	const response = await astro(new FetchState(request));
	if (response.status === 200 && response.headers.get('cache-control')?.includes('public')) {
		try {
			waitUntil(cache.put(key, response.clone()));
		} catch {
			// outside a request context
		}
	}
	return response;
}

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === '/api/inspect') {
			return handleInspectRequest(request, url);
		}

		if (request.method === 'GET' || request.method === 'HEAD') {
			const target = faviconTarget(url.pathname);
			if (target !== null) return serveFavicon(request, target, url.searchParams);
		}

		if (request.method === 'GET' && !url.search && SITE_PAGE.test(url.pathname) && typeof caches !== 'undefined') {
			return cachedPage(request);
		}

		return astro(new FetchState(request));
	},
};
