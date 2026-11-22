---
title: "Czym jest favicon? Krótki poradnik o ikonach stron"
description: "Dowiedz się, czym jest favicon, gdzie pokazują go przeglądarki i wyszukiwarki, dlaczego jest ważny dla marki i jak przeglądarki go znajdują."
order: 1
updated: 2026-11-22
---

**Favicon** (skrót od *favorite icon*, czyli „ikona ulubionych”) to mały obrazek, który reprezentuje stronę internetową. Widzisz go na kartach przeglądarki, w zakładkach i historii, na pasku adresu, obok wyników wyszukiwania i na ekranie głównym telefonu, gdy zapisujesz stronę jako skrót.

## Gdzie pojawiają się favicony

- **Karty przeglądarki.** Gdy masz otwartych wiele kart, ikona jest często jedynym, co pozwala je odróżnić.
- **Zakładki i historia.** Dzięki ikonom długie listy da się przejrzeć jednym rzutem oka.
- **Wyniki wyszukiwania.** Google i inne wyszukiwarki pokazują favicon obok nazwy strony – na urządzeniach mobilnych i na komputerach.
- **Ekrany główne i launchery aplikacji.** Gdy ktoś doda twoją stronę do telefonu, ikona dotykowa staje się ikoną aplikacji.
- **Inne aplikacje.** Komunikatory, aplikacje do czytania później, menedżery haseł i dashboardy używają faviconów do oznaczania linków.

## Trochę historii

Favicony wprowadził Internet Explorer 5 w 1999 roku. Przeglądarka szukała pliku `favicon.ico` w katalogu głównym strony i pokazywała go w menu *Ulubione* (Favorites) – stąd nazwa. Później w HTML pojawił się tag `<link rel="icon">`, dzięki któremu strony mogą same wybierać lokalizację, format i rozmiar swojej ikony.

Dziś jedna strona zwykle udostępnia kilka ikon: małą ICO lub PNG dla kart, SVG skalujące się do dowolnego rozmiaru, `apple-touch-icon` dla iOS i większe pliki PNG wymienione w manifeście aplikacji webowej dla Androida.

## Dlaczego favicony są ważne

1. **Rozpoznawalność.** Wyraźna ikona pomaga znaleźć twoją kartę wśród dziesiątek innych i buduje zaufanie do marki.
2. **Profesjonalny wygląd.** Bez faviconu wyświetla się ogólny placeholder, przez co strona wygląda na niedokończoną.
3. **Widoczność w wyszukiwarce.** Wyszukiwarki pokazują favicony w wynikach, a charakterystyczna ikona może poprawić współczynnik klikalności.
4. **Mniej błędów.** Przeglądarki automatycznie żądają `/favicon.ico`. Jeśli go nie masz, logi serwera zapełniają się błędami 404.

## Jak przeglądarki znajdują favicon

Podczas ładowania strony przeglądarka szuka w `<head>` tagów `<link>`, których atrybut `rel` zawiera `icon`. Najlepszego kandydata wybiera na podstawie atrybutów `sizes` i `type` oraz ekranu, na którym rysuje stronę. Jeśli nie ma żadnej deklaracji, sięga po `https://example.com/favicon.ico`.

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Jak pobrać favicon dowolnej strony

Jeśli budujesz produkt, który pokazuje linki do innych stron, nie musisz samodzielnie scrapować każdej z nich. Favicon.is zwraca ikonę dowolnej domeny z jednego URL-a:

```html
<img src="https://favicon.is/wikipedia.org" width="32" height="32" alt="Wikipedia">
```

Następnie sprawdź, [jakich rozmiarów potrzebujesz](../favicon-sizes/) i [jakich formatów plików użyć](../favicon-formats/).
