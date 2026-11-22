---
title: Favicon nedir? Site simgelerine kısa bir rehber
description: Favicon nedir, tarayıcılar ve arama motorları onu nerede gösterir, markanız için neden önemlidir ve tarayıcılar onu nasıl bulur? Hepsini öğrenin.
order: 1
updated: 2026-11-22
---

**Favicon** (*favorite icon*, yani “sık kullanılanlar simgesi” ifadesinin kısaltması), bir web sitesini temsil eden küçük görseldir. Onu tarayıcı sekmelerinde, yer imlerinizde ve geçmişinizde, adres çubuğunda, arama sonuçlarının yanında ve bir siteyi kısayol olarak kaydettiğinizde telefonunuzun ana ekranında görürsünüz.

## Favicon'lar nerede görünür?

- **Tarayıcı sekmeleri.** Çok sayıda sekme açıkken onları birbirinden ayıran çoğu zaman yalnızca simgedir.
- **Yer imleri ve geçmiş.** Simgeler, uzun listelerin tek bakışta taranabilmesini sağlar.
- **Arama sonuçları.** Google ve diğer arama motorları, mobilde ve masaüstünde site adınızın yanında favicon'u gösterir.
- **Ana ekranlar ve uygulama başlatıcılar.** Biri sitenizi telefonuna eklediğinde dokunmatik simge (touch icon) uygulama simgesine dönüşür.
- **Diğer uygulamalar.** Sohbet uygulamaları, sonra-oku hizmetleri, parola yöneticileri ve panolar bağlantıları etiketlemek için favicon'ları kullanır.

## Kısa bir tarihçe

Favicon'lar 1999'da Internet Explorer 5 ile hayatımıza girdi. Tarayıcı, bir web sitesinin kök dizininde `favicon.ico` adlı bir dosya arar ve onu *Favorites* (Sık Kullanılanlar) menüsünde gösterirdi; adı da buradan gelir. Daha sonra HTML diline `<link rel="icon">` etiketi eklendi ve siteler simgelerinin konumunu, formatını ve boyutunu kendileri seçebilir hâle geldi.

Bugün tek bir web sitesi genellikle birkaç simgeyle birlikte gelir: sekmeler için küçük bir ICO veya PNG, her boyuta ölçeklenen bir SVG, iOS için bir `apple-touch-icon` ve Android için bir web uygulaması manifestinde listelenen daha büyük PNG dosyaları.

## Favicon'lar neden önemlidir?

1. **Tanınırlık.** Net bir simge, insanların onlarca sekme arasından sizinkini bulmasına yardımcı olur ve markanıza güven oluşturur.
2. **Profesyonel görünüm.** Favicon eksik olduğunda genel bir yer tutucu görünür ve site bitmemiş gibi durur.
3. **Arama görünürlüğü.** Arama motorları sonuçlarda favicon'ları gösterir ve ayırt edici bir simge tıklama oranını artırabilir.
4. **Daha az hata.** Tarayıcılar `/favicon.ico` dosyasını otomatik olarak ister. Bu dosya yoksa sunucu günlükleriniz 404 hatalarıyla dolar.

## Tarayıcılar favicon'u nasıl bulur?

Bir sayfa yüklendiğinde tarayıcı, `<head>` bölümünde `rel` özniteliği `icon` içeren `<link>` etiketlerini okur. `sizes` ve `type` özniteliklerine ve çizim yaptığı ekrana göre en uygun adayı seçer. Hiçbir tanım yoksa `https://example.com/favicon.ico` adresine geri döner.

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Herhangi bir web sitesinin favicon'unu almak

Diğer web sitelerine bağlantılar gösteren bir ürün geliştiriyorsanız her siteyi kendiniz taramanıza gerek yok. Favicon.is, tek bir URL ile herhangi bir alan adının simgesini döndürür:

```html
<img src="https://favicon.is/wikipedia.org" width="32" height="32" alt="Wikipedia">
```

Sırada: [hangi boyutlara ihtiyacınız olduğunu](../favicon-sizes/) ve [hangi dosya formatlarını kullanmanız gerektiğini](../favicon-formats/) öğrenin.
