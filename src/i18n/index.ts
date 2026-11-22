import en, { type Dict } from './locales/en';
import { DEFAULT_LOCALE, LOCALES, LOCALE_CODES, isLocale, type Locale } from './config';
import { SITE_URL } from '../site.config';

export { DEFAULT_LOCALE, LOCALES, LOCALE_CODES, isLocale, type Locale, type Dict };

// Every file in ./locales is picked up automatically; a missing locale falls back to English.
const modules = import.meta.glob<{ default: Dict }>('./locales/*.ts', { eager: true });
const dictionaries = Object.fromEntries(
	LOCALE_CODES.map((code) => [code, modules[`./locales/${code}.ts`]?.default ?? en]),
) as Record<Locale, Dict>;

export function useTranslations(locale: Locale): Dict {
	return dictionaries[locale];
}

/** Replaces `{name}` placeholders. */
export function fmt(template: string, values: Record<string, string | number>): string {
	return template.replace(/\{([a-z]+)\}/gi, (match, key: string) => (key in values ? String(values[key]) : match));
}

/** `/docs/` → `/docs/` for English, `/de/docs/` for German. `path` must start with `/`. */
export function localizePath(locale: Locale, path = '/'): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	return locale === DEFAULT_LOCALE ? clean : `/${locale}${clean}`;
}

export function absoluteUrl(path: string): string {
	return new URL(path, SITE_URL).toString();
}

/** Resolves the optional `[...lang]` route param. `undefined` means English; unknown values return `null`. */
export function localeFromParam(param: string | undefined): Locale | null {
	if (param === undefined || param === '') return DEFAULT_LOCALE;
	return isLocale(param) && param !== DEFAULT_LOCALE ? param : null;
}

/** `getStaticPaths` entries for a page that exists in every locale. */
export function localeStaticPaths() {
	return LOCALE_CODES.map((locale) => ({
		params: { lang: locale === DEFAULT_LOCALE ? undefined : locale },
		props: { locale },
	}));
}

/** Splits `/de/docs/` into `{ locale: 'de', path: '/docs/' }`. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
	const [, first, ...rest] = pathname.split('/');
	if (first && isLocale(first) && first !== DEFAULT_LOCALE) {
		return { locale: first, path: `/${rest.join('/')}` };
	}
	return { locale: DEFAULT_LOCALE, path: pathname || '/' };
}

export function formatDate(date: Date, locale: Locale): string {
	return new Intl.DateTimeFormat(LOCALES[locale].htmlLang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(date);
}

export function formatNumber(value: number, locale: Locale): string {
	return new Intl.NumberFormat(LOCALES[locale].htmlLang).format(value);
}

/** Localised country / region name for ccTLDs. */
export function regionName(code: string, locale: Locale): string {
	try {
		return new Intl.DisplayNames([LOCALES[locale].htmlLang], { type: 'region' }).of(code) ?? code;
	} catch {
		return code;
	}
}
