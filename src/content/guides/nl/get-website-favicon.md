---
title: Zo haal je het favicon van elke website op
description: Vijf manieren om het favicon van een website op te halen – van /favicon.ico en de pagina-HTML tot favicon-API’s – met codevoorbeelden en voor- en nadelen.
order: 5
updated: 2026-11-22
---

Of je nu een bladwijzerbeheerder, een link-in-bio-pagina, een dashboard of een browserextensie bouwt: vroeg of laat heb je de iconen van andere websites nodig. Dit zijn de opties, van de meest handmatige tot de makkelijkste.

## 1. Vraag /favicon.ico op

De oudste conventie: veel sites bieden nog steeds een icoon aan in de root.

```text
https://example.com/favicon.ico
```

**Voordelen:** geen derde partij. **Nadelen:** een groot deel van de sites heeft dit bestand niet, het is vaak maar 16×16 of 32×32 pixels, en als het ontbreekt krijg je een kapotte afbeelding.

## 2. Lees de HTML van de pagina

De betrouwbare manier is de homepage te downloaden, te zoeken naar `<link rel="icon">`, `<link rel="apple-touch-icon">` en het webapp-manifest, en dan de beste grootte te kiezen.

```js
const html = await fetch('https://example.com').then((r) => r.text());
const links = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
```

**Voordelen:** vindt het icoon dat de site echt declareert. **Nadelen:** redirects, relatieve URL’s, time-outs, sites die bots blokkeren, caching en fallbacks moet je allemaal zelf afhandelen – en vanwege CORS kan het niet vanuit een browser.

## 3. Gebruik de API’s voor browserextensies

Chrome-extensies kunnen de machtiging `favicon` en `chrome-extension://<id>/_favicon/?pageUrl=…` gebruiken om iconen op te halen die de browser al kent. Dit werkt alleen binnen een extensie en alleen voor sites die de gebruiker al heeft bezocht.

## 4. Gebruik de faviconservice van een zoekmachine

Google en DuckDuckGo stellen de iconen beschikbaar die ze tijdens het crawlen verzamelen:

```text
https://www.google.com/s2/favicons?domain=example.com&sz=64
https://icons.duckduckgo.com/ip3/example.com.ico
```

**Voordelen:** snel en een brede dekking. **Nadelen:** onofficieel en ongedocumenteerd, weinig controle over grootte en formaat, en geen informatie over wat er is teruggegeven.

## 5. Gebruik Favicon.is

Favicon.is combineert al het bovenstaande achter één URL. Het controleert de favicon-cache van Google, leest de HTML van de site, probeert `/favicon.ico`, slaat het resultaat op in Cloudflare R2 en geeft altijd een afbeelding terug:

```html
<img src="https://favicon.is/example.com" width="32" height="32" alt="">
```

- Kies een grootte met `?size=16` tot `?size=256`, of gebruik `?larger=true`.
- Gebruik `?original=true` om Google over te slaan en de icoondeclaraties van de site zelf te lezen.
- Controleer de header `X-Source` om te zien waar het icoon vandaan komt.
- Alleen domeinen met een TLD uit de IANA Root Zone Database worden opgezocht, dus typefouten en privénamen krijgen meteen het standaardicoon.

Bekijk de [API-documentatie](../../docs/) voor alle opties, of kopieer een snippet uit de [voorbeelden](../../examples/).
