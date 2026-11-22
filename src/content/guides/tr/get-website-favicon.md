---
title: Herhangi bir web sitesinin favicon'u nasıl alınır?
description: Bir sitenin favicon'unu almanın beş yolu – /favicon.ico ve sayfa HTML kodundan favicon API'lerine kadar – kod örnekleri, artıları ve eksileriyle.
order: 5
updated: 2026-11-22
---

İster bir yer imi yöneticisi, ister link-in-bio sayfası, pano ya da tarayıcı uzantısı geliştiriyor olun, er ya da geç diğer web sitelerinin simgelerine ihtiyaç duyarsınız. İşte en zahmetliden en kolaya doğru seçenekler.

## 1. /favicon.ico isteyin

En eski gelenek: birçok site hâlâ kök dizinde bir simge sunar.

```text
https://example.com/favicon.ico
```

**Artıları:** üçüncü taraf yok. **Eksileri:** sitelerin büyük bir kısmında bu dosya yoktur, çoğu zaman yalnızca 16×16 veya 32×32 pikseldir ve dosya eksik olduğunda bozuk bir görsel alırsınız.

## 2. Sayfanın HTML kodunu okuyun

Güvenilir yol, ana sayfayı indirip `<link rel="icon">`, `<link rel="apple-touch-icon">` etiketlerini ve web uygulaması manifestini aramak, ardından en iyi boyutu seçmektir.

```js
const html = await fetch('https://example.com').then((r) => r.text());
const links = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
```

**Artıları:** sitenin gerçekten tanımladığı simgeyi bulur. **Eksileri:** yönlendirmeleri, göreli URL'leri, zaman aşımlarını, botları engelleyen siteleri, önbelleği ve yedekleri kendiniz yönetmeniz gerekir – üstelik CORS nedeniyle bunu tarayıcıdan yapamazsınız.

## 3. Tarayıcı uzantısı API'lerini kullanın

Chrome uzantıları, tarayıcının zaten bildiği simgeleri almak için `favicon` iznini ve `chrome-extension://<id>/_favicon/?pageUrl=…` adresini kullanabilir. Bu yöntem yalnızca bir uzantının içinde ve yalnızca kullanıcının ziyaret ettiği siteler için çalışır.

## 4. Bir arama motorunun favicon hizmetini kullanın

Google ve DuckDuckGo, tarama sırasında topladıkları simgeleri dışarıya sunar:

```text
https://www.google.com/s2/favicons?domain=example.com&sz=64
https://icons.duckduckgo.com/ip3/example.com.ico
```

**Artıları:** hızlı ve geniş kapsamlı. **Eksileri:** resmî değil ve belgelenmemiş; boyut ve format üzerinde sınırlı kontrol; ne döndürüldüğüne dair hiçbir bilgi yok.

## 5. Favicon.is kullanın

Favicon.is, yukarıdakilerin hepsini tek bir URL'nin arkasında birleştirir. Google'ın favicon önbelleğini kontrol eder, sitenin HTML kodunu okur, `/favicon.ico` dosyasını dener, sonucu Cloudflare R2'de depolar ve her zaman bir görsel döndürür:

```html
<img src="https://favicon.is/example.com" width="32" height="32" alt="">
```

- `?size=16` ile `?size=256` arasında bir boyut seçin veya `?larger=true` kullanın.
- Google'ı atlayıp sitenin kendi simge tanımlarını okumak için `?original=true` kullanın.
- Simgenin nereden geldiğini görmek için `X-Source` başlığını kontrol edin.
- Yalnızca IANA Kök Bölge Veritabanındaki bir TLD'ye sahip alan adları sorgulanır; bu nedenle yazım hataları ve özel adlar anında varsayılan simgeyi döndürür.

Tüm seçenekler için [API belgelerine](../../docs/) bakın veya [örneklerden](../../examples/) bir kod parçacığı kopyalayın.
