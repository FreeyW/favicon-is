---
title: "Favicon toevoegen aan je website: stap voor stap"
description: "Stap voor stap een favicon aan je website toevoegen: HTML-tags, webapp-manifest, Apple-touch-iconen en wat je doet als je favicon niet wordt bijgewerkt."
order: 4
updated: 2026-11-22
---

Een favicon toevoegen kost ongeveer tien minuten. Deze handleiding helpt je bij het maken van de bestanden, het toevoegen van de HTML en het controleren van het resultaat.

## 1. Bereid je bronafbeelding voor

Begin met een vierkante afbeelding van minimaal **512×512 pixels**, bij voorkeur een vectorversie (SVG) van je logo. Vereenvoudig hem: op 16 pixels verdwijnen tekst en dunne lijnen. Veel merken gebruiken één letter of symbool als favicon.

## 2. Maak de icoonbestanden

Exporteer deze bestanden vanuit je ontwerptool of een favicongenerator:

- `favicon.ico` – 32×32 (eventueel met 16×16 en 48×48 erin)
- `icon.svg` – de schaalbare versie
- `apple-touch-icon.png` – 180×180 met een effen achtergrond
- `icon-192.png` en `icon-512.png` – voor het webapp-manifest

Zet ze in de hoofdmap van je website (dezelfde map als je homepage).

## 3. Voeg de HTML-tags toe

Plak deze regels in de `<head>` van elke pagina:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

De meeste frameworks en sitebouwers hebben hier een vaste plek voor: de map `public` in Astro-, Next.js- en Vite-projecten, de instellingen voor de site-identiteit in WordPress of de thema-instellingen in Shopify.

## 4. Voeg een webapp-manifest toe

Maak `manifest.webmanifest` aan naast je iconen:

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

## 5. Controleer het resultaat

Open je site in een nieuw browsertabblad en haal hem daarna door de [Favicon.is-checker](../../checker/). Die toont elk icoon dat je pagina declareert, controleert of de bestanden laden en vertelt je welke afmetingen ontbreken.

## Problemen oplossen: mijn favicon wordt niet bijgewerkt

Browsers cachen favicons heel agressief. Heb je je icoon vervangen maar zie je nog steeds het oude?

- Voeg een versie toe aan de URL, bijvoorbeeld `/icon.svg?v=2`, en werk de `<link>`-tags bij.
- Open de URL van het icoon rechtstreeks en forceer een herlaadactie.
- Wis de browsercache of test in een privévenster.
- Zoekmachines moeten je homepage opnieuw crawlen; dat kan dagen of weken duren.

## Bonus: toon de favicons van andere websites

Toont je app links naar andere sites, gebruik dan Favicon.is in plaats van hun iconen zelf te hosten:

```html
<img src="https://favicon.is/example.com?size=32" width="16" height="16" alt="">
```
