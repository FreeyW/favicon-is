/**
 * Pulls the host out of whatever a user typed: a bare domain, a full URL,
 * a protocol-relative URL, a URL with credentials, ports or paths.
 * The result is lower-cased with any leading `www.` and trailing dots removed.
 * Dependency-free so it can run in the browser too.
 */
export function extractHost(input: string): string {
	let value = input.trim();
	try {
		value = decodeURIComponent(value);
	} catch {
		// keep the raw value when it is not valid percent-encoding
	}
	value = value
		.toLowerCase()
		.replace(/^[a-z][a-z0-9+.-]*:\/*/, '') // scheme (http://, https:/, ftp://)
		.replace(/^\/+/, '');
	value = value.split(/[/?#\\\s]/)[0] ?? '';
	value = value.replace(/^[^@]*@/, ''); // user:pass@
	value = value.replace(/:\d*$/, ''); // :port
	value = value.replace(/\.+$/, '');
	value = value.replace(/^www\./, '');
	return value;
}
