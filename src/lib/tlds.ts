import data from '../data/tlds.json';

/** IANA Root Zone Database TLD types. */
export type TldType = 'generic' | 'country-code' | 'sponsored' | 'infrastructure' | 'generic-restricted' | 'test';

export interface TldEntry {
	/** Unicode form, e.g. `中国`. */
	tld: string;
	/** ASCII (punycode) form used in DNS, e.g. `xn--fiqs8s`. */
	ascii: string;
	type: TldType;
	/** TLD manager / registry operator as listed by IANA (may be empty in fallback data). */
	manager: string;
	/** ISO 3166-1 alpha-2 code for country-code TLDs. */
	cc?: string;
	/** ICANN ".brand" TLD, closed to the public. */
	brand?: boolean;
}

export interface TldDataset {
	source: string;
	sourceUrl: string;
	generatedAt: string;
	count: number;
	tlds: TldEntry[];
}

export const TLD_DATA = data as TldDataset;
export const TLD_TYPES: TldType[] = ['generic', 'country-code', 'sponsored', 'generic-restricted', 'infrastructure', 'test'];

const index = new Map<string, TldEntry>(TLD_DATA.tlds.map((entry) => [entry.ascii, entry]));

/** Looks up a TLD by its ASCII (punycode) form. */
export function getTld(ascii: string): TldEntry | undefined {
	return index.get(ascii.toLowerCase());
}

/** True when `ascii` is a delegated TLD in the IANA Root Zone Database. */
export function isIanaTld(ascii: string): boolean {
	return index.has(ascii.toLowerCase());
}
