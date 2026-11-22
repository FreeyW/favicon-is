---
title: Favicon boyutları 2026 – eksiksiz başvuru tablosu
description: Hangi favicon boyutları gerçekten gerekli? Tarayıcılar, Google Search, iOS, Android ve web uygulaması manifestleri için pratik bir simge boyutu listesi.
order: 2
updated: 2026-11-22
---

Tarayıcılar, işletim sistemleri ve arama motorları site simgelerini farklı boyutlarda gösterir. İyi haber şu: her yerde keskin görünmek için yalnızca birkaç dosyaya ihtiyacınız var.

## Kısa cevap

Neredeyse her web sitesi için şu set yeterlidir:

| Dosya | Boyut | Kullanan |
| --- | --- | --- |
| `favicon.ico` | 32×32 (16×16 ve 48×48 da içerebilir) | Tüm tarayıcılar, eski araçlar, otomatik `/favicon.ico` isteği |
| `icon.svg` | Ölçeklenebilir | Modern tarayıcılar; her boyutta keskin, karanlık modu destekleyebilir |
| `apple-touch-icon.png` | 180×180 | iPhone ve iPad ana ekranları |
| `icon-192.png` | 192×192 | Android ana ekranı, web uygulaması manifesti |
| `icon-512.png` | 512×512 | Android açılış ekranları, yüklenebilir web uygulamaları |

## Yaygın favicon boyutları ve kullanım alanları

| Boyut | Nerede görünür |
| --- | --- |
| 16×16 | Standart çözünürlüklü ekranlarda tarayıcı sekmeleri ve yer imleri |
| 32×32 | Yüksek çözünürlüklü ekranlarda tarayıcı sekmeleri, Windows görev çubuğu kısayolları |
| 48×48 | Windows site simgeleri; Google Search tarafından önerilen en küçük boyut |
| 96×96, 144×144 | Yüksek yoğunluklu ekranlarda Google Search (48'in katları) |
| 180×180 | iOS ve iPadOS için `apple-touch-icon` |
| 192×192 | Android Chrome ana ekranı ve manifest için en küçük boyut |
| 512×512 | PWA'larda açılış ekranları ve uygulama mağazaları için manifest simgesi |

## Google Search gereksinimleri

Google, arama sonuçlarında sayfalarınızın yanında favicon'unuzu gösterir. Google'ın yönergelerine göre simge **kare** olmalı, en az **48×48 piksel** (veya 96×96 ya da 144×144 gibi 48'in bir katı) boyutunda olmalı ve Googlebot'un taramasına izin verilen sabit bir URL'de erişilebilir olmalıdır. SVG dosyaları da kabul edilir. Çok küçük simgeler büyütülür ve bulanık görünebilir.

## Keskin simgeler için ipuçları

- **Önce en küçük boyut için tasarlayın.** 16×16 boyutunda yalnızca basit bir şekle ya da bir iki harfe yer vardır. İnce ayrıntıları ve ince çizgileri kaldırın.
- **Karenin tamamını kullanın.** Kenarlarında çok fazla boşluk bulunan simgeler sekmelerde küçücük görünür.
- **Açık ve koyu arka planlarda test edin.** Sekmeler, arama sonuçları ve ana ekranlar ikisini de kullanır.
- **iOS için düz bir arka plan kullanın.** iOS, `apple-touch-icon` içindeki saydam alanları siyahla doldurur.
- **Maskelenebilir simgeleri işaretleyin.** Android simgeleri daire veya yuvarlatılmış kare (squircle) biçiminde kırpabilir; güvenli alanı olan simgeler için manifestte `"purpose": "maskable"` kullanın.

## Favicon.is ile her boyutta simge almak

*Diğer* web sitelerinin simgelerini gösterirken tam olarak ihtiyacınız olan boyutu isteyin:

```text
https://favicon.is/github.com?size=32
https://favicon.is/github.com?size=64
https://favicon.is/github.com?larger=true
```

Desteklenen değerler 16, 32, 48, 64, 128 ve 256 pikseldir. Bir sitenin simgesi, sitenin yayımladığı en büyük simgeden daha keskin olamaz; bu yüzden [favicon kontrol aracıyla](../../checker/) kontrol edin.
