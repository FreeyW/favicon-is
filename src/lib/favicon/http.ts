import { isIanaTld } from '../tlds';
import { isIpLiteral } from '../domain';

export const USER_AGENT =
	'Mozilla/5.0 (compatible; FaviconIsBot/2.0; +https://favicon.is/about/) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';

export interface FetchedBody {
	url: string;
	status: number;
	contentType: string;
	bytes: Uint8Array<ArrayBuffer>;
}

/**
 * Reads at most `maxBytes` from a response body, cancelling the rest.
 * Returns `null` when the body is larger and `allowTruncated` is false.
 */
export async function readLimited(response: Response, maxBytes: number, allowTruncated = false): Promise<Uint8Array<ArrayBuffer> | null> {
	if (!response.body) return new Uint8Array();
	const declared = Number(response.headers.get('content-length') ?? '0');
	if (!allowTruncated && declared > maxBytes) {
		await response.body.cancel();
		return null;
	}
	const reader = response.body.getReader();
	const chunks: Uint8Array[] = [];
	let total = 0;
	let truncated = false;
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		chunks.push(value);
		total += value.byteLength;
		if (total > maxBytes) {
			truncated = true;
			await reader.cancel();
			break;
		}
	}
	const out = new Uint8Array(Math.min(total, maxBytes));
	let offset = 0;
	for (const chunk of chunks) {
		const room = out.length - offset;
		if (room <= 0) break;
		out.set(chunk.subarray(0, room), offset);
		offset += Math.min(chunk.byteLength, room);
	}
	if (truncated && !allowTruncated) return null;
	return out;
}

/**
 * Only fetch public http(s) URLs whose host ends in an IANA TLD.
 * Rejects IP literals, credentials and non-standard ports.
 */
export function isFetchableUrl(raw: string): boolean {
	let url: URL;
	try {
		url = new URL(raw);
	} catch {
		return false;
	}
	if (url.protocol !== 'https:' && url.protocol !== 'http:') return false;
	if (url.username || url.password) return false;
	if (url.port && url.port !== '80' && url.port !== '443') return false;
	const host = url.hostname.replace(/\.$/, '');
	if (isIpLiteral(host)) return false;
	const tld = host.slice(host.lastIndexOf('.') + 1);
	return host.includes('.') && isIanaTld(tld);
}

/** GET with a timeout and a body size cap. Returns `null` on network errors or non-2xx. */
export async function fetchLimited(
	url: string,
	{ timeout, maxBytes, accept, allowTruncated = false }: { timeout: number; maxBytes: number; accept: string; allowTruncated?: boolean },
): Promise<FetchedBody | null> {
	if (!isFetchableUrl(url)) return null;
	try {
		const response = await fetch(url, {
			headers: { 'user-agent': USER_AGENT, accept, 'accept-language': 'en-US,en;q=0.8' },
			redirect: 'follow',
			signal: AbortSignal.timeout(timeout),
		});
		if (!response.ok) {
			await response.body?.cancel();
			return null;
		}
		// A redirect may have taken us somewhere we wouldn't fetch directly.
		if (response.url && !isFetchableUrl(response.url)) {
			await response.body?.cancel();
			return null;
		}
		const bytes = await readLimited(response, maxBytes, allowTruncated);
		if (!bytes) return null;
		return {
			url: response.url || url,
			status: response.status,
			contentType: (response.headers.get('content-type') ?? '').toLowerCase(),
			bytes,
		};
	} catch {
		return null;
	}
}
