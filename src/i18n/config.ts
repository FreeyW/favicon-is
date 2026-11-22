/**
 * Locale registry. English is the default and lives at the site root;
 * every other locale is served under `/{code}/`.
 */
export const LOCALES = {
	en: { name: 'English', english: 'English', htmlLang: 'en', hreflang: 'en', og: 'en_US', dir: 'ltr' },
	'zh-hans': { name: '简体中文', english: 'Chinese (Simplified)', htmlLang: 'zh-Hans', hreflang: 'zh-Hans', og: 'zh_CN', dir: 'ltr' },
	'zh-hant': { name: '繁體中文', english: 'Chinese (Traditional)', htmlLang: 'zh-Hant', hreflang: 'zh-Hant', og: 'zh_TW', dir: 'ltr' },
	ja: { name: '日本語', english: 'Japanese', htmlLang: 'ja', hreflang: 'ja', og: 'ja_JP', dir: 'ltr' },
	fr: { name: 'Français', english: 'French', htmlLang: 'fr', hreflang: 'fr', og: 'fr_FR', dir: 'ltr' },
	es: { name: 'Español', english: 'Spanish', htmlLang: 'es', hreflang: 'es', og: 'es_ES', dir: 'ltr' },
	de: { name: 'Deutsch', english: 'German', htmlLang: 'de', hreflang: 'de', og: 'de_DE', dir: 'ltr' },
	ko: { name: '한국어', english: 'Korean', htmlLang: 'ko', hreflang: 'ko', og: 'ko_KR', dir: 'ltr' },
	it: { name: 'Italiano', english: 'Italian', htmlLang: 'it', hreflang: 'it', og: 'it_IT', dir: 'ltr' },
	pt: { name: 'Português', english: 'Portuguese', htmlLang: 'pt', hreflang: 'pt', og: 'pt_BR', dir: 'ltr' },
	ru: { name: 'Русский', english: 'Russian', htmlLang: 'ru', hreflang: 'ru', og: 'ru_RU', dir: 'ltr' },
	nl: { name: 'Nederlands', english: 'Dutch', htmlLang: 'nl', hreflang: 'nl', og: 'nl_NL', dir: 'ltr' },
	pl: { name: 'Polski', english: 'Polish', htmlLang: 'pl', hreflang: 'pl', og: 'pl_PL', dir: 'ltr' },
	tr: { name: 'Türkçe', english: 'Turkish', htmlLang: 'tr', hreflang: 'tr', og: 'tr_TR', dir: 'ltr' },
	hi: { name: 'हिन्दी', english: 'Hindi', htmlLang: 'hi', hreflang: 'hi', og: 'hi_IN', dir: 'ltr' },
} as const;

export type Locale = keyof typeof LOCALES;
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_CODES = Object.keys(LOCALES) as Locale[];

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && value in LOCALES;
}
