import type { APIRoute } from 'astro';
import { SITE_URL } from '../site.config';
import { xmlResponse } from '../lib/sitemap';

const today = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = () =>
	xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE_URL}/sitemap-pages.xml</loc><lastmod>${today}</lastmod></sitemap>
  <sitemap><loc>${SITE_URL}/sitemap-sites.xml</loc><lastmod>${today}</lastmod></sitemap>
</sitemapindex>
`);
