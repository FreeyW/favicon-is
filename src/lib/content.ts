import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from '../i18n';

export type Guide = CollectionEntry<'guides'> & { slug: string };
export type LegalPage = CollectionEntry<'pages'> & { slug: string };

const slugOf = (id: string) => id.slice(id.indexOf('/') + 1);
const localeOf = (id: string) => id.slice(0, id.indexOf('/'));

/** Guides for a locale, ordered; missing translations fall back to English. */
export async function getGuides(locale: Locale): Promise<Guide[]> {
	const all = await getCollection('guides');
	const bySlug = new Map<string, Guide>();
	for (const entry of all) {
		const lang = localeOf(entry.id);
		if (lang !== DEFAULT_LOCALE && lang !== locale) continue;
		const slug = slugOf(entry.id);
		if (lang === locale || !bySlug.has(slug)) bySlug.set(slug, { ...entry, slug });
	}
	return [...bySlug.values()].sort((a, b) => a.data.order - b.data.order);
}

export async function getLegalPage(locale: Locale, slug: string): Promise<LegalPage | undefined> {
	const all = await getCollection('pages');
	const find = (lang: string) => all.find((entry) => entry.id === `${lang}/${slug}`);
	const entry = find(locale) ?? find(DEFAULT_LOCALE);
	return entry ? { ...entry, slug } : undefined;
}

/** Rough reading time; CJK text is counted by characters. */
export function readingMinutes(markdown: string): number {
	const text = markdown.replace(/```[\s\S]*?```/g, ' ');
	const cjk = (text.match(/[぀-ヿ㐀-鿿가-힯]/g) ?? []).length;
	const words = text.replace(/[぀-ヿ㐀-鿿가-힯]/g, ' ').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220 + cjk / 500));
}
