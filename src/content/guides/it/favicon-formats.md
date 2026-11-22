---
title: "Formati delle favicon: ICO, PNG e SVG a confronto"
description: "Confronta i formati di favicon ICO, PNG, SVG, GIF e WebP, scopri quali browser li supportano e quale combinazione usare oggi."
order: 3
updated: 2026-11-22
---

Una favicon può essere salvata in diversi formati di immagine. Ognuno ha i suoi punti di forza e la configurazione migliore ne combina due o tre.

## ICO

Il formato originale delle favicon. Un file `.ico` è un contenitore che può includere più bitmap di dimensioni diverse, ad esempio 16×16, 32×32 e 48×48, così il sistema operativo può scegliere quella giusta.

- **Pro:** supportato da tutti i browser mai realizzati; richiesto automaticamente su `/favicon.ico`; un solo file per più dimensioni.
- **Contro:** file più pesanti; nessuna scalabilità vettoriale; serve uno strumento apposito per crearlo.

**Usalo per:** un unico `favicon.ico` nella root del sito, soprattutto per compatibilità.

## PNG

Il PNG è oggi il formato più diffuso per le favicon. Supporta la trasparenza e si comprime bene.

- **Pro:** supporto universale; facile da esportare da qualsiasi strumento di design; ideale per l’`apple-touch-icon` da 180×180 e per le icone del manifest da 192×192 e 512×512.
- **Contro:** ogni dimensione è un file separato; non scala oltre la sua dimensione in pixel.

**Usalo per:** touch icon, icone del manifest e come fallback per i browser che non supportano SVG.

## SVG

SVG è un formato vettoriale, quindi un unico file leggero resta nitido a ogni dimensione e su ogni densità di schermo.

- **Pro:** perfettamente nitido ovunque; file minuscolo; può adattarsi alla modalità scura con le media query CSS.
- **Contro:** il supporto dei browser non è ancora universale, quindi mantieni un fallback ICO o PNG; i loghi molto dettagliati potrebbero comunque richiedere una versione semplificata per il 16×16.

Una favicon SVG può cambiare colore quando l’utente preferisce un tema scuro:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    path { fill: #0f172a; }
    @media (prefers-color-scheme: dark) { path { fill: #f8fafc; } }
  </style>
  <path d="M4 4h24v24H4z"/>
</svg>
```

## GIF, JPEG e WebP

Questi formati funzionano nella maggior parte dei browser moderni, ma offrono pochi vantaggi per le icone. GIF supporta l’animazione, anche se le favicon animate distraggono e non vengono mostrate ovunque. JPEG non supporta la trasparenza. WebP e AVIF sono efficienti, ma non sono supportati da tutte le piattaforme che leggono le favicon.

## Quali formati usare?

La combinazione più affidabile oggi è:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

I browser che supportano SVG useranno `icon.svg`; gli altri ripiegheranno su `favicon.ico`.

## In che formato Favicon.is restituisce le icone?

Favicon.is restituisce l’icona nel formato fornito dal sito. Nella maggior parte dei casi è PNG, ma può essere ICO, SVG, JPEG, GIF o WebP. L’header di risposta `Content-Type` indica sempre quale formato hai ricevuto, e ogni formato funziona in un normale tag `<img>`.
