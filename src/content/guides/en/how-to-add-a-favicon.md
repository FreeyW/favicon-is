---
title: How to add a favicon to your website (step by step)
description: A step-by-step guide to adding a favicon to any website, including the HTML tags, the web app manifest, Apple touch icons and how to fix a favicon that doesn't update.
order: 4
updated: 2026-11-22
---

Adding a favicon takes about ten minutes. This guide walks you through creating the files, adding the HTML and checking the result.

## 1. Prepare your source image

Start with a square image of at least **512×512 pixels**, ideally a vector (SVG) version of your logo. Simplify it: at 16 pixels, text and thin lines disappear. Many brands use a single letter or symbol for the favicon.

## 2. Create the icon files

Export these files from your design tool or a favicon generator:

- `favicon.ico` – 32×32 (optionally with 16×16 and 48×48 inside)
- `icon.svg` – the scalable version
- `apple-touch-icon.png` – 180×180 with a solid background
- `icon-192.png` and `icon-512.png` – for the web app manifest

Put them in the root folder of your website (the same folder as your home page).

## 3. Add the HTML tags

Paste these lines inside the `<head>` of every page:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Most frameworks and site builders have a dedicated place for this: the `public` folder in Astro, Next.js and Vite projects, the Site Identity settings in WordPress, or the theme settings in Shopify.

## 4. Add a web app manifest

Create `manifest.webmanifest` next to your icons:

```json
{
  "name": "My Website",
  "icons": [
    { "src": "/icon-192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512" },
    { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512", "purpose": "maskable" }
  ]
}
```

## 5. Check the result

Open your site in a new browser tab, then run it through the [Favicon.is checker](../../checker/). It lists every icon your page declares, checks that the files load and tells you which sizes are missing.

## Troubleshooting: my favicon doesn't update

Browsers cache favicons very aggressively. If you replaced your icon but still see the old one:

- Add a version to the URL, for example `/icon.svg?v=2`, and update the `<link>` tags.
- Open the icon URL directly and force a reload.
- Clear the browser cache or test in a private window.
- Search engines need to recrawl your home page; that can take days or weeks.

## Bonus: show the favicons of other websites

If your app lists links to other sites, use Favicon.is instead of hosting their icons yourself:

```html
<img src="https://favicon.is/example.com?size=32" width="16" height="16" alt="">
```
