---
title: "網站圖示格式：ICO、PNG 與 SVG 比較解析"
description: "比較 ICO、PNG、SVG、GIF 與 WebP 等 Favicon 格式，瞭解各瀏覽器的支援情況，以及現在該採用哪種組合。"
order: 3
updated: 2026-11-22
---

網站圖示可以儲存為多種圖片格式。每種格式各有優點，最理想的做法是組合使用其中兩到三種。

## ICO

最早的網站圖示格式。`.ico` 檔案是一種容器，可以容納多張不同尺寸的點陣圖，例如 16×16、32×32 與 48×48，讓作業系統挑選合適的一張。

- **優點：** 有史以來所有瀏覽器都支援；會在 `/favicon.ico` 被自動請求；單一檔案即可包含多種尺寸。
- **缺點：** 檔案較大；無法向量縮放；需要專用工具才能製作。

**適用情境：** 在網站根目錄放置一個 `favicon.ico`，主要是為了相容性。

## PNG

PNG 是目前最常見的網站圖示格式。它支援透明背景，壓縮效果也很好。

- **優點：** 普遍支援；可從任何設計工具輕鬆匯出；非常適合 180×180 的 `apple-touch-icon`，以及 192×192 與 512×512 的資訊清單圖示。
- **缺點：** 每種尺寸都是獨立檔案；無法縮放到超出本身的像素尺寸。

**適用情境：** 觸控圖示、資訊清單圖示，以及作為不支援 SVG 之瀏覽器的備援。

## SVG

SVG 是向量格式，因此一個小檔案就能在任何尺寸與任何螢幕密度下保持清晰。

- **優點：** 在任何地方都清晰銳利；檔案極小；可透過 CSS 媒體查詢配合深色模式變化。
- **缺點：** 瀏覽器支援尚未全面普及，因此請保留 ICO 或 PNG 作為備援；細節繁複的 Logo 可能仍需要一個 16×16 用的簡化版本。

當使用者偏好深色主題時，SVG 網站圖示可以切換顏色：

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    path { fill: #0f172a; }
    @media (prefers-color-scheme: dark) { path { fill: #f8fafc; } }
  </style>
  <path d="M4 4h24v24H4z"/>
</svg>
```

## GIF、JPEG 與 WebP

這些格式在大多數新式瀏覽器中都能使用，但用於圖示的優勢不多。GIF 支援動畫，不過動態網站圖示容易讓人分心，也不是所有地方都會顯示。JPEG 不支援透明背景。WebP 與 AVIF 效率很高，但並非所有讀取網站圖示的平台都支援。

## 應該使用哪些格式？

目前最可靠的組合是：

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

支援 SVG 的瀏覽器會使用 `icon.svg`；其他瀏覽器則會改用 `favicon.ico`。

## Favicon.is 會回傳什麼格式？

Favicon.is 會以網站提供的格式回傳圖示。大多數情況下是 PNG，但也可能是 ICO、SVG、JPEG、GIF 或 WebP。`Content-Type` 回應標頭一律會告訴您收到的是哪一種，而且每種格式都能在一般的 `<img>` 標籤中使用。
