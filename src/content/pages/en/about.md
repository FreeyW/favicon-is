---
title: About Favicon.is
description: Favicon.is is a free favicon API that returns the icon of any website from a single URL. Learn who it is for, how it works and the technology behind it.
updated: 2026-11-22
---

Favicon.is is a free service that returns the favicon of any website from a single URL. Put a domain after `https://favicon.is/` and you get the site's icon back as an image, ready for an `<img>` tag.

## Who it is for

- **Developers** who show links, bookmarks or integrations and want recognisable icons without scraping websites.
- **Designers** who need the logo of a well-known site for a mock-up in seconds.
- **Webmasters** who want to check how their own favicon looks and whether every size is in place.

## How it works

Each request goes through a short pipeline. We normalise the input, check that the domain ends in a top-level domain from the IANA Root Zone Database, and then look for the icon in our edge cache, our storage, Google's favicon cache and finally on the website itself. The best result is stored and served from the edge, so the next request is almost instant.

If no icon exists, you get a neutral default icon instead of a broken image.

## Technology

The website is built with [Astro](https://astro.build) and TypeScript. The API and pages run on [Cloudflare Workers](https://workers.cloudflare.com) in data centres around the world, and icons are stored in [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/). The list of supported TLDs comes from the [IANA Root Zone Database](https://www.iana.org/domains/root/db).

## Responsible use

Favicon.is only fetches publicly available icons, identifies itself with a clear user agent and stores at most one copy per icon and size. Logos remain the property of their owners. If you own a website and want its icon removed from our cache, contact us using the details below.

## Credits

Favicon.is was inspired by Favicon.im and is part of a family of small, free web tools, listed at the bottom of every page.
