---
title: "关于 Favicon.is"
description: "Favicon.is 是一个免费的网站图标 API，只需一个 URL 即可返回任意网站的图标。了解它的适用人群、工作原理和背后的技术。"
updated: 2026-11-22
---

Favicon.is 是一项免费服务，只需一个 URL 即可返回任意网站的图标。在 `https://favicon.is/` 后面加上域名，就能以图片形式获得该网站的图标，可直接用于 `<img>` 标签。

## 适用人群

- **开发者**：需要显示链接、书签或集成服务，希望获得易于辨识的图标，又不想自己抓取网站。
- **设计师**：需要在几秒钟内拿到知名网站的 Logo，用于设计稿。
- **站长**：想检查自己网站图标的显示效果，以及各个尺寸是否齐全。

## 工作原理

每个请求都会经过一条简短的处理流程。我们会先规范化输入，检查域名是否以 IANA 根区数据库中的顶级域名结尾，然后依次在边缘缓存、我们的存储和 Google 网站图标缓存中查找图标，最后再到网站本身查找。最佳结果会被存储并从边缘节点分发，因此下一次请求几乎可以瞬间完成。

如果图标不存在，你会得到一个中性的默认图标，而不是一张破损图片。

## 技术栈

本网站使用 [Astro](https://astro.build) 和 TypeScript 构建。API 和页面运行在遍布全球各地数据中心的 [Cloudflare Workers](https://workers.cloudflare.com) 上，图标存储在 [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/) 中。支持的顶级域名列表来自 [IANA 根区数据库](https://www.iana.org/domains/root/db)。

## 负责任的使用

Favicon.is 只获取公开可用的图标，会使用清晰的 User-Agent 标识自身，并且每个图标的每种尺寸最多只存储一份副本。Logo 仍归其所有者所有。如果你是网站所有者，希望从我们的缓存中移除该网站的图标，请通过下方的联系方式与我们联系。

## 致谢

Favicon.is 的灵感来自 Favicon.im，它是一系列小巧免费的网络工具之一，这些工具都列在每个页面的底部。
