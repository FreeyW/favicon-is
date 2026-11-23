/**
 * Curated list of well-known websites. Each gets an indexable favicon page
 * (/site/{domain}/) in every language and appears on /popular/.
 */
export const POPULAR_CATEGORIES = {
	search: ['google.com', 'bing.com', 'duckduckgo.com', 'baidu.com', 'yandex.ru', 'chatgpt.com', 'claude.ai', 'perplexity.ai', 'deepseek.com', 'naver.com'],
	social: ['facebook.com', 'instagram.com', 'x.com', 'linkedin.com', 'reddit.com', 'pinterest.com', 'tiktok.com', 'threads.com', 'weibo.com', 'bsky.app', 'vk.com', 'quora.com'],
	video: ['youtube.com', 'netflix.com', 'twitch.tv', 'vimeo.com', 'disneyplus.com', 'bilibili.com', 'primevideo.com', 'hulu.com', 'max.com', 'crunchyroll.com'],
	music: ['spotify.com', 'soundcloud.com', 'deezer.com', 'bandcamp.com', 'tidal.com', 'last.fm'],
	shopping: ['amazon.com', 'ebay.com', 'aliexpress.com', 'taobao.com', 'walmart.com', 'etsy.com', 'shopify.com', 'temu.com', 'jd.com', 'rakuten.co.jp', 'mercadolibre.com', 'ikea.com'],
	developer: ['github.com', 'gitlab.com', 'stackoverflow.com', 'npmjs.com', 'vercel.com', 'cloudflare.com', 'mozilla.org', 'docker.com', 'python.org', 'nodejs.org', 'figma.com', 'codepen.io'],
	productivity: ['notion.so', 'slack.com', 'zoom.us', 'trello.com', 'dropbox.com', 'canva.com', 'office.com', 'atlassian.com', 'airtable.com', 'asana.com', 'miro.com', 'linear.app'],
	communication: ['whatsapp.com', 'telegram.org', 'discord.com', 'outlook.com', 'signal.org', 'messenger.com', 'line.me', 'wechat.com', 'proton.me'],
	news: ['wikipedia.org', 'nytimes.com', 'bbc.com', 'cnn.com', 'theguardian.com', 'reuters.com', 'medium.com', 'bloomberg.com', 'forbes.com', 'theverge.com'],
	finance: ['paypal.com', 'stripe.com', 'wise.com', 'coinbase.com', 'binance.com', 'visa.com', 'mastercard.com', 'revolut.com', 'robinhood.com', 'alipay.com'],
	travel: ['booking.com', 'airbnb.com', 'expedia.com', 'tripadvisor.com', 'uber.com', 'trip.com', 'skyscanner.net', 'agoda.com'],
	tech: ['apple.com', 'microsoft.com', 'samsung.com', 'adobe.com', 'nvidia.com', 'intel.com', 'ibm.com', 'oracle.com', 'sony.com', 'huawei.com'],
} as const;

export type PopularCategory = keyof typeof POPULAR_CATEGORIES;

/** Display names for domains whose brand differs from the obvious capitalisation. */
const NAMES: Record<string, string> = {
	'chatgpt.com': 'ChatGPT',
	'claude.ai': 'Claude',
	'x.com': 'X (Twitter)',
	'linkedin.com': 'LinkedIn',
	'tiktok.com': 'TikTok',
	'youtube.com': 'YouTube',
	'duckduckgo.com': 'DuckDuckGo',
	'bsky.app': 'Bluesky',
	'vk.com': 'VK',
	'disneyplus.com': 'Disney+',
	'primevideo.com': 'Prime Video',
	'max.com': 'Max',
	'soundcloud.com': 'SoundCloud',
	'last.fm': 'Last.fm',
	'ebay.com': 'eBay',
	'aliexpress.com': 'AliExpress',
	'jd.com': 'JD.com',
	'rakuten.co.jp': 'Rakuten',
	'mercadolibre.com': 'Mercado Libre',
	'ikea.com': 'IKEA',
	'github.com': 'GitHub',
	'gitlab.com': 'GitLab',
	'stackoverflow.com': 'Stack Overflow',
	'npmjs.com': 'npm',
	'nodejs.org': 'Node.js',
	'codepen.io': 'CodePen',
	'zoom.us': 'Zoom',
	'office.com': 'Microsoft 365',
	'whatsapp.com': 'WhatsApp',
	'wechat.com': 'WeChat',
	'line.me': 'LINE',
	'proton.me': 'Proton',
	'nytimes.com': 'The New York Times',
	'bbc.com': 'BBC',
	'cnn.com': 'CNN',
	'theguardian.com': 'The Guardian',
	'theverge.com': 'The Verge',
	'paypal.com': 'PayPal',
	'tripadvisor.com': 'Tripadvisor',
	'skyscanner.net': 'Skyscanner',
	'ibm.com': 'IBM',
	'nvidia.com': 'NVIDIA',
	'perplexity.ai': 'Perplexity',
	'deepseek.com': 'DeepSeek',
	'notion.so': 'Notion',
	'linear.app': 'Linear',
	'trip.com': 'Trip.com',
	'booking.com': 'Booking.com',
};

export function siteName(domain: string): string {
	if (NAMES[domain]) return NAMES[domain]!;
	const label = domain.split('.')[0] ?? domain;
	return label.charAt(0).toUpperCase() + label.slice(1);
}

export const POPULAR_DOMAINS: string[] = Object.values(POPULAR_CATEGORIES).flat();
const POPULAR_SET = new Set(POPULAR_DOMAINS);

export function isPopular(domain: string): boolean {
	return POPULAR_SET.has(domain);
}

export function categoryOf(domain: string): PopularCategory | undefined {
	return (Object.keys(POPULAR_CATEGORIES) as PopularCategory[]).find((key) => (POPULAR_CATEGORIES[key] as readonly string[]).includes(domain));
}

/** A few related popular sites: same category first, then a stable pseudo-random pick. */
export function relatedDomains(domain: string, count = 12): string[] {
	const category = categoryOf(domain);
	const sameCategory = category ? (POPULAR_CATEGORIES[category] as readonly string[]).filter((d) => d !== domain) : [];
	let seed = [...domain].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 7);
	const others = POPULAR_DOMAINS.filter((d) => d !== domain && !sameCategory.includes(d));
	const shuffled = others
		.map((d) => {
			seed = (seed * 1103515245 + 12345) >>> 0;
			return { d, k: seed };
		})
		.sort((a, b) => a.k - b.k)
		.map((x) => x.d);
	return [...sameCategory, ...shuffled].slice(0, count);
}

/** Shown on the home page. */
export const FEATURED_DOMAINS = ['google.com', 'youtube.com', 'github.com', 'wikipedia.org', 'amazon.com', 'netflix.com', 'reddit.com', 'x.com', 'instagram.com', 'linkedin.com', 'apple.com', 'microsoft.com', 'spotify.com', 'stackoverflow.com', 'figma.com', 'notion.so', 'discord.com', 'cloudflare.com', 'twitch.tv', 'airbnb.com', 'paypal.com', 'bbc.com', 'slack.com', 't.im'];
