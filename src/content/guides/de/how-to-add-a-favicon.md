---
title: "Favicon zur Website hinzufügen: Schritt-für-Schritt-Anleitung"
description: So fügst du einer Website ein Favicon hinzu – mit HTML-Tags, Web-App-Manifest, Apple Touch Icons und Hilfe, wenn sich das Favicon nicht aktualisiert.
order: 4
updated: 2026-11-22
---

Ein Favicon hinzuzufügen dauert etwa zehn Minuten. Diese Anleitung führt dich durch das Erstellen der Dateien, das Einfügen des HTML-Codes und das Prüfen des Ergebnisses.

## 1. Ausgangsbild vorbereiten

Beginne mit einem quadratischen Bild von mindestens **512×512 Pixeln**, idealerweise einer Vektorversion (SVG) deines Logos. Vereinfache es: Bei 16 Pixeln verschwinden Text und dünne Linien. Viele Marken verwenden für das Favicon einen einzelnen Buchstaben oder ein Symbol.

## 2. Icon-Dateien erstellen

Exportiere diese Dateien aus deinem Design-Tool oder einem Favicon-Generator:

- `favicon.ico` – 32×32 (optional mit 16×16 und 48×48 darin)
- `icon.svg` – die skalierbare Version
- `apple-touch-icon.png` – 180×180 mit deckendem Hintergrund
- `icon-192.png` und `icon-512.png` – für das Web-App-Manifest

Lege sie im Stammverzeichnis deiner Website ab (im selben Ordner wie deine Startseite).

## 3. HTML-Tags einfügen

Füge diese Zeilen in den `<head>` jeder Seite ein:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Die meisten Frameworks und Website-Baukästen haben dafür einen eigenen Ort: den Ordner `public` in Astro-, Next.js- und Vite-Projekten, die Einstellungen zur Website-Identität in WordPress oder die Theme-Einstellungen in Shopify.

## 4. Web-App-Manifest hinzufügen

Lege `manifest.webmanifest` neben deinen Icons an:

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

## 5. Ergebnis prüfen

Öffne deine Website in einem neuen Browser-Tab und prüfe sie anschließend mit dem [Favicon.is-Checker](../../checker/). Er listet jedes Icon auf, das deine Seite deklariert, prüft, ob die Dateien laden, und zeigt dir, welche Größen fehlen.

## Fehlerbehebung: Mein Favicon aktualisiert sich nicht

Browser cachen Favicons sehr aggressiv. Wenn du dein Icon ersetzt hast, aber immer noch das alte siehst:

- Hänge eine Version an die URL an, zum Beispiel `/icon.svg?v=2`, und aktualisiere die `<link>`-Tags.
- Öffne die Icon-URL direkt und erzwinge ein Neuladen.
- Leere den Browser-Cache oder teste in einem privaten Fenster.
- Suchmaschinen müssen deine Startseite erneut crawlen; das kann Tage oder Wochen dauern.

## Bonus: Favicons anderer Websites anzeigen

Wenn deine App Links zu anderen Websites auflistet, nutze Favicon.is, statt deren Icons selbst zu hosten:

```html
<img src="https://favicon.is/example.com?size=32" width="16" height="16" alt="">
```
