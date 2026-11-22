---
title: "Che cos’è una favicon? Breve guida alle icone dei siti"
description: "Scopri che cos’è una favicon, dove la mostrano browser e motori di ricerca, perché è importante per il tuo brand e come la trovano i browser."
order: 1
updated: 2026-11-22
---

Una **favicon** (abbreviazione di *favorite icon*, «icona dei preferiti») è la piccola immagine che rappresenta un sito web. La vedi nelle schede del browser, nei segnalibri e nella cronologia, nella barra degli indirizzi, accanto ai risultati di ricerca e nella schermata Home del telefono quando salvi un sito come collegamento.

## Dove compaiono le favicon

- **Schede del browser.** Con molte schede aperte, l’icona è spesso l’unico elemento che permette di distinguerle.
- **Segnalibri e cronologia.** Le icone rendono gli elenchi lunghi leggibili a colpo d’occhio.
- **Risultati di ricerca.** Google e gli altri motori di ricerca mostrano la favicon accanto al nome del tuo sito, sia su mobile sia su desktop.
- **Schermate Home e launcher di app.** Quando qualcuno aggiunge il tuo sito al telefono, la touch icon diventa l’icona dell’app.
- **Altre app.** App di chat, servizi di lettura differita, gestori di password e dashboard usano le favicon per contrassegnare i link.

## Un po’ di storia

Le favicon sono state introdotte da Internet Explorer 5 nel 1999. Il browser cercava un file chiamato `favicon.ico` nella root di un sito e lo mostrava nel menu *Preferiti* (in inglese *Favorites*), da cui deriva il nome. In seguito l’HTML ha introdotto il tag `<link rel="icon">`, così i siti potevano scegliere posizione, formato e dimensione della propria icona.

Oggi un sito pubblica in genere più icone: un piccolo ICO o PNG per le schede, un SVG scalabile a qualsiasi dimensione, un’`apple-touch-icon` per iOS e file PNG più grandi elencati in un web app manifest per Android.

## Perché le favicon sono importanti

1. **Riconoscibilità.** Un’icona chiara aiuta le persone a trovare la tua scheda tra decine di altre e rafforza la fiducia nel tuo brand.
2. **Aspetto professionale.** Senza favicon viene mostrato un segnaposto generico, che dà un’impressione di lavoro incompiuto.
3. **Visibilità nella ricerca.** I motori di ricerca mostrano le favicon nei risultati e un’icona distintiva può migliorare il tasso di clic.
4. **Meno errori.** I browser richiedono automaticamente `/favicon.ico`. Se manca, i log del server si riempiono di errori 404.

## Come i browser trovano una favicon

Quando una pagina viene caricata, il browser legge l’`<head>` alla ricerca di tag `<link>` il cui attributo `rel` contiene `icon`. Sceglie il candidato migliore in base agli attributi `sizes` e `type` e allo schermo su cui sta disegnando. Se non trova alcuna dichiarazione, ripiega su `https://example.com/favicon.ico`.

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Ottenere la favicon di qualsiasi sito

Se stai sviluppando un prodotto che mostra link ad altri siti, non devi fare lo scraping di ogni sito da solo. Favicon.is restituisce l’icona di qualsiasi dominio da un unico URL:

```html
<img src="https://favicon.is/wikipedia.org" width="32" height="32" alt="Wikipedia">
```

Ora scopri [quali dimensioni ti servono](../favicon-sizes/) e [quali formati di file usare](../favicon-formats/).
