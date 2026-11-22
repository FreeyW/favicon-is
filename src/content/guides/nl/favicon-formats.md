---
title: "Favicon-formaten: ICO vs PNG vs SVG uitgelegd"
description: Vergelijk de faviconformaten ICO, PNG, SVG, GIF en WebP, ontdek welke browsers ze ondersteunen en welke combinatie je vandaag het best gebruikt.
order: 3
updated: 2026-11-22
---

Een favicon kan in verschillende afbeeldingsformaten worden opgeslagen. Elk formaat heeft zijn sterke punten, en de beste opzet combineert er twee of drie.

## ICO

Het oorspronkelijke faviconformaat. Een `.ico`-bestand is een container met meerdere bitmaps in verschillende groottes, bijvoorbeeld 16×16, 32×32 en 48×48, zodat het besturingssysteem de juiste kan kiezen.

- **Voordelen:** ondersteund door elke browser die ooit is gemaakt; wordt automatisch opgevraagd op `/favicon.ico`; één bestand voor meerdere groottes.
- **Nadelen:** grotere bestanden; geen vectorschaling; je hebt speciale tools nodig om het te maken.

**Gebruik het voor:** één `favicon.ico` in de root van je site, vooral voor compatibiliteit.

## PNG

PNG is tegenwoordig het meest gebruikte formaat voor favicons. Het ondersteunt transparantie en comprimeert goed.

- **Voordelen:** universele ondersteuning; eenvoudig te exporteren vanuit elke ontwerptool; ideaal voor de `apple-touch-icon` van 180×180 en de manifesticonen van 192×192 en 512×512.
- **Nadelen:** elke grootte is een apart bestand; schaalt niet verder dan de eigen pixelgrootte.

**Gebruik het voor:** touch-iconen, manifesticonen en als fallback voor browsers die geen SVG ondersteunen.

## SVG

SVG is een vectorformaat, dus één klein bestand blijft scherp op elke grootte en bij elke pixeldichtheid.

- **Voordelen:** overal perfect scherp; piepkleine bestandsgrootte; kan met CSS-mediaqueries reageren op de donkere modus.
- **Nadelen:** de browserondersteuning is nog niet universeel, dus houd een ICO- of PNG-fallback aan; zeer gedetailleerde logo’s hebben voor 16×16 misschien toch een vereenvoudigde versie nodig.

Een SVG-favicon kan van kleur wisselen wanneer de gebruiker een donker thema verkiest:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    path { fill: #0f172a; }
    @media (prefers-color-scheme: dark) { path { fill: #f8fafc; } }
  </style>
  <path d="M4 4h24v24H4z"/>
</svg>
```

## GIF, JPEG en WebP

Deze formaten werken in de meeste moderne browsers, maar bieden weinig voordelen voor iconen. GIF ondersteunt animatie, maar geanimeerde favicons leiden af en worden niet overal getoond. JPEG ondersteunt geen transparantie. WebP en AVIF zijn efficiënt, maar worden niet ondersteund door elk platform dat favicons uitleest.

## Welke formaten moet je gebruiken?

De meest betrouwbare combinatie op dit moment is:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Browsers die SVG begrijpen, gebruiken `icon.svg`; andere vallen terug op `favicon.ico`.

## Welk formaat geeft Favicon.is terug?

Favicon.is geeft het icoon terug in het formaat dat de website aanbiedt. Meestal is dat PNG, maar het kan ook ICO, SVG, JPEG, GIF of WebP zijn. De responseheader `Content-Type` vertelt je altijd welk formaat je hebt ontvangen, en elk formaat werkt in een gewone `<img>`-tag.
