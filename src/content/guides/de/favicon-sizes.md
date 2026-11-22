---
title: Favicon-Größen 2026 – der komplette Spickzettel
description: Welche Favicon-Größen brauchst du wirklich? Eine praktische Liste der Icon-Größen für Browser, Google Search, iOS, Android und Web-App-Manifeste.
order: 2
updated: 2026-11-22
---

Browser, Betriebssysteme und Suchmaschinen zeigen Website-Icons in ganz unterschiedlichen Größen an. Die gute Nachricht: Du brauchst nur eine Handvoll Dateien, um überall scharf auszusehen.

## Die kurze Antwort

Für fast jede Website reicht dieses Set:

| Datei | Größe | Verwendet von |
| --- | --- | --- |
| `favicon.ico` | 32×32 (kann auch 16×16 und 48×48 enthalten) | Allen Browsern, älteren Tools, der automatischen `/favicon.ico`-Anfrage |
| `icon.svg` | Skalierbar | Modernen Browsern, scharf in jeder Größe, kann den Dunkelmodus unterstützen |
| `apple-touch-icon.png` | 180×180 | Home-Bildschirmen von iPhone und iPad |
| `icon-192.png` | 192×192 | Android-Home-Bildschirm, Web-App-Manifest |
| `icon-512.png` | 512×512 | Android-Splash-Screens, installierbaren Web-Apps |

## Gängige Favicon-Größen und ihr Einsatzzweck

| Größe | Wo sie erscheint |
| --- | --- |
| 16×16 | Browser-Tabs und Lesezeichen auf Bildschirmen mit Standardauflösung |
| 32×32 | Browser-Tabs auf hochauflösenden Bildschirmen, Verknüpfungen in der Windows-Taskleiste |
| 48×48 | Website-Icons unter Windows; die von Google Search empfohlene Mindestgröße |
| 96×96, 144×144 | Google Search auf Bildschirmen mit hoher Pixeldichte (Vielfache von 48) |
| 180×180 | `apple-touch-icon` für iOS und iPadOS |
| 192×192 | Home-Bildschirm von Chrome unter Android und Mindestgröße im Manifest |
| 512×512 | Manifest-Icon für Splash-Screens und App-Stores bei PWAs |

## Anforderungen von Google Search

Google zeigt dein Favicon in den Suchergebnissen neben deinen Seiten an. Laut den Richtlinien von Google sollte das Icon **quadratisch** sein, mindestens **48×48 Pixel** groß (oder ein Vielfaches von 48, etwa 96×96 oder 144×144) und unter einer stabilen URL erreichbar sein, die Googlebot crawlen darf. SVG-Dateien werden ebenfalls akzeptiert. Sehr kleine Icons werden hochskaliert und können unscharf wirken.

## Tipps für gestochen scharfe Icons

- **Gestalte zuerst für die kleinste Größe.** Bei 16×16 ist nur Platz für eine einfache Form oder ein bis zwei Buchstaben. Entferne feine Details und dünne Linien.
- **Nutze das ganze Quadrat.** Icons mit zu viel Innenabstand wirken in Tabs winzig.
- **Teste auf hellen und dunklen Hintergründen.** Tabs, Suchergebnisse und Home-Bildschirme verwenden beides.
- **Gib iOS einen deckenden Hintergrund.** iOS füllt transparente Bereiche des `apple-touch-icon` mit Schwarz.
- **Kennzeichne maskierbare Icons.** Android schneidet Icons womöglich zu Kreisen oder Squircles zu; verwende `"purpose": "maskable"` im Manifest für Icons mit Schutzzone.

## Icons in jeder Größe von Favicon.is abrufen

Wenn du Icons *anderer* Websites anzeigst, fordere genau die Größe an, die du brauchst:

```text
https://favicon.is/github.com?size=32
https://favicon.is/github.com?size=64
https://favicon.is/github.com?larger=true
```

Unterstützt werden 16, 32, 48, 64, 128 und 256 Pixel. Ein Icon kann nur so scharf sein wie das größte Icon, das die Website bereitstellt – prüfe es deshalb mit dem [Favicon-Checker](../../checker/).
