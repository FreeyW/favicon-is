import { getTld, type TldEntry } from './tlds';
import { toUnicode } from './punycode';
import { extractHost } from './host';

export { extractHost };

export type DomainFailureReason = 'empty' | 'invalid-domain' | 'unsupported-tld';

export type DomainResult =
	| { ok: true; domain: string; display: string; tld: TldEntry }
	| { ok: false; reason: DomainFailureReason; host: string; tld?: string };

const HOSTNAME_RE = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

/**
 * Normalises user input to an ASCII hostname and checks that it ends in a TLD
 * that is delegated in the IANA Root Zone Database. Anything else is rejected
 * before any network request is made.
 */
export function normalizeDomain(input: string): DomainResult {
	const host = extractHost(input);
	if (!host) return { ok: false, reason: 'empty', host };

	let ascii: string;
	try {
		ascii = new URL(`http://${host}`).hostname;
	} catch {
		return { ok: false, reason: 'invalid-domain', host };
	}
	ascii = ascii.replace(/\.+$/, '').replace(/^www\./, '');

	if (ascii.length > 253 || !HOSTNAME_RE.test(ascii)) {
		return { ok: false, reason: 'invalid-domain', host };
	}

	const tldLabel = ascii.slice(ascii.lastIndexOf('.') + 1);
	const tld = getTld(tldLabel);
	if (!tld) return { ok: false, reason: 'unsupported-tld', host, tld: tldLabel };

	return { ok: true, domain: ascii, display: toUnicode(ascii), tld };
}

/** True for hosts written as IPv4 / IPv6 literals. */
export function isIpLiteral(hostname: string): boolean {
	return /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname) || hostname.startsWith('[') || hostname.includes(':');
}
