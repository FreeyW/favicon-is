---
title: "Favicon-Formate: ICO vs. PNG vs. SVG erklärt"
description: Vergleiche die Favicon-Formate ICO, PNG, SVG, GIF und WebP, erfahre, welche Browser sie unterstützen, und welche Kombination du heute nutzen solltest.
order: 3
updated: 2026-11-22
---

Ein Favicon lässt sich in mehreren Bildformaten speichern. Jedes hat seine Stärken, und das beste Setup kombiniert zwei oder drei davon.

## ICO

Das ursprüngliche Favicon-Format. Eine `.ico`-Datei ist ein Container, der mehrere Bitmaps in verschiedenen Größen enthalten kann, zum Beispiel 16×16, 32×32 und 48×48 – so kann das Betriebssystem die passende auswählen.

- **Vorteile:** wird von jedem jemals gebauten Browser unterstützt; wird automatisch unter `/favicon.ico` abgefragt; eine Datei für mehrere Größen.
- **Nachteile:** größere Dateien; keine Vektorskalierung; zum Erstellen ist ein spezielles Tool nötig.

**Einsatz:** eine einzelne `favicon.ico` im Stammverzeichnis deiner Website, vor allem aus Kompatibilitätsgründen.

## PNG

PNG ist heute das gängigste Format für Favicons. Es unterstützt Transparenz und lässt sich gut komprimieren.

- **Vorteile:** universelle Unterstützung; lässt sich aus jedem Design-Tool einfach exportieren; ideal für das 180×180 große `apple-touch-icon` und die Manifest-Icons mit 192×192 und 512×512.
- **Nachteile:** jede Größe ist eine eigene Datei; lässt sich nicht über die eigene Pixelgröße hinaus skalieren.

**Einsatz:** Touch-Icons, Manifest-Icons und als Fallback für Browser, die SVG nicht unterstützen.

## SVG

SVG ist ein Vektorformat – eine einzige kleine Datei bleibt also in jeder Größe und bei jeder Pixeldichte scharf.

- **Vorteile:** überall perfekt scharf; winzige Dateigröße; kann mit CSS-Media-Queries auf den Dunkelmodus reagieren.
- **Nachteile:** die Browser-Unterstützung ist noch nicht universell, behalte also einen ICO- oder PNG-Fallback; sehr detailreiche Logos brauchen für 16×16 eventuell trotzdem eine vereinfachte Version.

Ein SVG-Favicon kann die Farben wechseln, wenn Nutzer ein dunkles Design bevorzugen:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    path { fill: #0f172a; }
    @media (prefers-color-scheme: dark) { path { fill: #f8fafc; } }
  </style>
  <path d="M4 4h24v24H4z"/>
</svg>
```

## GIF, JPEG und WebP

Diese Formate funktionieren in den meisten modernen Browsern, bieten für Icons aber kaum Vorteile. GIF unterstützt Animationen, allerdings lenken animierte Favicons ab und werden nicht überall angezeigt. JPEG unterstützt keine Transparenz. WebP und AVIF sind effizient, werden aber nicht von jeder Plattform unterstützt, die Favicons ausliest.

## Welche Formate solltest du verwenden?

Die zuverlässigste Kombination ist derzeit:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Browser, die SVG verstehen, verwenden `icon.svg`; alle anderen greifen auf `favicon.ico` zurück.

## Welches Format liefert Favicon.is?

Favicon.is liefert das Icon in dem Format, das die Website bereitstellt. Meist ist das PNG, es kann aber auch ICO, SVG, JPEG, GIF oder WebP sein. Der Response-Header `Content-Type` verrät dir immer, welches Format du erhalten hast, und jedes Format funktioniert in einem normalen `<img>`-Tag.
