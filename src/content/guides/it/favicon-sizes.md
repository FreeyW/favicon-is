---
title: "Dimensioni delle favicon nel 2026 – il prontuario completo"
description: "Quali dimensioni di favicon ti servono davvero? Un elenco pratico delle dimensioni delle icone per browser, Google Search, iOS, Android e web app manifest."
order: 2
updated: 2026-11-22
---

Browser, sistemi operativi e motori di ricerca mostrano le icone dei siti a dimensioni diverse. La buona notizia: bastano pochi file per avere icone nitide ovunque.

## La risposta breve

Per quasi tutti i siti questo set è sufficiente:

| File | Dimensione | Usato da |
| --- | --- | --- |
| `favicon.ico` | 32×32 (può contenere anche 16×16 e 48×48) | Tutti i browser, strumenti legacy, la richiesta automatica di `/favicon.ico` |
| `icon.svg` | Scalabile | Browser moderni, nitido a qualsiasi dimensione, può supportare la modalità scura |
| `apple-touch-icon.png` | 180×180 | Schermata Home di iPhone e iPad |
| `icon-192.png` | 192×192 | Schermata Home di Android, web app manifest |
| `icon-512.png` | 512×512 | Schermate di avvio di Android, web app installabili |

## Dimensioni comuni delle favicon e a cosa servono

| Dimensione | Dove compare |
| --- | --- |
| 16×16 | Schede del browser e segnalibri su schermi a risoluzione standard |
| 32×32 | Schede del browser su schermi ad alta risoluzione, collegamenti nella barra delle applicazioni di Windows |
| 48×48 | Icone dei siti in Windows; la dimensione minima consigliata da Google Search |
| 96×96, 144×144 | Google Search su schermi ad alta densità (multipli di 48) |
| 180×180 | `apple-touch-icon` per iOS e iPadOS |
| 192×192 | Schermata Home di Chrome su Android e dimensione minima per il manifest |
| 512×512 | Icona del manifest per le schermate di avvio e gli app store delle PWA |

## Requisiti di Google Search

Google mostra la tua favicon accanto alle tue pagine nei risultati di ricerca. Secondo le linee guida di Google, l’icona deve essere **quadrata**, di almeno **48×48 pixel** (o un multiplo di 48, come 96×96 o 144×144) e disponibile a un URL stabile che Googlebot può scansionare. Sono accettati anche i file SVG. Le icone molto piccole vengono ingrandite e possono risultare sfocate.

## Consigli per icone nitide

- **Progetta prima per la dimensione più piccola.** A 16×16 c’è spazio solo per una forma semplice o per una o due lettere. Elimina i dettagli fini e le linee sottili.
- **Sfrutta tutto il quadrato.** Le icone con troppo margine sembrano minuscole nelle schede.
- **Prova su sfondi chiari e scuri.** Schede, risultati di ricerca e schermate Home usano entrambi.
- **Dai a iOS uno sfondo pieno.** iOS riempie di nero le aree trasparenti dell’`apple-touch-icon`.
- **Contrassegna le icone maskable.** Android può ritagliare le icone in cerchi o squircle; usa `"purpose": "maskable"` nel manifest per le icone con una zona sicura.

## Ottenere icone di qualsiasi dimensione da Favicon.is

Quando mostri le icone di *altri* siti, richiedi esattamente la dimensione che ti serve:

```text
https://favicon.is/github.com?size=32
https://favicon.is/github.com?size=64
https://favicon.is/github.com?larger=true
```

I valori supportati sono 16, 32, 48, 64, 128 e 256 pixel. Un’icona non può essere più nitida dell’icona più grande pubblicata dal sito, quindi verificala con lo [strumento di verifica favicon](../../checker/).
