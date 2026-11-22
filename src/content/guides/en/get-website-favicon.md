---
title: How to get the favicon of any website
description: Five ways to get a website's favicon – from /favicon.ico and the page HTML to favicon APIs – with code examples and the pros and cons of each.
order: 5
updated: 2026-11-22
---

Whether you are building a bookmark manager, a link-in-bio page, a dashboard or a browser extension, sooner or later you need the icons of other websites. Here are the options, from the most manual to the easiest.

## 1. Request /favicon.ico

The oldest convention: many sites still serve an icon at the root.

```text
https://example.com/favicon.ico
```

**Pros:** no third party. **Cons:** a large share of sites don't have the file, it is often only 16×16 or 32×32 pixels, and you get a broken image when it's missing.

## 2. Read the page HTML

The reliable way is to download the home page and look for `<link rel="icon">`, `<link rel="apple-touch-icon">` and the web app manifest, then pick the best size.

```js
const html = await fetch('https://example.com').then((r) => r.text());
const links = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
```

**Pros:** finds the icon the site actually declares. **Cons:** you have to handle redirects, relative URLs, timeouts, sites that block bots, caching and fallbacks yourself – and you can't do it from a browser because of CORS.

## 3. Use the browser extension APIs

Chrome extensions can use the `favicon` permission and `chrome-extension://<id>/_favicon/?pageUrl=…` to get icons the browser already knows. This only works inside an extension and only for sites the user has visited.

## 4. Use a search engine's favicon service

Google and DuckDuckGo expose the icons they collect while crawling:

```text
https://www.google.com/s2/favicons?domain=example.com&sz=64
https://icons.duckduckgo.com/ip3/example.com.ico
```

**Pros:** fast and broad coverage. **Cons:** unofficial and undocumented, limited control over size and format, and no information about what was returned.

## 5. Use Favicon.is

Favicon.is combines all of the above behind one URL. It checks Google's favicon cache, reads the site's HTML, tries `/favicon.ico`, stores the result on Cloudflare R2 and always returns an image:

```html
<img src="https://favicon.is/example.com" width="32" height="32" alt="">
```

- Choose a size with `?size=16` to `?size=256`, or use `?larger=true`.
- Use `?original=true` to skip Google and read the site's own icon declarations.
- Check the `X-Source` header to see where the icon came from.
- Only domains with a TLD from the IANA Root Zone Database are looked up, so typos and private names return the default icon instantly.

See the [API documentation](../../docs/) for every option, or copy a snippet from the [examples](../../examples/).
