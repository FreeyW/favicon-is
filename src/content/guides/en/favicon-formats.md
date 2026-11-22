---
title: "Favicon formats: ICO vs PNG vs SVG explained"
description: Compare the ICO, PNG, SVG, GIF and WebP favicon formats, learn which browsers support them and see which combination to use today.
order: 3
updated: 2026-11-22
---

A favicon can be saved in several image formats. Each has strengths, and the best setup combines two or three of them.

## ICO

The original favicon format. An `.ico` file is a container that can hold several bitmaps at different sizes, for example 16×16, 32×32 and 48×48, so the operating system can pick the right one.

- **Pros:** supported by every browser ever made; requested automatically at `/favicon.ico`; one file for several sizes.
- **Cons:** larger file size; no vector scaling; needs a special tool to create.

**Use it for:** a single `favicon.ico` at the root of your site, mainly for compatibility.

## PNG

PNG is the most common format for favicons today. It supports transparency and compresses well.

- **Pros:** universal support; easy to export from any design tool; ideal for the 180×180 `apple-touch-icon` and the 192×192 and 512×512 manifest icons.
- **Cons:** each size is a separate file; it doesn't scale beyond its pixel size.

**Use it for:** touch icons, manifest icons and as a fallback for browsers that don't support SVG.

## SVG

SVG is a vector format, so one small file stays sharp at every size and on every screen density.

- **Pros:** perfectly crisp everywhere; tiny file size; can react to dark mode with CSS media queries.
- **Cons:** browser support is not yet universal, so keep an ICO or PNG fallback; very detailed logos may still need a simplified version for 16×16.

An SVG favicon can switch colours when the user prefers a dark theme:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    path { fill: #0f172a; }
    @media (prefers-color-scheme: dark) { path { fill: #f8fafc; } }
  </style>
  <path d="M4 4h24v24H4z"/>
</svg>
```

## GIF, JPEG and WebP

These formats work in most modern browsers but have few advantages for icons. GIF supports animation, though animated favicons are distracting and not shown everywhere. JPEG doesn't support transparency. WebP and AVIF are efficient but not supported by every platform that reads favicons.

## Which formats should you use?

The most reliable combination today is:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Browsers that understand SVG will use `icon.svg`; others fall back to `favicon.ico`.

## What format does Favicon.is return?

Favicon.is returns the icon in the format the website provides. In most cases this is PNG, but it may be ICO, SVG, JPEG, GIF or WebP. The `Content-Type` response header always tells you which one you received, and every format works in a normal `<img>` tag.
