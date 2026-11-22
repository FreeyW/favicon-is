---
title: "Rozmiary faviconu w 2026 roku – kompletna ściągawka"
description: "Jakich rozmiarów faviconu naprawdę potrzebujesz? Praktyczna lista rozmiarów ikon dla przeglądarek, Google Search, iOS, Androida i manifestów aplikacji webowych."
order: 2
updated: 2026-11-22
---

Przeglądarki, systemy operacyjne i wyszukiwarki wyświetlają ikony stron w różnych rozmiarach. Dobra wiadomość: wystarczy kilka plików, by ikona wszędzie wyglądała ostro.

## Krótka odpowiedź

Dla niemal każdej strony wystarczy taki zestaw:

| Plik | Rozmiar | Gdzie jest używany |
| --- | --- | --- |
| `favicon.ico` | 32×32 (może też zawierać 16×16 i 48×48) | Wszystkie przeglądarki, starsze narzędzia, automatyczne żądanie `/favicon.ico` |
| `icon.svg` | Skalowalny | Nowoczesne przeglądarki, ostry w każdym rozmiarze, może obsługiwać tryb ciemny |
| `apple-touch-icon.png` | 180×180 | Ekrany główne iPhone’a i iPada |
| `icon-192.png` | 192×192 | Ekran główny Androida, manifest aplikacji webowej |
| `icon-512.png` | 512×512 | Ekrany powitalne Androida, instalowalne aplikacje webowe |

## Popularne rozmiary faviconów i do czego służą

| Rozmiar | Gdzie się pojawia |
| --- | --- |
| 16×16 | Karty i zakładki przeglądarki na ekranach o standardowej rozdzielczości |
| 32×32 | Karty przeglądarki na ekranach o wysokiej rozdzielczości, skróty na pasku zadań Windows |
| 48×48 | Ikony stron w Windows; minimalny rozmiar zalecany przez Google Search |
| 96×96, 144×144 | Google Search na ekranach o dużej gęstości pikseli (wielokrotności 48) |
| 180×180 | `apple-touch-icon` dla iOS i iPadOS |
| 192×192 | Ekran główny Androida w Chrome i minimum dla manifestu |
| 512×512 | Ikona manifestu dla ekranów powitalnych i sklepów z aplikacjami dla PWA |

## Wymagania Google Search

Google pokazuje twój favicon obok twoich stron w wynikach wyszukiwania. Według wytycznych Google ikona powinna być **kwadratowa**, mieć co najmniej **48×48 pikseli** (lub wielokrotność 48, np. 96×96 albo 144×144) i być dostępna pod stałym URL-em, który Googlebot może indeksować. Akceptowane są też pliki SVG. Bardzo małe ikony są powiększane i mogą wyglądać na rozmyte.

## Wskazówki dla ostrych ikon

- **Projektuj najpierw dla najmniejszego rozmiaru.** W 16×16 zmieści się tylko prosty kształt albo jedna–dwie litery. Usuń drobne detale i cienkie linie.
- **Wykorzystaj cały kwadrat.** Ikony ze zbyt dużym marginesem wyglądają na kartach na malutkie.
- **Testuj na jasnym i ciemnym tle.** Karty, wyniki wyszukiwania i ekrany główne używają obu.
- **Daj iOS jednolite tło.** iOS wypełnia przezroczyste obszary `apple-touch-icon` czernią.
- **Oznaczaj ikony maskable.** Android może przycinać ikony do kół lub zaokrąglonych kwadratów; dla ikon ze strefą bezpieczną użyj w manifeście `"purpose": "maskable"`.

## Ikony w dowolnym rozmiarze z Favicon.is

Gdy wyświetlasz ikony *innych* stron, pobieraj dokładnie taki rozmiar, jakiego potrzebujesz:

```text
https://favicon.is/github.com?size=32
https://favicon.is/github.com?size=64
https://favicon.is/github.com?larger=true
```

Obsługiwane wartości to 16, 32, 48, 64, 128 i 256 pikseli. Ikona nie będzie ostrzejsza niż największa ikona, jaką publikuje strona, więc sprawdź ją w [testerze faviconów](../../checker/).
