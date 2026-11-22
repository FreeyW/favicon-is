import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Long-form guides, one Markdown file per locale: `src/content/guides/{locale}/{slug}.md`. */
const guides = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		order: z.number(),
		updated: z.coerce.date(),
	}),
});

/** About, privacy and terms pages: `src/content/pages/{locale}/{slug}.md`. */
const pages = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		updated: z.coerce.date(),
	}),
});

export const collections = { guides, pages };
