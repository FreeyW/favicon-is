---
title: Favicon sizes in 2026 – the complete cheat sheet
description: Which favicon sizes do you really need? A practical list of icon sizes for browsers, Google Search, iOS, Android and web app manifests.
order: 2
updated: 2026-11-22
---

Browsers, operating systems and search engines all display website icons at different sizes. The good news: you only need a handful of files to look sharp everywhere.

## The short answer

For almost every website, this set is enough:

| File | Size | Used by |
| --- | --- | --- |
| `favicon.ico` | 32×32 (can also contain 16×16 and 48×48) | All browsers, legacy tools, the automatic `/favicon.ico` request |
| `icon.svg` | Scalable | Modern browsers, sharp at any size, can support dark mode |
| `apple-touch-icon.png` | 180×180 | iPhone and iPad home screens |
| `icon-192.png` | 192×192 | Android home screen, web app manifest |
| `icon-512.png` | 512×512 | Android splash screens, installable web apps |

## Common favicon sizes and what they are for

| Size | Where it shows up |
| --- | --- |
| 16×16 | Browser tabs and bookmarks on standard-resolution screens |
| 32×32 | Browser tabs on high-resolution screens, Windows taskbar shortcuts |
| 48×48 | Windows site icons; the minimum size Google Search recommends |
| 96×96, 144×144 | Google Search on high-density screens (multiples of 48) |
| 180×180 | `apple-touch-icon` for iOS and iPadOS |
| 192×192 | Android Chrome home screen and the manifest minimum |
| 512×512 | Manifest icon for splash screens and app stores for PWAs |

## Google Search requirements

Google shows your favicon next to your pages in search results. According to Google's guidelines, the icon should be **square**, at least **48×48 pixels** (or a multiple of 48, such as 96×96 or 144×144) and available at a stable URL that Googlebot is allowed to crawl. SVG files are also accepted. Very small icons are scaled up and can look blurry.

## Tips for crisp icons

- **Design for the smallest size first.** At 16×16 there is only room for a simple shape or one or two letters. Remove fine details and thin lines.
- **Use the full square.** Icons with too much padding look tiny in tabs.
- **Test on light and dark backgrounds.** Tabs, search results and home screens use both.
- **Give iOS a solid background.** iOS fills transparent areas of `apple-touch-icon` with black.
- **Mark maskable icons.** Android may crop icons into circles or squircles; use `"purpose": "maskable"` in the manifest for icons with a safe zone.

## Getting icons in any size from Favicon.is

When you display icons of *other* websites, request exactly the size you need:

```text
https://favicon.is/github.com?size=32
https://favicon.is/github.com?size=64
https://favicon.is/github.com?larger=true
```

Supported values are 16, 32, 48, 64, 128 and 256 pixels. A site can only be as sharp as the largest icon it publishes, so check it with the [favicon checker](../../checker/).
