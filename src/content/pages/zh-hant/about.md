---
title: "關於 Favicon.is"
description: "Favicon.is 是一個免費的網站圖示 API，只要一個網址就能回傳任何網站的圖示。瞭解它適合誰、如何運作以及背後的技術。"
updated: 2026-11-22
---

Favicon.is 是一項免費服務，只要一個網址就能回傳任何網站的圖示。在 `https://favicon.is/` 後面加上網域，就能以圖片形式取得該網站的圖示，可直接用於 `<img>` 標籤。

## 適合對象

- **開發者**：需要顯示連結、書籤或整合服務，想要容易辨識的圖示，又不想自行爬取網站。
- **設計師**：需要在幾秒內取得知名網站的 Logo，用於設計稿。
- **網站管理員**：想檢查自己的網站圖示看起來如何，以及各種尺寸是否齊全。

## 運作方式

每個請求都會經過一段簡短的處理流程。我們會先將輸入正規化，確認網域是否以 IANA 根區域資料庫中的頂級網域結尾，接著依序在邊緣快取、我們的儲存空間與 Google 網站圖示快取中尋找圖示，最後才到網站本身尋找。最佳結果會被儲存並從邊緣網路提供，因此下一次請求幾乎是瞬間完成。

如果圖示不存在，您會取得中性的預設圖示，而不是破圖。

## 技術

本網站使用 [Astro](https://astro.build) 與 TypeScript 建置。API 與頁面在全球各地資料中心的 [Cloudflare Workers](https://workers.cloudflare.com) 上執行，圖示則儲存在 [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/)。支援的頂級網域清單來自 [IANA 根區域資料庫](https://www.iana.org/domains/root/db)。

## 負責任的使用

Favicon.is 只擷取公開可用的圖示，會以清楚的 User-Agent 表明身分，且每個圖示的每種尺寸最多只儲存一份副本。Logo 仍屬於其擁有者。如果您是網站擁有者，希望從我們的快取中移除該網站的圖示，請透過下方的聯絡方式與我們聯絡。

## 致謝

Favicon.is 的靈感來自 Favicon.im，它屬於一系列小巧免費的網路工具，這些工具都列在每個頁面的底部。
