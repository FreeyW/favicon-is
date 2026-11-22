/**
 * Lightweight, dependency-free extraction of icon declarations from HTML.
 * Works the same in workerd and Node, and only looks at the document head.
 */

export interface IconLink {
	href: string;
	rel: string;
	sizes?: string;
	type?: string;
	media?: string;
	color?: string;
	source: 'link' | 'meta' | 'manifest';
}

export interface ParsedHead {
	baseUrl: string;
	title?: string;
	icons: IconLink[];
	manifest?: string;
}

const ENTITY_MAP: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'", '#x27': "'", '#47': '/', '#x2f': '/' };

export function decodeHtmlEntities(value: string): string {
	return value.replace(/&(#?[a-z0-9]+);/gi, (match, name: string) => {
		const key = name.toLowerCase();
		if (ENTITY_MAP[key]) return ENTITY_MAP[key]!;
		if (key.startsWith('#x')) return String.fromCodePoint(parseInt(key.slice(2), 16) || 0x20);
		if (key.startsWith('#')) return String.fromCodePoint(Number(key.slice(1)) || 0x20);
		return match;
	});
}

export function parseAttributes(tag: string): Record<string, string> {
	const attrs: Record<string, string> = {};
	const re = /([^\s=/<>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
	// Skip the tag name.
	const inner = tag.replace(/^<\s*[a-z0-9-]+/i, '').replace(/\/?>$/, '');
	for (const match of inner.matchAll(re)) {
		const name = match[1]!.toLowerCase();
		if (name in attrs) continue;
		attrs[name] = decodeHtmlEntities(match[2] ?? match[3] ?? match[4] ?? '').trim();
	}
	return attrs;
}

function resolve(href: string, base: string): string | null {
	if (!href) return null;
	if (href.startsWith('data:')) return href;
	try {
		const url = new URL(href, base);
		if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
		url.hash = '';
		return url.toString();
	} catch {
		return null;
	}
}

const ICON_RELS = ['icon', 'shortcut icon', 'apple-touch-icon', 'apple-touch-icon-precomposed', 'mask-icon', 'fluid-icon', 'alternate icon'];

export function parseHead(html: string, pageUrl: string): ParsedHead {
	// Everything we care about lives in <head>; stop at <body> to avoid scanning content.
	const bodyIndex = html.search(/<body[\s>]/i);
	const head = (bodyIndex > 0 ? html.slice(0, bodyIndex) : html).replace(/<!--[\s\S]*?-->/g, '');

	let baseUrl = pageUrl;
	const baseTag = head.match(/<base\b[^>]*>/i);
	if (baseTag) {
		const href = parseAttributes(baseTag[0]).href;
		const resolved = href ? resolve(href, pageUrl) : null;
		if (resolved && !resolved.startsWith('data:')) baseUrl = resolved;
	}

	const titleMatch = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
	const title = titleMatch ? decodeHtmlEntities(titleMatch[1]!.replace(/\s+/g, ' ').trim()).slice(0, 200) : undefined;

	const icons: IconLink[] = [];
	let manifest: string | undefined;
	const seen = new Set<string>();

	for (const [tag] of head.matchAll(/<link\b[^>]*>/gi)) {
		const attrs = parseAttributes(tag);
		const rel = (attrs.rel ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
		if (!rel) continue;
		const href = resolve(attrs.href ?? '', baseUrl);
		if (!href) continue;
		if (rel.split(' ').includes('manifest')) {
			manifest ??= href;
			continue;
		}
		const isIcon = ICON_RELS.includes(rel) || rel.split(' ').includes('icon') || rel.includes('apple-touch-icon');
		if (!isIcon) continue;
		const key = `${rel}|${href}|${attrs.sizes ?? ''}`;
		if (seen.has(key)) continue;
		seen.add(key);
		icons.push({
			href,
			rel,
			sizes: attrs.sizes || undefined,
			type: attrs.type || undefined,
			media: attrs.media || undefined,
			color: attrs.color || undefined,
			source: 'link',
		});
	}

	for (const [tag] of head.matchAll(/<meta\b[^>]*>/gi)) {
		const attrs = parseAttributes(tag);
		const name = (attrs.name ?? attrs.property ?? '').toLowerCase();
		if (name !== 'msapplication-tileimage') continue;
		const href = resolve(attrs.content ?? '', baseUrl);
		if (href) icons.push({ href, rel: 'msapplication-TileImage', source: 'meta' });
	}

	return { baseUrl, title, icons, manifest };
}

/** Largest square size declared in a `sizes` attribute. `any` counts as 512. */
export function largestSize(sizes?: string): number | undefined {
	if (!sizes) return undefined;
	let best: number | undefined;
	for (const token of sizes.toLowerCase().split(/\s+/)) {
		if (token === 'any') return 512;
		const match = token.match(/^(\d+)x(\d+)$/);
		if (match) best = Math.max(best ?? 0, Number(match[1]));
	}
	return best;
}

function guessSize(icon: IconLink): number {
	const declared = largestSize(icon.sizes);
	if (declared) return declared;
	if (icon.type?.includes('svg') || /\.svg(?:$|\?)/i.test(icon.href)) return 512;
	if (icon.rel.includes('apple-touch-icon')) return 180;
	if (icon.rel === 'msapplication-TileImage') return 144;
	if (icon.rel === 'fluid-icon') return 512;
	return 32;
}

/**
 * Orders icon candidates for a requested pixel size: the smallest icon that is
 * at least as large as the target wins, otherwise the largest one available.
 * Safari's monochrome `mask-icon` is only used as a last resort.
 */
export function rankIcons(icons: IconLink[], targetSize: number): string[] {
	const scored = icons
		.filter((icon) => icon.source !== 'manifest' || icon.href)
		.map((icon, order) => {
			const size = guessSize(icon);
			let score = size >= targetSize ? size - targetSize : (targetSize - size) * 4;
			if (icon.rel === 'mask-icon') score += 100_000;
			if (icon.media?.includes('prefers-color-scheme: dark')) score += 50;
			return { href: icon.href, score, order };
		})
		.sort((a, b) => a.score - b.score || a.order - b.order);
	const unique: string[] = [];
	for (const item of scored) if (!unique.includes(item.href)) unique.push(item.href);
	return unique;
}

export interface ManifestIcon {
	src: string;
	sizes?: string;
	type?: string;
	purpose?: string;
}

/** Parses the `icons` array of a Web App Manifest, resolving URLs against the manifest URL. */
export function parseManifestIcons(json: unknown, manifestUrl: string): ManifestIcon[] {
	if (!json || typeof json !== 'object') return [];
	const list = (json as { icons?: unknown }).icons;
	if (!Array.isArray(list)) return [];
	const icons: ManifestIcon[] = [];
	for (const item of list.slice(0, 50)) {
		if (!item || typeof item !== 'object') continue;
		const entry = item as Record<string, unknown>;
		if (typeof entry.src !== 'string') continue;
		const src = resolve(entry.src, manifestUrl);
		if (!src) continue;
		icons.push({
			src,
			sizes: typeof entry.sizes === 'string' ? entry.sizes : undefined,
			type: typeof entry.type === 'string' ? entry.type : undefined,
			purpose: typeof entry.purpose === 'string' ? entry.purpose : undefined,
		});
	}
	return icons;
}
