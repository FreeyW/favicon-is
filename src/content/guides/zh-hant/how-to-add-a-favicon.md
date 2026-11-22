---
title: "如何為網站加入 Favicon 圖示（逐步教學）"
description: "為任何網站加入 Favicon 圖示的逐步指南，包含 HTML 標籤、Web 應用程式資訊清單、Apple 觸控圖示，以及網站圖示未更新時的解決方法。"
order: 4
updated: 2026-11-22
---

加入網站圖示大約只需要十分鐘。本指南將帶您逐步建立檔案、加入 HTML 並檢查結果。

## 1. 準備原始圖片

先準備一張至少 **512×512 像素**的正方形圖片，最好是 Logo 的向量（SVG）版本。請將它簡化：在 16 像素下，文字與細線條都會消失。許多品牌會使用單一字母或符號作為網站圖示。

## 2. 建立圖示檔案

從設計工具或網站圖示產生器匯出以下檔案：

- `favicon.ico`：32×32（可選擇一併包含 16×16 與 48×48）
- `icon.svg`：可縮放的版本
- `apple-touch-icon.png`：180×180，使用實色背景
- `icon-192.png` 與 `icon-512.png`：供 Web 應用程式資訊清單使用

將它們放在網站的根資料夾（與首頁相同的資料夾）。

## 3. 加入 HTML 標籤

將以下程式碼貼到每個頁面的 `<head>` 中：

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

大多數框架與架站工具都有專門放置這些內容的地方：Astro、Next.js 與 Vite 專案中的 `public` 資料夾、WordPress 的「網站識別」（Site Identity）設定，或 Shopify 的佈景主題設定。

## 4. 加入 Web 應用程式資訊清單

在圖示旁建立 `manifest.webmanifest`：

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

## 5. 檢查結果

在新的瀏覽器分頁中開啟您的網站，然後使用 [Favicon.is 檢查工具](../../checker/)檢查。它會列出頁面宣告的所有圖示、確認檔案能否載入，並告訴您缺少哪些尺寸。

## 疑難排解：網站圖示沒有更新

瀏覽器對網站圖示的快取非常積極。如果您已經換了圖示，卻仍看到舊的：

- 在網址中加上版本號，例如 `/icon.svg?v=2`，並更新 `<link>` 標籤。
- 直接開啟圖示網址並強制重新整理。
- 清除瀏覽器快取，或在無痕視窗中測試。
- 搜尋引擎需要重新檢索您的首頁，這可能需要數天甚至數週。

## 額外技巧：顯示其他網站的圖示

如果您的應用程式會列出其他網站的連結，可以使用 Favicon.is，而不必自行代管這些圖示：

```html
<img src="https://favicon.is/example.com?size=32" width="16" height="16" alt="">
```
