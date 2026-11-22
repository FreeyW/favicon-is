---
title: "Wat is een favicon? Een korte gids over websitepictogrammen"
description: Ontdek wat een favicon is, waar browsers en zoekmachines het tonen, waarom het belangrijk is voor je merk en hoe browsers het vinden.
order: 1
updated: 2026-11-22
---

Een **favicon** (kort voor *favorite icon*) is de kleine afbeelding die een website vertegenwoordigt. Je ziet het in browsertabbladen, in je bladwijzers en geschiedenis, in de adresbalk, naast zoekresultaten en op het beginscherm van je telefoon wanneer je een site als snelkoppeling opslaat.

## Waar favicons verschijnen

- **Browsertabbladen.** Met veel tabbladen open is het icoon vaak het enige waaraan je ze uit elkaar houdt.
- **Bladwijzers en geschiedenis.** Iconen maken lange lijsten in één oogopslag overzichtelijk.
- **Zoekresultaten.** Google en andere zoekmachines tonen het favicon naast de naam van je site, op mobiel en desktop.
- **Beginschermen en app-launchers.** Wanneer iemand je site aan zijn telefoon toevoegt, wordt het touch-icoon het app-icoon.
- **Andere apps.** Chat-apps, read-later-diensten, wachtwoordmanagers en dashboards gebruiken allemaal favicons om links te labelen.

## Een stukje geschiedenis

Favicons werden in 1999 geïntroduceerd door Internet Explorer 5. De browser zocht naar een bestand met de naam `favicon.ico` in de root van een website en toonde het in het menu *Favorieten*; daar komt de naam vandaan. Later kreeg HTML de tag `<link rel="icon">`, zodat sites zelf de locatie, het formaat en de grootte van hun icoon konden kiezen.

Tegenwoordig levert een website doorgaans meerdere iconen: een kleine ICO of PNG voor tabbladen, een SVG die naar elke grootte schaalt, een `apple-touch-icon` voor iOS en grotere PNG-bestanden die in een webapp-manifest voor Android staan.

## Waarom favicons belangrijk zijn

1. **Herkenning.** Een duidelijk icoon helpt mensen je tabblad tussen tientallen andere te vinden en bouwt vertrouwen in je merk op.
2. **Professionele uitstraling.** Zonder favicon wordt een generieke placeholder getoond, en dat ziet er onaf uit.
3. **Zichtbaarheid in zoekmachines.** Zoekmachines tonen favicons in de resultaten, en een opvallend icoon kan de doorklikratio verbeteren.
4. **Minder fouten.** Browsers vragen automatisch `/favicon.ico` op. Zonder dat bestand lopen je serverlogs vol met 404-fouten.

## Hoe browsers een favicon vinden

Wanneer een pagina laadt, zoekt de browser in de `<head>` naar `<link>`-tags waarvan het `rel`-attribuut `icon` bevat. Op basis van de attributen `sizes` en `type` en het scherm waarop hij tekent, kiest hij de beste kandidaat. Is er helemaal geen declaratie, dan valt hij terug op `https://example.com/favicon.ico`.

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Het favicon van elke website ophalen

Bouw je een product dat links naar andere websites toont, dan hoef je niet elke site zelf te scrapen. Favicon.is geeft het icoon van elk domein terug via één URL:

```html
<img src="https://favicon.is/wikipedia.org" width="32" height="32" alt="Wikipedia">
```

Lees hierna [welke afmetingen je nodig hebt](../favicon-sizes/) en [welke bestandsformaten je moet gebruiken](../favicon-formats/).
