// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
	site: 'https://favicon.is',
	// Pages are prerendered by default; routes that need the edge (per-domain
	// pages, the inspect API) opt out with `export const prerender = false`.
	output: 'static',
	trailingSlash: 'ignore',
	build: { format: 'directory' },
	adapter: cloudflare({
		// The site doesn't use astro:assets image transforms.
		imageService: 'passthrough',
		// Static pages are prerendered in Node at build time; only on-demand
		// routes and the favicon API run in workerd.
		prerenderEnvironment: 'node',
	}),
	markdown: {
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark' },
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	// No sessions are used, so no KV namespace is needed.
	session: false,
	devToolbar: { enabled: false },
});
