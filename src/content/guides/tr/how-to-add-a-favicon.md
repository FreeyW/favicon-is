---
title: Web sitesine favicon nasıl eklenir? Adım adım rehber
description: "Adım adım favicon ekleme: HTML etiketleri, web uygulaması manifesti, Apple touch icon'lar ve güncellenmeyen bir favicon'u düzeltme yöntemleri."
order: 4
updated: 2026-11-22
---

Favicon eklemek yaklaşık on dakika sürer. Bu rehber; dosyaları oluşturma, HTML kodunu ekleme ve sonucu kontrol etme adımlarında size yol gösterir.

## 1. Kaynak görselinizi hazırlayın

En az **512×512 piksel** boyutunda kare bir görselle başlayın; ideal olarak logonuzun vektörel (SVG) bir sürümüyle. Görseli sadeleştirin: 16 pikselde metinler ve ince çizgiler kaybolur. Birçok marka favicon için tek bir harf veya sembol kullanır.

## 2. Simge dosyalarını oluşturun

Tasarım aracınızdan veya bir favicon oluşturucudan şu dosyaları dışa aktarın:

- `favicon.ico` – 32×32 (isteğe bağlı olarak içinde 16×16 ve 48×48 ile)
- `icon.svg` – ölçeklenebilir sürüm
- `apple-touch-icon.png` – düz arka planlı 180×180
- `icon-192.png` ve `icon-512.png` – web uygulaması manifesti için

Bunları web sitenizin kök klasörüne (ana sayfanızla aynı klasöre) koyun.

## 3. HTML etiketlerini ekleyin

Şu satırları her sayfanın `<head>` bölümüne yapıştırın:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Çoğu framework ve site oluşturucuda bunun için ayrılmış bir yer vardır: Astro, Next.js ve Vite projelerinde `public` klasörü, WordPress'te Site Kimliği (Site Identity) ayarları, Shopify'da ise tema ayarları.

## 4. Web uygulaması manifesti ekleyin

Simgelerinizin yanına `manifest.webmanifest` dosyasını oluşturun:

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

## 5. Sonucu kontrol edin

Sitenizi yeni bir tarayıcı sekmesinde açın, ardından [Favicon.is kontrol aracından](../../checker/) geçirin. Araç, sayfanızın tanımladığı tüm simgeleri listeler, dosyaların yüklenip yüklenmediğini kontrol eder ve hangi boyutların eksik olduğunu söyler.

## Sorun giderme: favicon'um güncellenmiyor

Tarayıcılar favicon'ları çok agresif biçimde önbelleğe alır. Simgenizi değiştirdiyseniz ama hâlâ eskisini görüyorsanız:

- URL'ye bir sürüm ekleyin (örneğin `/icon.svg?v=2`) ve `<link>` etiketlerini güncelleyin.
- Simge URL'sini doğrudan açın ve sayfayı yeniden yüklemeye zorlayın.
- Tarayıcı önbelleğini temizleyin veya gizli pencerede test edin.
- Arama motorlarının ana sayfanızı yeniden taraması gerekir; bu günler, hatta haftalar sürebilir.

## Bonus: diğer web sitelerinin favicon'larını gösterin

Uygulamanız diğer sitelere bağlantılar listeliyorsa, onların simgelerini kendiniz barındırmak yerine Favicon.is kullanın:

```html
<img src="https://favicon.is/example.com?size=32" width="16" height="16" alt="">
```
