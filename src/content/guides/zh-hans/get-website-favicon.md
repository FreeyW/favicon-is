---
title: "如何获取任意网站的 Favicon 图标"
description: "获取网站 Favicon 图标的五种方法：从 /favicon.ico、页面 HTML 到 Favicon API，附代码示例及各自的优缺点。"
order: 5
updated: 2026-11-22
---

无论你在开发书签管理器、个人主页链接页（link-in-bio）、仪表盘还是浏览器扩展，迟早都会需要其他网站的图标。以下是几种方法，从最手动到最简单。

## 1. 请求 /favicon.ico

最古老的约定：许多网站仍会在根目录提供图标。

```text
https://example.com/favicon.ico
```

**优点：** 无需第三方。**缺点：** 相当多的网站没有这个文件，它通常只有 16×16 或 32×32 像素，而且文件缺失时你只会得到一张破损图片。

## 2. 读取页面 HTML

可靠的方法是下载首页，查找 `<link rel="icon">`、`<link rel="apple-touch-icon">` 和 Web 应用清单，然后挑选最合适的尺寸。

```js
const html = await fetch('https://example.com').then((r) => r.text());
const links = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
```

**优点：** 能找到网站实际声明的图标。**缺点：** 你必须自己处理重定向、相对 URL、超时、屏蔽爬虫的网站、缓存和回退——而且由于 CORS 限制，无法在浏览器中完成。

## 3. 使用浏览器扩展 API

Chrome 扩展可以使用 `favicon` 权限和 `chrome-extension://<id>/_favicon/?pageUrl=…` 来获取浏览器已知的图标。这只能在扩展内部使用，而且仅适用于用户访问过的网站。

## 4. 使用搜索引擎的网站图标服务

Google 和 DuckDuckGo 会公开它们在抓取过程中收集的图标：

```text
https://www.google.com/s2/favicons?domain=example.com&sz=64
https://icons.duckduckgo.com/ip3/example.com.ico
```

**优点：** 速度快、覆盖面广。**缺点：** 非官方且没有文档，对尺寸和格式的控制有限，也无法得知返回内容的任何信息。

## 5. 使用 Favicon.is

Favicon.is 将上述所有方法整合到一个 URL 中。它会检查 Google 网站图标缓存、读取网站 HTML、尝试 `/favicon.ico`，将结果存储在 Cloudflare R2 上，并始终返回一张图片：

```html
<img src="https://favicon.is/example.com" width="32" height="32" alt="">
```

- 使用 `?size=16` 到 `?size=256` 选择尺寸，或使用 `?larger=true`。
- 使用 `?original=true` 跳过 Google，读取网站自身声明的图标。
- 查看 `X-Source` 响应头，了解图标的来源。
- 只有顶级域名收录于 IANA 根区数据库的域名才会被查询，因此拼写错误和私有名称会立即返回默认图标。

查看 [API 文档](../../docs/)了解所有选项，或从[示例](../../examples/)中复制代码片段。
