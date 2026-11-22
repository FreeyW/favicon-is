#!/usr/bin/env node
/**
 * Verifies that every locale has the same dictionary shape and the same set of
 * Markdown files as English, and that `{placeholders}` are preserved.
 *
 *   node scripts/check-locales.mjs            # all locales
 *   node scripts/check-locales.mjs de fr      # selected locales
 *
 * Requires Node 22.18+ (TypeScript type stripping).
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const { LOCALE_CODES } = await import(pathToFileURL(`${root}src/i18n/config.ts`).href);
const en = (await import(pathToFileURL(`${root}src/i18n/locales/en.ts`).href)).default;
const wanted = process.argv.slice(2).filter((code) => code !== 'en');
const locales = (wanted.length ? wanted : LOCALE_CODES.filter((code) => code !== 'en'));

const placeholders = (text) => [...text.matchAll(/\{([a-z]+)\}/gi)].map((m) => m[1]).sort().join(',');
let errors = 0;
const fail = (locale, message) => {
	errors++;
	console.error(`✗ [${locale}] ${message}`);
};

function compare(locale, source, target, path) {
	if (typeof source === 'string') {
		if (typeof target !== 'string') return fail(locale, `${path}: expected a string`);
		if (!target.trim()) return fail(locale, `${path}: empty string`);
		if (placeholders(source) !== placeholders(target)) fail(locale, `${path}: placeholders differ ({${placeholders(source)}} vs {${placeholders(target)}})`);
		return;
	}
	if (Array.isArray(source)) {
		if (!Array.isArray(target)) return fail(locale, `${path}: expected an array`);
		if (source.length !== target.length) fail(locale, `${path}: expected ${source.length} items, got ${target.length}`);
		source.forEach((item, i) => target[i] !== undefined && compare(locale, item, target[i], `${path}[${i}]`));
		return;
	}
	if (!target || typeof target !== 'object') return fail(locale, `${path}: expected an object`);
	for (const key of Object.keys(source)) {
		if (!(key in target)) fail(locale, `${path}.${key}: missing`);
		else compare(locale, source[key], target[key], `${path}.${key}`);
	}
	for (const key of Object.keys(target)) if (!(key in source)) fail(locale, `${path}.${key}: unknown key`);
}

function frontmatter(file) {
	const text = readFileSync(file, 'utf8');
	const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return null;
	const data = {};
	for (const line of match[1].split('\n')) {
		const kv = line.match(/^([a-z]+):\s*(.*)$/i);
		if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
	}
	const codeBlocks = (match[2].match(/```/g) ?? []).length;
	return { data, codeBlocks };
}

for (const locale of locales) {
	const before = errors;
	const file = `${root}src/i18n/locales/${locale}.ts`;
	if (!existsSync(file)) {
		fail(locale, `missing ${file}`);
		continue;
	}
	try {
		const dict = (await import(pathToFileURL(file).href)).default;
		compare(locale, en, dict, 'dict');
	} catch (error) {
		fail(locale, `cannot load dictionary: ${error.message}`);
	}
	for (const collection of ['guides', 'pages']) {
		const enDir = `${root}src/content/${collection}/en`;
		for (const name of readdirSync(enDir)) {
			const target = `${root}src/content/${collection}/${locale}/${name}`;
			if (!existsSync(target)) {
				fail(locale, `missing ${collection}/${locale}/${name}`);
				continue;
			}
			const a = frontmatter(`${enDir}/${name}`);
			const b = frontmatter(target);
			if (!b) {
				fail(locale, `${collection}/${name}: invalid frontmatter`);
				continue;
			}
			for (const key of ['title', 'description', 'updated']) if (!b.data[key]) fail(locale, `${collection}/${name}: missing ${key}`);
			if (a.data.order !== b.data.order) fail(locale, `${collection}/${name}: order must be ${a.data.order}`);
			if (a.codeBlocks !== b.codeBlocks) fail(locale, `${collection}/${name}: expected ${a.codeBlocks / 2} code blocks, got ${b.codeBlocks / 2}`);
		}
	}
	if (errors === before) console.log(`✓ [${locale}] ok`);
}

if (errors) {
	console.error(`\n${errors} problem(s) found.`);
	process.exit(1);
}
