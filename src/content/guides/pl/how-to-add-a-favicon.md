---
title: "Jak dodać favicon do strony internetowej (krok po kroku)"
description: "Poradnik krok po kroku: jak dodać favicon do dowolnej strony – tagi HTML, manifest aplikacji webowej, ikony Apple touch i co zrobić, gdy favicon się nie aktualizuje."
order: 4
updated: 2026-11-22
---

Dodanie faviconu zajmuje około dziesięciu minut. Ten poradnik przeprowadzi cię przez tworzenie plików, dodawanie kodu HTML i sprawdzanie efektu.

## 1. Przygotuj obraz źródłowy

Zacznij od kwadratowego obrazu o rozmiarze co najmniej **512×512 pikseli**, najlepiej wektorowej (SVG) wersji twojego logo. Uprość go: przy 16 pikselach tekst i cienkie linie znikają. Wiele marek używa w faviconie jednej litery lub symbolu.

## 2. Utwórz pliki ikon

Wyeksportuj te pliki z narzędzia graficznego lub generatora faviconów:

- `favicon.ico` – 32×32 (opcjonalnie z 16×16 i 48×48 w środku)
- `icon.svg` – wersja skalowalna
- `apple-touch-icon.png` – 180×180 z jednolitym tłem
- `icon-192.png` i `icon-512.png` – dla manifestu aplikacji webowej

Umieść je w katalogu głównym strony (tym samym, w którym jest strona główna).

## 3. Dodaj tagi HTML

Wklej te wiersze w sekcji `<head>` każdej strony:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Większość frameworków i kreatorów stron ma na to specjalne miejsce: folder `public` w projektach Astro, Next.js i Vite, ustawienia „Tożsamość witryny” (Site Identity) w WordPressie albo ustawienia motywu w Shopify.

## 4. Dodaj manifest aplikacji webowej

Utwórz plik `manifest.webmanifest` obok ikon:

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

## 5. Sprawdź efekt

Otwórz swoją stronę w nowej karcie przeglądarki, a potem sprawdź ją w [testerze faviconów Favicon.is](../../checker/). Wyświetli on wszystkie ikony zadeklarowane przez stronę, sprawdzi, czy pliki się ładują, i powie ci, których rozmiarów brakuje.

## Rozwiązywanie problemów: favicon się nie aktualizuje

Przeglądarki bardzo agresywnie zapisują favicony w pamięci podręcznej. Jeśli podmieniłeś ikonę, a nadal widzisz starą:

- Dodaj do URL-a wersję, np. `/icon.svg?v=2`, i zaktualizuj tagi `<link>`.
- Otwórz bezpośrednio URL ikony i wymuś przeładowanie.
- Wyczyść pamięć podręczną (cache) przeglądarki albo przetestuj w oknie prywatnym.
- Wyszukiwarki muszą ponownie zaindeksować twoją stronę główną; to może potrwać dni lub tygodnie.

## Bonus: pokazuj favicony innych stron

Jeśli twoja aplikacja wyświetla linki do innych stron, użyj Favicon.is zamiast samodzielnie hostować ich ikony:

```html
<img src="https://favicon.is/example.com?size=32" width="16" height="16" alt="">
```
