---
title: What is a favicon? A short guide to website icons
description: Learn what a favicon is, where browsers and search engines show it, why it matters for your brand and how browsers find it.
order: 1
updated: 2026-11-22
---

A **favicon** (short for *favorite icon*) is the small image that represents a website. You see it in browser tabs, in your bookmarks and history, in the address bar, next to search results and on the home screen of your phone when you save a site as a shortcut.

## Where favicons appear

- **Browser tabs.** With many tabs open, the icon is often the only thing that tells them apart.
- **Bookmarks and history.** Icons make long lists scannable at a glance.
- **Search results.** Google and other search engines show the favicon next to your site name on mobile and desktop.
- **Home screens and app launchers.** When someone adds your site to their phone, the touch icon becomes the app icon.
- **Other apps.** Chat apps, read-later services, password managers and dashboards all use favicons to label links.

## A little history

Favicons were introduced by Internet Explorer 5 in 1999. The browser looked for a file called `favicon.ico` in the root of a website and showed it in the *Favorites* menu, which is where the name comes from. Later, HTML gained the `<link rel="icon">` tag so that sites could choose the location, format and size of their icon.

Today a single website typically ships several icons: a small ICO or PNG for tabs, an SVG that scales to any size, an `apple-touch-icon` for iOS and larger PNG files listed in a web app manifest for Android.

## Why favicons matter

1. **Recognition.** A clear icon helps people find your tab among dozens of others and builds trust in your brand.
2. **Professional appearance.** A missing favicon shows a generic placeholder, which looks unfinished.
3. **Search visibility.** Search engines display favicons in results, and a distinctive icon can improve click-through.
4. **Fewer errors.** Browsers request `/favicon.ico` automatically. Without one, your server logs fill up with 404 errors.

## How browsers find a favicon

When a page loads, the browser reads the `<head>` for `<link>` tags whose `rel` attribute contains `icon`. It chooses the best candidate based on the `sizes` and `type` attributes and the screen it is drawing on. If there is no declaration at all, it falls back to `https://example.com/favicon.ico`.

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Getting the favicon of any website

If you are building a product that shows links to other websites, you don't need to scrape each site yourself. Favicon.is returns the icon for any domain from a single URL:

```html
<img src="https://favicon.is/wikipedia.org" width="32" height="32" alt="Wikipedia">
```

Next, learn [which sizes you need](../favicon-sizes/) and [which file formats to use](../favicon-formats/).
