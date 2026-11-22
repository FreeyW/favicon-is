/** Site-wide constants. Change these in one place. */
export const SITE_URL = 'https://favicon.is';
export const SITE_NAME = 'Favicon.is';
/** Shown on the About, Privacy and Terms pages. */
export const CONTACT_EMAIL = 'contact@favicon.is';
/** Cookie-less analytics (Plausible-compatible) — set to '' to disable. */
export const ANALYTICS_SRC = 'https://stat.re/js/script.js';
export const ANALYTICS_DOMAIN = 'favicon.is';
/** Google AdSense publisher ID (matches public/ads.txt) — set to '' to disable. */
export const ADSENSE_CLIENT = 'ca-pub-2109266495918105';

/** Sister products listed in the footer. `key` maps to `footer.products` in the dictionaries. */
export const PRODUCTS = [
	{ key: 'ip', name: 'IP.im', url: 'https://ip.im', icon: 'ip.im' },
	{ key: 'tim', name: 'T.im', url: 'https://t.im', icon: 't.im' },
	{ key: 'mrEmail', name: 'MR.email', url: 'https://mr.email', icon: 'mr.email' },
	{ key: 'wis', name: 'W.is', url: 'https://w.is', icon: 'w.is' },
	{ key: 'dns', name: 'DNS.is', url: 'https://dns.is', icon: 'dns.is' },
	{ key: 'pdf', name: 'PDF.is', url: 'https://pdf.is', icon: 'pdf.is' },
	{ key: 'text', name: 'Text.is', url: 'https://text.is', icon: 'text.is' },
	{ key: 'playgame', name: 'Playgame.now', url: 'https://playgame.now', icon: 'playgame.now' },
	{ key: 'zocm', name: 'Zo.cm', url: 'https://zo.cm', icon: 'zo.cm' },
	{ key: 'base64', name: 'Base64.is', url: 'https://base64.is', icon: 'base64.is' },
	{ key: 'trueurl', name: 'Trueurl.com', url: 'https://trueurl.com', icon: 'trueurl.com' },
	{ key: 'portcheck', name: 'Portcheck.ing', url: 'https://portcheck.ing', icon: 'portcheck.ing' },
	{ key: 'tldhub', name: 'TLDhub.com', url: 'https://tldhub.com', icon: 'tldhub.com' },
] as const;
