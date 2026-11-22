---
title: Favicon.is hakkında
description: Favicon.is, her sitenin simgesini tek bir URL ile döndüren ücretsiz bir favicon API'sidir. Kimler için olduğunu, nasıl çalıştığını ve teknolojisini öğrenin.
updated: 2026-11-22
---

Favicon.is, herhangi bir web sitesinin favicon'unu tek bir URL ile döndüren ücretsiz bir hizmettir. `https://favicon.is/` adresinin sonuna bir alan adı ekleyin; sitenin simgesini, bir `<img>` etiketinde kullanılmaya hazır bir görsel olarak alın.

## Kimler için?

- Bağlantılar, yer imleri veya entegrasyonlar gösteren ve web sitelerini taramadan tanınabilir simgeler isteyen **geliştiriciler**.
- Bir maket (mock-up) için tanınmış bir sitenin logosuna saniyeler içinde ihtiyaç duyan **tasarımcılar**.
- Kendi favicon'larının nasıl göründüğünü ve tüm boyutların yerinde olup olmadığını kontrol etmek isteyen **site yöneticileri**.

## Nasıl çalışır?

Her istek kısa bir işlem hattından geçer. Girdiyi normalleştirir, alan adının IANA Kök Bölge Veritabanındaki bir üst düzey alan adıyla bittiğini kontrol eder, ardından simgeyi edge önbelleğimizde, depolama alanımızda, Google'ın favicon önbelleğinde ve son olarak web sitesinin kendisinde ararız. En iyi sonuç depolanır ve edge üzerinden sunulur; böylece bir sonraki istek neredeyse anında yanıtlanır.

Hiç simge yoksa bozuk bir görsel yerine nötr bir varsayılan simge alırsınız.

## Teknoloji

Web sitesi [Astro](https://astro.build) ve TypeScript ile geliştirilmiştir. API ve sayfalar, dünyanın dört bir yanındaki veri merkezlerinde [Cloudflare Workers](https://workers.cloudflare.com) üzerinde çalışır; simgeler ise [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/) üzerinde depolanır. Desteklenen TLD listesi [IANA Kök Bölge Veritabanından](https://www.iana.org/domains/root/db) gelir.

## Sorumlu kullanım

Favicon.is yalnızca herkese açık simgeleri getirir, kendini açık bir user agent ile tanıtır ve her simge ve boyut için en fazla bir kopya depolar. Logolar sahiplerinin mülkiyetinde kalır. Bir web sitesinin sahibiyseniz ve simgesinin önbelleğimizden kaldırılmasını istiyorsanız aşağıdaki iletişim bilgilerini kullanarak bize ulaşın.

## Teşekkürler

Favicon.is, Favicon.im'den ilham almıştır ve her sayfanın altında listelenen küçük, ücretsiz web araçlarından oluşan bir ailenin parçasıdır.
