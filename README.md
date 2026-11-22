# Favicon.is

免费、快速的网站图标（favicon）API：`https://favicon.is/{domain}` 直接返回任意网站的图标图片。

本仓库是 Favicon.is 的 **Astro + TypeScript** 重构版本，运行在 **Cloudflare Workers** 上，图标文件存储在 **Cloudflare R2**。

## 功能

- **图标 API**：`/{domain}`，支持 `?size=16|32|48|64|128|256`、`?larger=true`（256 px）、`?original=true`（跳过 Google，直接解析网站 HTML）、`?download=1`。兼容旧版的所有 URL 格式（包括 `/https://example.com/page`）。
- **IANA TLD 校验**：只有后缀属于 [IANA Root Zone Database](https://www.iana.org/domains/root/db) 的域名才会被抓取，其余（`.local`、`.test`、拼写错误、IP 地址等）立即返回默认图标，不发起任何网络请求。数据在 `src/data/tlds.json`。
- **多级缓存**：Cloudflare 边缘缓存 → R2 持久存储（7 天后后台刷新）→ Google favicon 缓存 → 网站 HTML / `/favicon.ico`。失败结果缓存 1 小时。
- **Inspect API**：`/api/inspect?domain=` 返回网站声明的全部图标（link 标签、manifest、favicon.ico，含真实像素尺寸），为「Favicon 检测器」页面提供数据；每 IP 每分钟 30 次限流。
- **15 种语言**：English（默认，根路径）、简体中文 `/zh-hans/`、繁體中文 `/zh-hant/`、日本語 `/ja/`、Français `/fr/`、Español `/es/`、Deutsch `/de/`、한국어 `/ko/`、Italiano `/it/`、Português `/pt/`、Русский `/ru/`、Nederlands `/nl/`、Polski `/pl/`、Türkçe `/tr/`、हिन्दी `/hi/`。
- **页面**：首页（在线查询工具）、API 文档、集成示例、Favicon 检测器、热门网站图标、单站图标页 `/site/{domain}/`、支持的 TLD 列表、5 篇指南、FAQ、关于、隐私政策、服务条款。
- **SEO**：每页独立 title/description、canonical、hreflang（含 x-default）、Open Graph / Twitter Card、JSON-LD（Organization、WebSite、WebPage、BreadcrumbList、WebApplication、FAQPage、TechArticle、HowTo、Dataset、ImageObject…）、带 hreflang 的 sitemap、robots.txt。非精选域名的 `/site/` 页面为 `noindex`，避免低质量页面被收录。

## 目录结构

```
src/
  fetch.ts                  # Worker 入口：先处理 /{domain} 与 /api/inspect，其余交给 Astro
  lib/favicon/              # 图标抓取、R2 缓存、HTML 解析、inspect API
  lib/domain.ts, tlds.ts    # 域名规范化（含 IDN/punycode）与 IANA TLD 校验
  i18n/config.ts            # 语言列表
  i18n/locales/*.ts         # 界面文案（en.ts 为源，其余语言类型必须与之一致）
  content/guides/{locale}/  # 指南（Markdown）
  content/pages/{locale}/   # 关于 / 隐私 / 条款（Markdown）
  pages/[...lang]/          # 所有页面（英文在根路径，其他语言在 /{locale}/）
  data/popular.ts           # 热门网站列表（会生成可索引的 /site/ 页面）
  site.config.ts            # 站点常量：联系邮箱、统计、AdSense、页脚产品
scripts/
  update-tlds.mjs           # 从 IANA 更新 TLD 列表
  check-locales.mjs         # 校验所有语言文案的键、占位符、Markdown 结构
  generate-assets.mjs       # 生成 favicon.ico、apple-touch-icon、OG 图片
```

## 本地开发

需要 Node.js 22.18+。

```bash
npm install
npm run dev          # Astro 开发服务器（workerd 运行时，本地模拟 R2）
npm run preview      # 构建后用 wrangler 在本地运行生产包
npm run check        # TypeScript 检查
npm run check:locales
```

## 部署到 Cloudflare Workers

1. 登录 Cloudflare：

   ```bash
   npx wrangler login
   ```

2. 创建 R2 存储桶（名称需与 `wrangler.jsonc` 中的 `bucket_name` 一致）：

   ```bash
   npx wrangler r2 bucket create favicon-is
   ```

3. 构建并部署：

   ```bash
   npm run deploy
   ```

4. 绑定域名：在 `wrangler.jsonc` 中取消 `routes` 的注释（`favicon.is` 作为 Custom Domain），或在 Cloudflare 控制台 Workers → Settings → Domains & Routes 中添加。注意：边缘缓存（Cache API）只在自定义域名上生效，`*.workers.dev` 上不生效。

可在 `wrangler.jsonc` 的 `vars` 中调整：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `ICON_TTL` | `604800` | R2 中图标多久后在后台刷新（秒） |
| `FAILURE_TTL` | `3600` | 抓取失败的域名多久后重试（秒） |

可选：为 R2 存储桶设置生命周期规则，自动删除 `failures/` 前缀下超过 1 天的对象。

## 更新 IANA TLD 列表

```bash
npm run update:tlds
```

脚本优先抓取 IANA Root Zone Database 页面（跳过状态为 “Not assigned” 的已退役 TLD）；无法访问 iana.org 时，回退到每日从 IANA 数据生成的 `global-tld-list` 包。加 `-- --iana-only` 可禁止回退。

## 添加或修改翻译

- 界面文案：编辑 `src/i18n/locales/{locale}.ts`，结构必须与 `en.ts` 相同（TypeScript 会检查）。
- 长文：`src/content/guides/{locale}/*.md` 与 `src/content/pages/{locale}/*.md`。指向站内页面的链接请使用相对路径（如 `../../checker/`），这样每种语言都会链接到同语言页面。
- 运行 `npm run check:locales` 校验。
- 新增语言：在 `src/i18n/config.ts` 中添加，然后补齐上述文件。

## 上线前请确认

- `src/site.config.ts` 中的 `CONTACT_EMAIL`（目前为 `contact@favicon.is`，显示在关于/隐私/条款页面）。
- 统计脚本（stat.re）与 Google AdSense 已沿用原站配置，可在 `src/site.config.ts` 中关闭。
