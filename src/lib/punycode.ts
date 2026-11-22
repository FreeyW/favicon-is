/**
 * Minimal RFC 3492 Punycode decoder, used to show IDN domains (xn--...) in
 * their Unicode form. Encoding is handled by the WHATWG URL parser.
 */
const BASE = 36;
const TMIN = 1;
const TMAX = 26;
const SKEW = 38;
const DAMP = 700;
const INITIAL_BIAS = 72;
const INITIAL_N = 128;

function adapt(delta: number, numPoints: number, firstTime: boolean): number {
	let k = 0;
	delta = firstTime ? Math.floor(delta / DAMP) : delta >> 1;
	delta += Math.floor(delta / numPoints);
	for (; delta > ((BASE - TMIN) * TMAX) >> 1; k += BASE) {
		delta = Math.floor(delta / (BASE - TMIN));
	}
	return Math.floor(k + ((BASE - TMIN + 1) * delta) / (delta + SKEW));
}

function basicToDigit(codePoint: number): number {
	if (codePoint >= 0x30 && codePoint < 0x3a) return 26 + (codePoint - 0x30);
	if (codePoint >= 0x41 && codePoint < 0x5b) return codePoint - 0x41;
	if (codePoint >= 0x61 && codePoint < 0x7b) return codePoint - 0x61;
	return BASE;
}

function decodeLabel(input: string): string {
	const output: number[] = [];
	let n = INITIAL_N;
	let bias = INITIAL_BIAS;
	let i = 0;
	let basic = input.lastIndexOf('-');
	if (basic < 0) basic = 0;
	for (let j = 0; j < basic; ++j) {
		const code = input.charCodeAt(j);
		if (code >= 0x80) throw new RangeError('not-basic');
		output.push(code);
	}
	for (let index = basic > 0 ? basic + 1 : 0; index < input.length; ) {
		const oldi = i;
		for (let w = 1, k = BASE; ; k += BASE) {
			if (index >= input.length) throw new RangeError('invalid-input');
			const digit = basicToDigit(input.charCodeAt(index++));
			if (digit >= BASE) throw new RangeError('invalid-input');
			i += digit * w;
			const t = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
			if (digit < t) break;
			w *= BASE - t;
		}
		const out = output.length + 1;
		bias = adapt(i - oldi, out, oldi === 0);
		n += Math.floor(i / out);
		i %= out;
		output.splice(i++, 0, n);
	}
	return String.fromCodePoint(...output);
}

/** Converts an ASCII domain to Unicode, label by label. Invalid labels are kept as-is. */
export function toUnicode(domain: string): string {
	return domain
		.split('.')
		.map((label) => {
			if (!label.startsWith('xn--')) return label;
			try {
				return decodeLabel(label.slice(4).toLowerCase());
			} catch {
				return label;
			}
		})
		.join('.');
}
