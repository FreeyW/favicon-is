// Parses the YAML frontmatter of every Markdown file and reports errors.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

const walk = (dir) => readdirSync(dir).flatMap((name) => (statSync(join(dir, name)).isDirectory() ? walk(join(dir, name)) : [join(dir, name)]));
let bad = 0;
for (const file of walk('src/content').filter((f) => f.endsWith('.md'))) {
	const match = readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/);
	try {
		const data = parse(match?.[1] ?? '');
		if (typeof data?.title !== 'string' || typeof data?.description !== 'string') throw new Error('title/description must be strings');
	} catch (error) {
		bad++;
		console.error(`✗ ${file}: ${error.message.split('\n')[0]}`);
	}
}
console.log(bad ? `${bad} file(s) with invalid frontmatter` : 'All frontmatter OK');
process.exit(bad ? 1 : 0);
