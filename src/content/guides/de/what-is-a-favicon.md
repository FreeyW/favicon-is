---
title: "Was ist ein Favicon? Kurzer Ratgeber zu Website-Icons"
description: Erfahre, was ein Favicon ist, wo Browser und Suchmaschinen es anzeigen, warum es für deine Marke wichtig ist und wie Browser es finden.
order: 1
updated: 2026-11-22
---

Ein **Favicon** (kurz für *favorite icon*) ist das kleine Bild, das eine Website repräsentiert. Du siehst es in Browser-Tabs, in deinen Lesezeichen und im Verlauf, in der Adressleiste, neben Suchergebnissen und auf dem Home-Bildschirm deines Smartphones, wenn du eine Website als Verknüpfung speicherst.

## Wo Favicons erscheinen

- **Browser-Tabs.** Bei vielen offenen Tabs ist das Icon oft das Einzige, woran man sie unterscheiden kann.
- **Lesezeichen und Verlauf.** Icons machen lange Listen auf einen Blick überschaubar.
- **Suchergebnisse.** Google und andere Suchmaschinen zeigen das Favicon auf Mobilgeräten und Desktop neben dem Namen deiner Website an.
- **Home-Bildschirme und App-Launcher.** Wenn jemand deine Website auf seinem Smartphone hinzufügt, wird das Touch-Icon zum App-Icon.
- **Andere Apps.** Chat-Apps, Read-later-Dienste, Passwort-Manager und Dashboards nutzen Favicons, um Links zu kennzeichnen.

## Ein bisschen Geschichte

Favicons wurden 1999 mit dem Internet Explorer 5 eingeführt. Der Browser suchte im Stammverzeichnis einer Website nach einer Datei namens `favicon.ico` und zeigte sie im Menü *Favoriten* an – daher auch der Name. Später bekam HTML das Tag `<link rel="icon">`, damit Websites Speicherort, Format und Größe ihres Icons selbst festlegen konnten.

Heute liefert eine einzelne Website typischerweise mehrere Icons aus: ein kleines ICO oder PNG für Tabs, ein SVG, das sich auf jede Größe skalieren lässt, ein `apple-touch-icon` für iOS und größere PNG-Dateien, die in einem Web-App-Manifest für Android aufgeführt sind.

## Warum Favicons wichtig sind

1. **Wiedererkennung.** Ein klares Icon hilft Menschen, deinen Tab unter Dutzenden anderen zu finden, und stärkt das Vertrauen in deine Marke.
2. **Professioneller Auftritt.** Fehlt das Favicon, wird ein generischer Platzhalter angezeigt – und das wirkt unfertig.
3. **Sichtbarkeit in der Suche.** Suchmaschinen zeigen Favicons in den Ergebnissen an, und ein markantes Icon kann die Klickrate verbessern.
4. **Weniger Fehler.** Browser fragen `/favicon.ico` automatisch ab. Fehlt die Datei, füllen sich deine Server-Logs mit 404-Fehlern.

## Wie Browser ein Favicon finden

Beim Laden einer Seite liest der Browser den `<head>` nach `<link>`-Tags aus, deren `rel`-Attribut `icon` enthält. Anhand der Attribute `sizes` und `type` sowie des Bildschirms, auf dem er gerade zeichnet, wählt er den besten Kandidaten. Gibt es überhaupt keine Deklaration, greift er auf `https://example.com/favicon.ico` zurück.

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Das Favicon jeder Website abrufen

Wenn du ein Produkt entwickelst, das Links zu anderen Websites anzeigt, musst du nicht jede Website selbst scrapen. Favicon.is liefert das Icon jeder Domain über eine einzige URL:

```html
<img src="https://favicon.is/wikipedia.org" width="32" height="32" alt="Wikipedia">
```

Erfahre als Nächstes, [welche Größen du brauchst](../favicon-sizes/) und [welche Dateiformate du verwenden solltest](../favicon-formats/).
