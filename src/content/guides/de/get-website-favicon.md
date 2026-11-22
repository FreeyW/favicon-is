---
title: So bekommst du das Favicon jeder Website
description: Fünf Wege zum Favicon einer Website – von /favicon.ico über das HTML der Seite bis zu Favicon-APIs – mit Codebeispielen sowie Vor- und Nachteilen.
order: 5
updated: 2026-11-22
---

Ob du einen Lesezeichen-Manager, eine Link-in-Bio-Seite, ein Dashboard oder eine Browser-Erweiterung baust – früher oder später brauchst du die Icons anderer Websites. Hier sind die Möglichkeiten, von der aufwendigsten bis zur einfachsten.

## 1. /favicon.ico abfragen

Die älteste Konvention: Viele Websites stellen noch immer ein Icon im Stammverzeichnis bereit.

```text
https://example.com/favicon.ico
```

**Vorteile:** kein Drittanbieter. **Nachteile:** Ein großer Teil der Websites hat diese Datei nicht, sie ist oft nur 16×16 oder 32×32 Pixel groß, und wenn sie fehlt, bekommst du ein kaputtes Bild.

## 2. Das HTML der Seite auslesen

Der zuverlässige Weg: Lade die Startseite herunter, suche nach `<link rel="icon">`, `<link rel="apple-touch-icon">` und dem Web-App-Manifest und wähle dann die beste Größe.

```js
const html = await fetch('https://example.com').then((r) => r.text());
const links = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
```

**Vorteile:** findet das Icon, das die Website tatsächlich deklariert. **Nachteile:** Um Weiterleitungen, relative URLs, Timeouts, Websites, die Bots blockieren, Caching und Fallbacks musst du dich selbst kümmern – und wegen CORS geht das nicht direkt im Browser.

## 3. Die APIs für Browser-Erweiterungen nutzen

Chrome-Erweiterungen können die Berechtigung `favicon` und `chrome-extension://<id>/_favicon/?pageUrl=…` verwenden, um Icons abzurufen, die der Browser bereits kennt. Das funktioniert nur innerhalb einer Erweiterung und nur für Websites, die der Nutzer schon besucht hat.

## 4. Den Favicon-Dienst einer Suchmaschine nutzen

Google und DuckDuckGo stellen die Icons bereit, die sie beim Crawlen sammeln:

```text
https://www.google.com/s2/favicons?domain=example.com&sz=64
https://icons.duckduckgo.com/ip3/example.com.ico
```

**Vorteile:** schnell und mit breiter Abdeckung. **Nachteile:** inoffiziell und undokumentiert, wenig Kontrolle über Größe und Format und keine Informationen darüber, was zurückgegeben wurde.

## 5. Favicon.is verwenden

Favicon.is vereint all das hinter einer einzigen URL. Der Dienst prüft den Favicon-Cache von Google, liest das HTML der Website aus, versucht es mit `/favicon.ico`, speichert das Ergebnis in Cloudflare R2 und liefert immer ein Bild:

```html
<img src="https://favicon.is/example.com" width="32" height="32" alt="">
```

- Wähle mit `?size=16` bis `?size=256` eine Größe oder nutze `?larger=true`.
- Mit `?original=true` überspringst du Google und liest die Icon-Deklarationen der Website selbst aus.
- Am Header `X-Source` siehst du, woher das Icon stammt.
- Es werden nur Domains mit einer TLD aus der IANA Root Zone Database abgefragt – Tippfehler und private Namen liefern also sofort das Standard-Icon.

In der [API-Dokumentation](../../docs/) findest du alle Optionen, oder du kopierst ein Snippet aus den [Beispielen](../../examples/).
