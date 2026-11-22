---
title: "Come ottenere la favicon di qualsiasi sito"
description: "Cinque modi per ottenere la favicon di un sito – da /favicon.ico e dall’HTML della pagina alle API per favicon – con esempi di codice, pro e contro."
order: 5
updated: 2026-11-22
---

Che tu stia creando un gestore di segnalibri, una pagina link-in-bio, una dashboard o un’estensione del browser, prima o poi ti serviranno le icone di altri siti. Ecco le opzioni, dalla più manuale alla più semplice.

## 1. Richiedi /favicon.ico

La convenzione più antica: molti siti servono ancora un’icona nella root.

```text
https://example.com/favicon.ico
```

**Pro:** nessun servizio di terze parti. **Contro:** una buona parte dei siti non ha questo file, spesso è di soli 16×16 o 32×32 pixel e, quando manca, ottieni un’immagine non funzionante.

## 2. Leggi l’HTML della pagina

Il metodo affidabile è scaricare la home page e cercare `<link rel="icon">`, `<link rel="apple-touch-icon">` e il web app manifest, quindi scegliere la dimensione migliore.

```js
const html = await fetch('https://example.com').then((r) => r.text());
const links = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
```

**Pro:** trova l’icona che il sito dichiara davvero. **Contro:** devi gestire da solo redirect, URL relativi, timeout, siti che bloccano i bot, cache e fallback – e non puoi farlo dal browser a causa di CORS.

## 3. Usa le API delle estensioni del browser

Le estensioni di Chrome possono usare il permesso `favicon` e `chrome-extension://<id>/_favicon/?pageUrl=…` per ottenere le icone che il browser conosce già. Funziona solo all’interno di un’estensione e solo per i siti che l’utente ha visitato.

## 4. Usa il servizio favicon di un motore di ricerca

Google e DuckDuckGo espongono le icone che raccolgono durante la scansione:

```text
https://www.google.com/s2/favicons?domain=example.com&sz=64
https://icons.duckduckgo.com/ip3/example.com.ico
```

**Pro:** veloce e con un’ampia copertura. **Contro:** non ufficiale e non documentato, controllo limitato su dimensione e formato, e nessuna informazione su cosa è stato restituito.

## 5. Usa Favicon.is

Favicon.is riunisce tutti questi metodi dietro un unico URL. Controlla la cache favicon di Google, legge l’HTML del sito, prova `/favicon.ico`, salva il risultato su Cloudflare R2 e restituisce sempre un’immagine:

```html
<img src="https://favicon.is/example.com" width="32" height="32" alt="">
```

- Scegli una dimensione da `?size=16` a `?size=256`, oppure usa `?larger=true`.
- Usa `?original=true` per saltare Google e leggere le dichiarazioni di icone del sito stesso.
- Controlla l’header `X-Source` per sapere da dove proviene l’icona.
- Vengono cercati solo i domini con un TLD dell’IANA Root Zone Database, quindi errori di battitura e nomi privati restituiscono subito l’icona predefinita.

Consulta la [documentazione API](../../docs/) per tutte le opzioni, oppure copia uno snippet dagli [esempi](../../examples/).
