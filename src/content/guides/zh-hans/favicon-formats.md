---
title: "网站图标格式：ICO、PNG 与 SVG 对比详解"
description: "对比 ICO、PNG、SVG、GIF 和 WebP 等 Favicon 格式，了解各浏览器的支持情况，以及当下应采用哪种组合。"
order: 3
updated: 2026-11-22
---

网站图标可以保存为多种图片格式。每种格式各有所长，最佳方案是组合使用其中两三种。

## ICO

最早的网站图标格式。`.ico` 文件是一个容器，可以包含多个不同尺寸的位图，例如 16×16、32×32 和 48×48，让操作系统挑选合适的那一个。

- **优点：** 历来所有浏览器都支持；会在 `/favicon.ico` 被自动请求；一个文件即可包含多种尺寸。
- **缺点：** 文件体积较大；不支持矢量缩放；需要专门的工具来制作。

**适用场景：** 在网站根目录放置一个 `favicon.ico`，主要用于兼容性。

## PNG

PNG 是当今最常用的网站图标格式。它支持透明，压缩效果也很好。

- **优点：** 普遍支持；可以从任何设计工具轻松导出；非常适合 180×180 的 `apple-touch-icon` 以及 192×192 和 512×512 的清单图标。
- **缺点：** 每种尺寸都是单独的文件；无法缩放到超出其像素尺寸。

**适用场景：** 触摸图标、清单图标，以及作为不支持 SVG 的浏览器的回退方案。

## SVG

SVG 是矢量格式，因此一个小文件就能在任何尺寸、任何屏幕密度下保持清晰。

- **优点：** 在任何地方都清晰锐利；文件体积极小；可以通过 CSS 媒体查询适配深色模式。
- **缺点：** 浏览器支持尚未普及，因此请保留 ICO 或 PNG 作为回退；细节很多的 Logo 可能仍需要一个用于 16×16 的简化版本。

当用户偏好深色主题时，SVG 网站图标可以切换颜色：

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    path { fill: #0f172a; }
    @media (prefers-color-scheme: dark) { path { fill: #f8fafc; } }
  </style>
  <path d="M4 4h24v24H4z"/>
</svg>
```

## GIF、JPEG 和 WebP

这些格式在大多数现代浏览器中都能使用，但用作图标优势不大。GIF 支持动画，但动态网站图标容易分散注意力，而且并非所有地方都会显示。JPEG 不支持透明。WebP 和 AVIF 效率很高，但并不是所有读取网站图标的平台都支持。

## 应该使用哪些格式？

目前最可靠的组合是：

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

支持 SVG 的浏览器会使用 `icon.svg`；其他浏览器则回退到 `favicon.ico`。

## Favicon.is 返回什么格式？

Favicon.is 会按网站提供的格式返回图标。大多数情况下是 PNG，但也可能是 ICO、SVG、JPEG、GIF 或 WebP。`Content-Type` 响应头始终会告诉你收到的是哪种格式，而且每种格式都可以在普通的 `<img>` 标签中使用。
