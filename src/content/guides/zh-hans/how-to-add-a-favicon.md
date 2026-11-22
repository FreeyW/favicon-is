---
title: "如何给网站添加 Favicon 图标（分步教程）"
description: "为任意网站添加 Favicon 图标的分步指南，涵盖 HTML 标签、Web 应用清单、Apple 触摸图标，以及网站图标不更新时的解决方法。"
order: 4
updated: 2026-11-22
---

添加网站图标大约只需十分钟。本指南将带你完成创建文件、添加 HTML 和检查结果的全过程。

## 1. 准备源图片

从一张至少 **512×512 像素**的正方形图片开始，最好是 Logo 的矢量（SVG）版本。请将其简化：在 16 像素下，文字和细线条都会消失。许多品牌会用单个字母或符号作为网站图标。

## 2. 创建图标文件

从设计工具或网站图标生成器中导出以下文件：

- `favicon.ico`：32×32（可选择同时包含 16×16 和 48×48）
- `icon.svg`：可缩放版本
- `apple-touch-icon.png`：180×180，带纯色背景
- `icon-192.png` 和 `icon-512.png`：用于 Web 应用清单

将它们放在网站的根目录中（与首页位于同一目录）。

## 3. 添加 HTML 标签

将以下代码粘贴到每个页面的 `<head>` 中：

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

大多数框架和建站工具都有专门放置这些内容的位置：Astro、Next.js 和 Vite 项目中的 `public` 文件夹，WordPress 的“站点身份”（Site Identity）设置，或 Shopify 的主题设置。

## 4. 添加 Web 应用清单

在图标旁边创建 `manifest.webmanifest`：

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

## 5. 检查结果

在新的浏览器标签页中打开你的网站，然后用 [Favicon.is 检测工具](../../checker/)检查一遍。它会列出页面声明的所有图标，检查文件能否正常加载，并告诉你缺少哪些尺寸。

## 故障排除：网站图标不更新

浏览器对网站图标的缓存非常激进。如果你已经替换了图标，却仍然看到旧图标：

- 在 URL 中添加版本号，例如 `/icon.svg?v=2`，并更新 `<link>` 标签。
- 直接打开图标 URL 并强制刷新。
- 清除浏览器缓存，或在无痕窗口中测试。
- 搜索引擎需要重新抓取你的首页，这可能需要几天甚至几周。

## 附加技巧：显示其他网站的图标

如果你的应用会列出指向其他网站的链接，可以使用 Favicon.is，而不必自己托管这些图标：

```html
<img src="https://favicon.is/example.com?size=32" width="16" height="16" alt="">
```
