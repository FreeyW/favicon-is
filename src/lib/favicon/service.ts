import { env, waitUntil } from 'cloudflare:workers';
import DEFAULT_ICON_SVG from '../../../public/default-favicon.svg?raw';
import { normalizeDomain } from '../domain';
import { fetchLimited } from './http';
import { parseHead, rankIcons } from './html';
import { extensionFor, sniffImageType } from './sniff';

/** Pixel sizes accepted by the `size` query parameter. */
export const SUPPORTED_SIZES = [16, 32, 48, 64, 128, 256] as const;
export type IconSource = 'cache-edge' | 'cache-r2' | 'google' | 'live' | 'default';
export type DefaultReason = 'invalid-domain' | 'unsupported-tld' | 'not-found' | 'failure-cache';

interface IconData {
	bytes: Uint8Array<ArrayBuffer>;
	contentType: string;
	source: 'google' | 'live';
	origin: string;
}

interface IconOptions {
	mode: 'google' | 'direct';
	/** Requested pixel size (Google mode) or ranking target (direct mode). */
	size: number;
	variant: string;
	download: boolean;
}

const ICON_MAX_AGE = 86_400; // browsers / CDNs: one day, as before
const DEFAULT_MAX_AGE = 3_600;
const INVALID_MAX_AGE = 86_400;
const MAX_ICON_BYTES = 1_048_576;
const MAX_HTML_BYTES = 262_144;

function flag(params: URLSearchParams, name: string): boolean {
	if (!params.has(name)) return false;
	const value = (params.get(name) ?? '').toLowerCase();
	return value === '' || value === '1' || value === 'true' || value === 'yes' || value === 'on';
}

function nearestSize(value: number): number {
	return SUPPORTED_SIZES.reduce((best, size) => (Math.abs(size - value) < Math.abs(best - value) ? size : best), 128);
}

export function parseIconOptions(params: URLSearchParams): IconOptions {
	const larger = flag(params, 'larger');
	const original = flag(params, 'original');
	const rawSize = Number.parseInt(params.get('size') ?? '', 10);
	const explicit = Number.isFinite(rawSize) && rawSize > 0 ? nearestSize(rawSize) : undefined;
	const mode = original ? 'direct' : 'google';
	const size = explicit ?? (larger ? 256 : mode === 'google' ? 128 : 64);
	return { mode, size, variant: `${mode}-${size}`, download: flag(params, 'download') };
}

function numberVar(value: string | undefined, fallback: number): number {
	const parsed = Number(value);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function bucket(): R2Bucket | undefined {
	return (env as Partial<Env>).FAVICONS;
}

function edgeCache(): Cache | undefined {
	try {
		return typeof caches !== 'undefined' ? (caches as unknown as { default: Cache }).default : undefined;
	} catch {
		return undefined;
	}
}

function background(promise: Promise<unknown>): void {
	try {
		waitUntil(promise.catch((error) => console.error('[favicon] background task failed', error)));
	} catch {
		void promise.catch(() => {});
	}
}

async function etagFor(bytes: Uint8Array<ArrayBuffer>): Promise<string> {
	const digest = new Uint8Array(await crypto.subtle.digest('SHA-1', bytes));
	let hex = '';
	for (const byte of digest.subarray(0, 12)) hex += byte.toString(16).padStart(2, '0');
	return `"${hex}"`;
}

function imageHeaders(contentType: string, source: IconSource, maxAge: number, etag?: string): Headers {
	const headers = new Headers({
		'content-type': contentType,
		'cache-control': `public, max-age=${maxAge}, stale-while-revalidate=${maxAge * 7}`,
		'access-control-allow-origin': '*',
		'access-control-expose-headers': 'X-Source, X-Reason, X-Response-Time',
		'timing-allow-origin': '*',
		'x-content-type-options': 'nosniff',
		'x-source': source,
	});
	// Third-party SVGs can contain scripts; never let them run on our origin.
	if (contentType === 'image/svg+xml') {
		headers.set('content-security-policy', "default-src 'none'; style-src 'unsafe-inline'; img-src data:; sandbox");
	}
	if (etag) headers.set('etag', etag);
	return headers;
}

/** Applies per-request concerns (HEAD, 304, download, timing) to a cacheable response. */
function finalize(request: Request, response: Response, started: number, filename?: string): Response {
	const headers = new Headers(response.headers);
	headers.set('x-response-time', `${Date.now() - started}ms`);
	if (filename) headers.set('content-disposition', `attachment; filename="${filename}"`);
	const etag = headers.get('etag');
	const ifNoneMatch = request.headers.get('if-none-match');
	if (etag && ifNoneMatch && ifNoneMatch.split(',').some((tag) => tag.trim().replace(/^W\//, '') === etag)) {
		return new Response(null, { status: 304, headers });
	}
	const body = request.method === 'HEAD' ? null : response.body;
	return new Response(body, { status: response.status, headers });
}

export function defaultIconResponse(reason: DefaultReason, maxAge = DEFAULT_MAX_AGE): Response {
	const headers = imageHeaders('image/svg+xml', 'default', maxAge);
	headers.set('x-reason', reason);
	return new Response(DEFAULT_ICON_SVG, { status: 200, headers });
}

function decodeDataUri(uri: string): Omit<IconData, 'source' | 'origin'> | null {
	const match = uri.match(/^data:([^,]*?),(.*)$/s);
	if (!match) return null;
	const meta = match[1] ?? '';
	const payload = match[2] ?? '';
	if (payload.length > MAX_ICON_BYTES * 1.4) return null;
	let bytes: Uint8Array<ArrayBuffer>;
	try {
		if (meta.endsWith(';base64')) {
			const binary = atob(payload.replace(/\s+/g, ''));
			bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
		} else {
			bytes = new TextEncoder().encode(decodeURIComponent(payload));
		}
	} catch {
		return null;
	}
	const contentType = sniffImageType(bytes, meta);
	return contentType ? { bytes, contentType } : null;
}

async function fetchImage(url: string): Promise<Omit<IconData, 'source' | 'origin'> | null> {
	if (url.startsWith('data:')) return decodeDataUri(url);
	const result = await fetchLimited(url, {
		timeout: 4_000,
		maxBytes: MAX_ICON_BYTES,
		accept: 'image/avif,image/webp,image/png,image/svg+xml,image/x-icon,image/*;q=0.8,*/*;q=0.5',
	});
	if (!result || result.bytes.length < 16) return null;
	const contentType = sniffImageType(result.bytes, result.contentType);
	return contentType ? { bytes: result.bytes, contentType } : null;
}

/** Google's favicon cache: fast and covers most of the web. */
async function fetchFromGoogle(domain: string, size: number): Promise<IconData | null> {
	const url = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domain}&size=${size}`;
	try {
		const response = await fetch(url, {
			headers: { accept: 'image/png,image/*' },
			signal: AbortSignal.timeout(4_000),
			cf: { cacheTtl: ICON_MAX_AGE, cacheEverything: true },
		});
		// Google answers 404 (with a generic globe) when it has no icon for the site.
		if (response.status !== 200) {
			await response.body?.cancel();
			return null;
		}
		const bytes = new Uint8Array(await response.arrayBuffer());
		const contentType = sniffImageType(bytes, response.headers.get('content-type') ?? '');
		if (!contentType || bytes.length < 16) return null;
		return { bytes, contentType, source: 'google', origin: 'gstatic.com/faviconV2' };
	} catch {
		return null;
	}
}

/**
 * Fetches the site's HTML, reads its icon declarations and downloads the best
 * match, falling back to the conventional /favicon.ico locations.
 */
async function fetchFromSite(domain: string, targetSize: number): Promise<IconData | null> {
	const deadline = Date.now() + 9_000;
	let candidates: string[] = [];
	let origin = `https://${domain}`;

	for (const pageUrl of [`https://${domain}/`, `https://www.${domain}/`, `http://${domain}/`]) {
		if (Date.now() > deadline) break;
		const page = await fetchLimited(pageUrl, {
			timeout: 4_000,
			maxBytes: MAX_HTML_BYTES,
			accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5',
			allowTruncated: true,
		});
		if (!page) continue;
		if (page.contentType && !page.contentType.includes('html') && !page.contentType.includes('xml')) continue;
		const head = parseHead(new TextDecoder('utf-8').decode(page.bytes), page.url);
		candidates = rankIcons(head.icons, targetSize);
		origin = new URL(head.baseUrl).origin;
		break;
	}

	const fallbacks = [`${origin}/favicon.ico`, `https://${domain}/favicon.ico`, `https://www.${domain}/favicon.ico`, `${origin}/favicon.png`];
	const queue = [...new Set([...candidates, ...fallbacks])].slice(0, 6);

	for (const href of queue) {
		if (Date.now() > deadline) break;
		const image = await fetchImage(href);
		if (image) return { ...image, source: 'live', origin: href.startsWith('data:') ? 'data-uri' : href };
	}
	return null;
}

async function lookup(domain: string, options: IconOptions): Promise<IconData | null> {
	if (options.mode === 'google') {
		return (await fetchFromGoogle(domain, options.size)) ?? (await fetchFromSite(domain, options.size));
	}
	return fetchFromSite(domain, options.size);
}

async function store(key: string, icon: IconData): Promise<void> {
	const r2 = bucket();
	if (!r2) return;
	await r2.put(key, icon.bytes, {
		httpMetadata: { contentType: icon.contentType, cacheControl: `public, max-age=${ICON_MAX_AGE}` },
		customMetadata: { fetchedAt: String(Date.now()), source: icon.source, origin: icon.origin.slice(0, 512) },
	});
}

async function refresh(key: string, domain: string, options: IconOptions, previous: IconData): Promise<void> {
	const fresh = await lookup(domain, options);
	// Keep serving the old icon if the site is temporarily unreachable.
	await store(key, fresh ?? previous);
}

/**
 * Serves `https://favicon.is/{domain}`.
 *
 * Lookup order: edge cache → R2 → (failure marker) → Google favicon cache →
 * the site itself. Domains whose TLD isn't in the IANA Root Zone Database are
 * answered with the default icon without any network request.
 */
export async function serveFavicon(request: Request, target: string, params: URLSearchParams): Promise<Response> {
	const started = Date.now();
	const normalized = normalizeDomain(target);
	if (!normalized.ok) {
		const reason = normalized.reason === 'unsupported-tld' ? 'unsupported-tld' : 'invalid-domain';
		return finalize(request, defaultIconResponse(reason, INVALID_MAX_AGE), started);
	}

	const { domain } = normalized;
	const options = parseIconOptions(params);
	const key = `icons/${domain}/${options.variant}`;
	const filenameFor = (type: string) => (options.download ? `${domain}-${options.size}.${extensionFor(type)}` : undefined);
	const cache = edgeCache();
	const cacheKey = new Request(`https://favicon.is/__icons/${encodeURIComponent(domain)}/${options.variant}`);

	// 1. Edge cache (per data centre).
	const cached = await cache?.match(cacheKey).catch(() => undefined);
	if (cached) {
		const headers = new Headers(cached.headers);
		if (headers.get('x-source') !== 'default') headers.set('x-source', 'cache-edge');
		return finalize(request, new Response(cached.body, { status: 200, headers }), started, filenameFor(headers.get('content-type') ?? ''));
	}

	const r2 = bucket();
	const ttl = numberVar(env.ICON_TTL, 604_800) * 1000;
	const failureTtl = numberVar(env.FAILURE_TTL, 3_600) * 1000;

	// 2. Persistent storage in R2.
	const object = await r2?.get(key).catch((error) => {
		console.error('[favicon] R2 get failed', error);
		return null;
	});
	if (object) {
		const bytes = new Uint8Array(await object.arrayBuffer());
		const contentType = object.httpMetadata?.contentType ?? sniffImageType(bytes) ?? 'image/png';
		const fetchedAt = Number(object.customMetadata?.fetchedAt ?? 0);
		if (Date.now() - fetchedAt > ttl) {
			const source = object.customMetadata?.source === 'google' ? 'google' : 'live';
			background(refresh(key, domain, options, { bytes, contentType, source, origin: object.customMetadata?.origin ?? '' }));
		}
		const response = new Response(bytes, { headers: imageHeaders(contentType, 'cache-r2', ICON_MAX_AGE, object.httpEtag) });
		if (cache) background(cache.put(cacheKey, response.clone()));
		return finalize(request, response, started, filenameFor(contentType));
	}

	// 3. Recently failed lookups get the default icon straight away.
	const failure = await r2?.head(`failures/${domain}`).catch(() => null);
	if (failure && Date.now() - Number(failure.customMetadata?.failedAt ?? 0) < failureTtl) {
		return finalize(request, defaultIconResponse('failure-cache'), started);
	}

	// 4. Fetch from Google, then from the site itself.
	const icon = await lookup(domain, options);
	if (!icon) {
		if (r2) background(r2.put(`failures/${domain}`, '', { customMetadata: { failedAt: String(Date.now()) } }));
		const response = defaultIconResponse('not-found');
		if (cache) background(cache.put(cacheKey, response.clone()));
		return finalize(request, response, started);
	}

	background(store(key, icon));
	if (failure && r2) background(r2.delete(`failures/${domain}`));
	const response = new Response(icon.bytes, {
		headers: imageHeaders(icon.contentType, icon.source, ICON_MAX_AGE, await etagFor(icon.bytes)),
	});
	if (cache) background(cache.put(cacheKey, response.clone()));
	return finalize(request, response, started, filenameFor(icon.contentType));
}
