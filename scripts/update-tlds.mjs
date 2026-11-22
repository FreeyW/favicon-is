#!/usr/bin/env node
/**
 * Regenerates src/data/tlds.json from the IANA Root Zone Database.
 *
 *   npm run update:tlds
 *
 * Source of truth: https://www.iana.org/domains/root/db
 * Rows whose manager is "Not assigned" (retired / undelegated TLDs) are skipped,
 * because they are no longer in the root zone and can never resolve.
 *
 * If iana.org cannot be reached (offline CI, restricted network) the script falls
 * back to the `global-tld-list` package, which is regenerated daily from IANA's
 * tlds-alpha-by-domain.txt. Pass --iana-only to fail instead of falling back.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const IANA_DB_URL = 'https://www.iana.org/domains/root/db';
const OUT_FILE = fileURLToPath(new URL('../src/data/tlds.json', import.meta.url));
const MIN_EXPECTED = 1000;
const ianaOnly = process.argv.includes('--iana-only');

// Stable IANA type assignments that the fallback dataset does not distinguish.
const SPONSORED = new Set(['aero', 'asia', 'cat', 'coop', 'edu', 'gov', 'int', 'jobs', 'mil', 'museum', 'post', 'tel', 'travel', 'xxx']);
const GENERIC_RESTRICTED = new Set(['biz', 'name', 'pro']);

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function decodeEntities(text) {
	return text
		.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
		.replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}

function clean(text) {
	return decodeEntities(text.replace(/<[^>]+>/g, ''))
		.replace(/[‎‏‪-‮]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

async function loadEnrichment() {
	try {
		const { listTlds } = await import('global-tld-list');
		const map = new Map();
		for (const info of listTlds()) map.set(info.ascii, info);
		return map;
	} catch {
		return new Map();
	}
}

async function fromIana() {
	const res = await fetch(IANA_DB_URL, {
		headers: { 'user-agent': 'favicon.is TLD updater (+https://favicon.is)', accept: 'text/html' },
		signal: AbortSignal.timeout(30_000),
	});
	if (!res.ok) throw new Error(`IANA responded with HTTP ${res.status}`);
	const html = await res.text();
	const rows = [];
	const rowRe = /<tr>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>/g;
	for (const [, cell, typeCell, managerCell] of html.matchAll(rowRe)) {
		const href = cell.match(/href="\/domains\/root\/db\/([^"]+)\.html"/i);
		if (!href) continue;
		const ascii = decodeURIComponent(href[1]).toLowerCase();
		const unicode = clean(cell).replace(/^\./, '').toLowerCase();
		const type = clean(typeCell).toLowerCase();
		const manager = clean(managerCell);
		if (!manager || /^not assigned$/i.test(manager)) continue;
		rows.push({ ascii, tld: unicode || ascii, type, manager });
	}
	return rows;
}

async function fromFallback() {
	const { listTlds } = await import('global-tld-list');
	const { getTldDetails } = await import('global-tld-list/details');
	return listTlds().map((info) => {
		let type = info.type;
		if (SPONSORED.has(info.ascii)) type = 'sponsored';
		else if (GENERIC_RESTRICTED.has(info.ascii)) type = 'generic-restricted';
		const details = getTldDetails(info.ascii);
		return { ascii: info.ascii, tld: info.tld, type, manager: details?.registryOperator ?? '' };
	});
}

async function main() {
	let source = 'iana';
	let rows;
	try {
		rows = await fromIana();
		if (rows.length < MIN_EXPECTED) throw new Error(`only ${rows.length} rows parsed`);
	} catch (error) {
		if (ianaOnly) throw error;
		console.warn(`[update-tlds] IANA root db unavailable (${error.message}); using global-tld-list fallback.`);
		source = 'global-tld-list';
		rows = await fromFallback();
	}

	const enrichment = await loadEnrichment();
	const seen = new Set();
	const tlds = rows
		.filter((row) => /^[a-z0-9-]+$/.test(row.ascii) && !seen.has(row.ascii) && seen.add(row.ascii))
		.map((row) => {
			const extra = enrichment.get(row.ascii);
			const entry = { tld: row.tld, ascii: row.ascii, type: row.type, manager: row.manager };
			if (extra?.countryCode) entry.cc = extra.countryCode;
			if (extra?.brand) entry.brand = true;
			return entry;
		})
		.sort((a, b) => a.ascii.localeCompare(b.ascii));

	if (tlds.length < MIN_EXPECTED) throw new Error(`Refusing to write: only ${tlds.length} TLDs`);

	const output = {
		source,
		sourceUrl: source === 'iana' ? IANA_DB_URL : 'https://www.npmjs.com/package/global-tld-list',
		generatedAt: new Date().toISOString().slice(0, 10),
		count: tlds.length,
		tlds,
	};
	await writeFile(OUT_FILE, JSON.stringify(output, null, '\t') + '\n');
	const byType = tlds.reduce((acc, t) => ((acc[t.type] = (acc[t.type] ?? 0) + 1), acc), {});
	console.log(`[update-tlds] wrote ${tlds.length} TLDs from ${source}:`, byType);
}

main().catch((error) => {
	console.error('[update-tlds] failed:', error);
	process.exit(1);
});
