---
title: Favicon-afmetingen in 2026 – het complete spiekbriefje
description: Welke favicon-afmetingen heb je echt nodig? Een praktische lijst met icoonformaten voor browsers, Google Search, iOS, Android en webapp-manifesten.
order: 2
updated: 2026-11-22
---

Browsers, besturingssystemen en zoekmachines tonen websitepictogrammen allemaal in verschillende formaten. Het goede nieuws: je hebt maar een handvol bestanden nodig om er overal scherp uit te zien.

## Het korte antwoord

Voor bijna elke website is deze set genoeg:

| Bestand | Afmeting | Gebruikt door |
| --- | --- | --- |
| `favicon.ico` | 32×32 (kan ook 16×16 en 48×48 bevatten) | Alle browsers, oudere tools, het automatische `/favicon.ico`-verzoek |
| `icon.svg` | Schaalbaar | Moderne browsers, scherp op elke grootte, kan de donkere modus ondersteunen |
| `apple-touch-icon.png` | 180×180 | Beginschermen van iPhone en iPad |
| `icon-192.png` | 192×192 | Android-beginscherm, webapp-manifest |
| `icon-512.png` | 512×512 | Android-splashscreens, installeerbare webapps |

## Veelgebruikte favicon-afmetingen en waarvoor ze dienen

| Afmeting | Waar je hem ziet |
| --- | --- |
| 16×16 | Browsertabbladen en bladwijzers op schermen met standaardresolutie |
| 32×32 | Browsertabbladen op schermen met hoge resolutie, snelkoppelingen in de Windows-taakbalk |
| 48×48 | Site-iconen in Windows; de minimale afmeting die Google Search aanbeveelt |
| 96×96, 144×144 | Google Search op schermen met een hoge pixeldichtheid (veelvouden van 48) |
| 180×180 | `apple-touch-icon` voor iOS en iPadOS |
| 192×192 | Beginscherm van Chrome op Android en het minimum voor het manifest |
| 512×512 | Manifesticoon voor splashscreens en appstores voor PWA’s |

## Eisen van Google Search

Google toont je favicon naast je pagina’s in de zoekresultaten. Volgens de richtlijnen van Google moet het icoon **vierkant** zijn, minimaal **48×48 pixels** (of een veelvoud van 48, zoals 96×96 of 144×144) en beschikbaar zijn op een stabiele URL die Googlebot mag crawlen. SVG-bestanden worden ook geaccepteerd. Heel kleine iconen worden opgeschaald en kunnen er wazig uitzien.

## Tips voor haarscherpe iconen

- **Ontwerp eerst voor het kleinste formaat.** Op 16×16 is er alleen ruimte voor een eenvoudige vorm of een of twee letters. Haal fijne details en dunne lijnen weg.
- **Gebruik het hele vierkant.** Iconen met te veel witruimte zien er in tabbladen piepklein uit.
- **Test op lichte en donkere achtergronden.** Tabbladen, zoekresultaten en beginschermen gebruiken ze allebei.
- **Geef iOS een effen achtergrond.** iOS vult transparante delen van `apple-touch-icon` met zwart.
- **Markeer maskable iconen.** Android kan iconen bijsnijden tot cirkels of squircles; gebruik `"purpose": "maskable"` in het manifest voor iconen met een veilige zone.

## Iconen in elk formaat ophalen via Favicon.is

Toon je iconen van *andere* websites, vraag dan precies de grootte op die je nodig hebt:

```text
https://favicon.is/github.com?size=32
https://favicon.is/github.com?size=64
https://favicon.is/github.com?larger=true
```

Ondersteunde waarden zijn 16, 32, 48, 64, 128 en 256 pixels. Een icoon kan nooit scherper zijn dan het grootste icoon dat een site publiceert, dus controleer dat met de [favicon-checker](../../checker/).
