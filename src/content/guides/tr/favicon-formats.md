---
title: "Favicon formatları: ICO, PNG ve SVG karşılaştırması"
description: ICO, PNG, SVG, GIF ve WebP favicon formatlarını karşılaştırın; tarayıcı desteğini ve bugün hangi kombinasyonu kullanmanız gerektiğini öğrenin.
order: 3
updated: 2026-11-22
---

Bir favicon birkaç farklı görsel formatında kaydedilebilir. Her birinin güçlü yanları vardır ve en iyi kurulum bunlardan iki ya da üçünü bir arada kullanır.

## ICO

Orijinal favicon formatı. Bir `.ico` dosyası, farklı boyutlarda birkaç bitmap barındırabilen bir kapsayıcıdır (örneğin 16×16, 32×32 ve 48×48); böylece işletim sistemi doğru olanı seçebilir.

- **Artıları:** bugüne kadar yapılmış her tarayıcı tarafından desteklenir; `/favicon.ico` adresinden otomatik olarak istenir; birkaç boyut için tek dosya yeterlidir.
- **Eksileri:** dosya boyutu daha büyüktür; vektörel ölçekleme yoktur; oluşturmak için özel bir araç gerekir.

**Ne için kullanılır:** sitenizin kök dizinindeki tek bir `favicon.ico` için, esas olarak uyumluluk amacıyla.

## PNG

PNG, günümüzde favicon'lar için en yaygın formattır. Saydamlığı destekler ve iyi sıkıştırılır.

- **Artıları:** evrensel destek; her tasarım aracından kolayca dışa aktarılır; 180×180 `apple-touch-icon` ile 192×192 ve 512×512 manifest simgeleri için idealdir.
- **Eksileri:** her boyut ayrı bir dosyadır; piksel boyutunun ötesine ölçeklenmez.

**Ne için kullanılır:** dokunmatik simgeler (touch icon), manifest simgeleri ve SVG'yi desteklemeyen tarayıcılar için yedek olarak.

## SVG

SVG vektörel bir formattır; bu nedenle tek bir küçük dosya her boyutta ve her ekran yoğunluğunda keskin kalır.

- **Artıları:** her yerde kusursuz netlik; çok küçük dosya boyutu; CSS medya sorgularıyla karanlık moda tepki verebilir.
- **Eksileri:** tarayıcı desteği henüz evrensel değildir, bu yüzden bir ICO veya PNG yedeği bulundurun; çok ayrıntılı logolar 16×16 için yine de sadeleştirilmiş bir sürüm gerektirebilir.

Kullanıcı koyu temayı tercih ettiğinde bir SVG favicon renk değiştirebilir:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    path { fill: #0f172a; }
    @media (prefers-color-scheme: dark) { path { fill: #f8fafc; } }
  </style>
  <path d="M4 4h24v24H4z"/>
</svg>
```

## GIF, JPEG ve WebP

Bu formatlar çoğu modern tarayıcıda çalışır, ancak simgeler için pek az avantaj sunar. GIF animasyonu destekler; ancak animasyonlu favicon'lar dikkat dağıtır ve her yerde gösterilmez. JPEG saydamlığı desteklemez. WebP ve AVIF verimlidir, ancak favicon okuyan her platform tarafından desteklenmez.

## Hangi formatları kullanmalısınız?

Bugün en güvenilir kombinasyon şudur:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

SVG'yi anlayan tarayıcılar `icon.svg` dosyasını kullanır; diğerleri `favicon.ico` dosyasına geri döner.

## Favicon.is hangi formatı döndürür?

Favicon.is, simgeyi web sitesinin sağladığı formatta döndürür. Çoğu durumda bu PNG'dir, ancak ICO, SVG, JPEG, GIF veya WebP de olabilir. `Content-Type` yanıt başlığı hangisini aldığınızı her zaman belirtir ve her format normal bir `<img>` etiketinde çalışır.
