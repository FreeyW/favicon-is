import { env, waitUntil } from 'cloudflare:workers';
import { normalizeDomain } from '../domain';
import { fetchLimited } from './http';
import { largestSize, parseHead, parseManifestIcons, type ManifestIcon } from './html';
import { imageDimensions } from './image-size';
import { sniffImageType } from './sniff';

export interface InspectedIcon {
	href: string;
	rel: string;
	sizes?: string;
	type?: string;
	media?: string;
	source: 'link' | 'meta' | 'manifest' | 'root';
	/** Result of downloading the icon (only for the first few). */
	ok?: boolean;
	contentType?: string;
	bytes?: number;
	width?: number;
	height?: number;
}

export interface InspectResult {
	domain: string;
	display: string;
	url: string | null;
	title?: string;
	reachable: boolean;
	icons: InspectedIcon[];
	manifest: { href: string; ok: boolean; icons: ManifestIcon[] } | null;
	checks: { ico: boolean; svg: boolean; appleTouch: boolean; manifest: boolean; large: boolean };
	inspectedAt: string;
}

const MAX_CHECKED_ICONS = 12;

async function probe(icon: InspectedIcon): Promise<InspectedIcon> {
	if (icon.href.startsWith('data:')) {
		return { ...icon, ok: true, contentType: icon.href.slice(5, icon.href.search(/[;,]/)) || undefined };
	}
	const result = await fetchLimited(icon.href, { timeout: 3_500, maxBytes: 1_048_576, accept: 'image/*,*/*;q=0.5' });
	if (!result) return { ...icon, ok: false };
	const contentType = sniffImageType(result.bytes, result.contentType);
	if (!contentType) return { ...icon, ok: false, contentType: result.contentType || undefined, bytes: result.bytes.length };
	const dimensions = imageDimensions(result.bytes, contentType);
	return { ...icon, ok: true, contentType, bytes: result.bytes.length, ...(dimensions ?? {}) };
}

export async function inspectDomain(domain: string, display: string): Promise<InspectResult> {
	let url: string | null = null;
	let title: string | undefined;
	let icons: InspectedIcon[] = [];
	let manifestHref: string | undefined;
	let origin = `https://${domain}`;

	for (const pageUrl of [`https://${domain}/`, `https://www.${domain}/`, `http://${domain}/`]) {
		const page = await fetchLimited(pageUrl, {
			timeout: 5_000,
			maxBytes: 262_144,
			accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5',
			allowTruncated: true,
		});
		if (!page) continue;
		const head = parseHead(new TextDecoder('utf-8').decode(page.bytes), page.url);
		url = page.url;
		title = head.title;
		origin = new URL(head.baseUrl).origin;
		icons = head.icons.map((icon) => ({ ...icon }));
		manifestHref = head.manifest;
		break;
	}

	const rootIco = `${origin}/favicon.ico`;
	if (!icons.some((icon) => icon.href === rootIco)) {
		icons.push({ href: rootIco, rel: 'favicon.ico', source: 'root' });
	}

	let manifest: InspectResult['manifest'] = null;
	if (manifestHref) {
		const response = await fetchLimited(manifestHref, { timeout: 3_500, maxBytes: 131_072, accept: 'application/manifest+json,application/json,*/*;q=0.5' });
		let manifestIcons: ManifestIcon[] = [];
		if (response) {
			try {
				manifestIcons = parseManifestIcons(JSON.parse(new TextDecoder().decode(response.bytes)), response.url);
			} catch {
				manifestIcons = [];
			}
		}
		manifest = { href: manifestHref, ok: Boolean(response), icons: manifestIcons };
		for (const icon of manifestIcons) {
			icons.push({ href: icon.src, rel: icon.purpose ? `manifest (${icon.purpose})` : 'manifest', sizes: icon.sizes, type: icon.type, source: 'manifest' });
		}
	}

	// Always probe /favicon.ico, plus the first declared icons.
	const checked = await Promise.all(icons.map((icon, index) => (index < MAX_CHECKED_ICONS || icon.source === 'root' ? probe(icon) : icon)));
	icons = checked;

	const declared = icons.filter((icon) => icon.source !== 'root');
	const isSvg = (icon: InspectedIcon) => Boolean(icon.type?.includes('svg') || icon.contentType?.includes('svg') || /\.svg(?:$|\?)/i.test(icon.href));
	const checks = {
		ico: icons.some((icon) => icon.href.endsWith('/favicon.ico') && icon.ok),
		svg: declared.some((icon) => isSvg(icon) && icon.rel !== 'mask-icon'),
		appleTouch: declared.some((icon) => icon.rel.includes('apple-touch-icon')),
		manifest: Boolean(manifest?.icons.length),
		large: icons.some((icon) => icon.ok !== false && ((icon.width ?? 0) >= 192 || (largestSize(icon.sizes) ?? 0) >= 192)),
	};

	return { domain, display, url, title, reachable: url !== null, icons, manifest, checks, inspectedAt: new Date().toISOString() };
}

function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'access-control-allow-origin': '*',
			'x-content-type-options': 'nosniff',
			'cache-control': status === 200 ? 'public, max-age=600' : 'no-store',
			...extra,
		},
	});
}

/** `GET /api/inspect?domain=example.com` — JSON report used by the favicon checker. */
export async function handleInspectRequest(request: Request, url: URL): Promise<Response> {
	if (request.method !== 'GET' && request.method !== 'HEAD') return json({ error: 'method-not-allowed' }, 405, { allow: 'GET, HEAD' });
	const input = url.searchParams.get('domain') ?? url.searchParams.get('url') ?? '';
	const normalized = normalizeDomain(input);
	if (!normalized.ok) {
		return json({ error: normalized.reason, host: normalized.host, tld: normalized.tld ?? null }, 400);
	}

	const cache = typeof caches !== 'undefined' ? (caches as unknown as { default: Cache }).default : undefined;
	const cacheKey = new Request(`https://favicon.is/__inspect/${encodeURIComponent(normalized.domain)}`);
	const cached = await cache?.match(cacheKey).catch(() => undefined);
	if (cached) return cached;

	const limiter = (env as Partial<Env>).INSPECT_LIMITER;
	if (limiter) {
		const ip = request.headers.get('cf-connecting-ip') ?? 'anonymous';
		const { success } = await limiter.limit({ key: ip }).catch(() => ({ success: true }));
		if (!success) return json({ error: 'rate-limited' }, 429, { 'retry-after': '60' });
	}

	const result = await inspectDomain(normalized.domain, normalized.display);
	const response = json(result);
	if (cache) {
		try {
			waitUntil(cache.put(cacheKey, response.clone()));
		} catch {
			// waitUntil is unavailable outside a request context
		}
	}
	return response;
}
