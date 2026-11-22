---
title: "Informazioni su Favicon.is"
description: "Favicon.is è un’API gratuita che restituisce la favicon di qualsiasi sito da un unico URL. Scopri a chi è rivolta, come funziona e la tecnologia alla base."
updated: 2026-11-22
---

Favicon.is è un servizio gratuito che restituisce la favicon di qualsiasi sito da un unico URL. Aggiungi un dominio dopo `https://favicon.is/` e ricevi l’icona del sito come immagine, pronta per un tag `<img>`.

## A chi è rivolto

- **Sviluppatori** che mostrano link, segnalibri o integrazioni e vogliono icone riconoscibili senza fare scraping dei siti.
- **Designer** che hanno bisogno del logo di un sito noto per un mock-up in pochi secondi.
- **Webmaster** che vogliono controllare l’aspetto della propria favicon e verificare che ci siano tutte le dimensioni.

## Come funziona

Ogni richiesta attraversa una breve pipeline. Normalizziamo l’input, verifichiamo che il dominio termini con un dominio di primo livello dell’IANA Root Zone Database e poi cerchiamo l’icona nella nostra cache edge, nel nostro archivio, nella cache favicon di Google e infine sul sito stesso. Il risultato migliore viene salvato e servito dall’edge, così la richiesta successiva è quasi istantanea.

Se non esiste alcuna icona, ricevi un’icona predefinita neutra invece di un’immagine non funzionante.

## Tecnologia

Il sito è realizzato con [Astro](https://astro.build) e TypeScript. L’API e le pagine girano su [Cloudflare Workers](https://workers.cloudflare.com) nei data center di tutto il mondo, e le icone sono salvate su [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/). L’elenco dei TLD supportati proviene dall’[IANA Root Zone Database](https://www.iana.org/domains/root/db).

## Uso responsabile

Favicon.is recupera solo icone pubblicamente disponibili, si identifica con uno user agent chiaro e conserva al massimo una copia per icona e dimensione. I loghi restano di proprietà dei rispettivi titolari. Se possiedi un sito e vuoi che la sua icona venga rimossa dalla nostra cache, contattaci usando i recapiti qui sotto.

## Riconoscimenti

Favicon.is si ispira a Favicon.im e fa parte di una famiglia di piccoli strumenti web gratuiti, elencati in fondo a ogni pagina.
