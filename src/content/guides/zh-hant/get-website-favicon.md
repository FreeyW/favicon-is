---
title: "如何取得任何網站的 Favicon 圖示"
description: "取得網站 Favicon 圖示的五種方法：從 /favicon.ico、網頁 HTML 到 Favicon API，附程式碼範例與各自的優缺點。"
order: 5
updated: 2026-11-22
---

無論您是在打造書籤管理工具、Link-in-bio 頁面、儀表板還是瀏覽器擴充功能，遲早都會需要其他網站的圖示。以下列出各種做法，從最費工到最簡單。

## 1. 請求 /favicon.ico

最古老的慣例：許多網站仍會在根目錄提供圖示。

```text
https://example.com/favicon.ico
```

**優點：** 不需要第三方。**缺點：** 有相當多的網站沒有這個檔案，而且通常只有 16×16 或 32×32 像素，檔案不存在時還會出現破圖。

## 2. 讀取網頁 HTML

可靠的做法是下載首頁，尋找 `<link rel="icon">`、`<link rel="apple-touch-icon">` 與 Web 應用程式資訊清單，然後挑選最合適的尺寸。

```js
const html = await fetch('https://example.com').then((r) => r.text());
const links = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
```

**優點：** 能找到網站實際宣告的圖示。**缺點：** 您必須自行處理重新導向、相對網址、逾時、封鎖機器人的網站、快取與備援；而且因為 CORS 的關係，無法在瀏覽器中執行。

## 3. 使用瀏覽器擴充功能 API

Chrome 擴充功能可以使用 `favicon` 權限與 `chrome-extension://<id>/_favicon/?pageUrl=…`，取得瀏覽器已知的圖示。這只能在擴充功能中使用，且僅限使用者造訪過的網站。

## 4. 使用搜尋引擎的網站圖示服務

Google 與 DuckDuckGo 會公開它們在檢索過程中收集的圖示：

```text
https://www.google.com/s2/favicons?domain=example.com&sz=64
https://icons.duckduckgo.com/ip3/example.com.ico
```

**優點：** 速度快、涵蓋範圍廣。**缺點：** 非官方且沒有文件，對尺寸與格式的控制有限，也無法得知回傳內容的任何資訊。

## 5. 使用 Favicon.is

Favicon.is 將上述所有做法整合在一個網址背後。它會檢查 Google 網站圖示快取、讀取網站的 HTML、嘗試 `/favicon.ico`，將結果儲存在 Cloudflare R2，而且一定會回傳圖片：

```html
<img src="https://favicon.is/example.com" width="32" height="32" alt="">
```

- 使用 `?size=16` 到 `?size=256` 選擇尺寸，或使用 `?larger=true`。
- 使用 `?original=true` 略過 Google，讀取網站本身的圖示宣告。
- 檢查 `X-Source` 標頭，瞭解圖示的來源。
- 只會查詢頂級網域列於 IANA 根區域資料庫的網域，因此拼字錯誤與私有名稱會立即回傳預設圖示。

請參閱 [API 文件](../../docs/)瞭解所有選項，或從[範例](../../examples/)中複製程式碼片段。
