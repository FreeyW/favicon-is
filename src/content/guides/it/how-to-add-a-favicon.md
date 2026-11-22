---
title: "Come aggiungere una favicon al tuo sito (passo dopo passo)"
description: "Guida passo passo per aggiungere una favicon a qualsiasi sito: tag HTML, web app manifest, Apple touch icon e cosa fare se la favicon non si aggiorna."
order: 4
updated: 2026-11-22
---

Aggiungere una favicon richiede una decina di minuti. Questa guida ti accompagna nella creazione dei file, nell’aggiunta dell’HTML e nella verifica del risultato.

## 1. Prepara l’immagine di partenza

Parti da un’immagine quadrata di almeno **512×512 pixel**, idealmente una versione vettoriale (SVG) del tuo logo. Semplificala: a 16 pixel testo e linee sottili scompaiono. Molti brand usano una sola lettera o un simbolo come favicon.

## 2. Crea i file delle icone

Esporta questi file dal tuo strumento di design o da un generatore di favicon:

- `favicon.ico` – 32×32 (facoltativamente con 16×16 e 48×48 all’interno)
- `icon.svg` – la versione scalabile
- `apple-touch-icon.png` – 180×180 con sfondo pieno
- `icon-192.png` e `icon-512.png` – per il web app manifest

Mettili nella cartella principale del tuo sito (la stessa della home page).

## 3. Aggiungi i tag HTML

Incolla queste righe nell’`<head>` di ogni pagina:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

La maggior parte dei framework e dei site builder ha uno spazio dedicato: la cartella `public` nei progetti Astro, Next.js e Vite, le impostazioni Identità del sito in WordPress o le impostazioni del tema in Shopify.

## 4. Aggiungi un web app manifest

Crea `manifest.webmanifest` accanto alle icone:

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

## 5. Controlla il risultato

Apri il sito in una nuova scheda del browser, poi analizzalo con lo [strumento di verifica di Favicon.is](../../checker/). Elenca tutte le icone dichiarate dalla pagina, controlla che i file si carichino e ti dice quali dimensioni mancano.

## Risoluzione dei problemi: la mia favicon non si aggiorna

I browser memorizzano le favicon nella cache in modo molto aggressivo. Se hai sostituito l’icona ma vedi ancora quella vecchia:

- Aggiungi una versione all’URL, ad esempio `/icon.svg?v=2`, e aggiorna i tag `<link>`.
- Apri direttamente l’URL dell’icona e forza il ricaricamento.
- Svuota la cache del browser o prova in una finestra di navigazione privata.
- I motori di ricerca devono scansionare di nuovo la tua home page: possono volerci giorni o settimane.

## Bonus: mostra le favicon di altri siti

Se la tua app elenca link ad altri siti, usa Favicon.is invece di ospitare tu stesso le loro icone:

```html
<img src="https://favicon.is/example.com?size=32" width="16" height="16" alt="">
```
