---
title: "Formaty faviconu: ICO, PNG czy SVG – porównanie"
description: "Porównaj formaty faviconu ICO, PNG, SVG, GIF i WebP, sprawdź, które przeglądarki je obsługują, i dowiedz się, jakiego zestawu używać dziś."
order: 3
updated: 2026-11-22
---

Favicon możesz zapisać w kilku formatach graficznych. Każdy ma swoje mocne strony, a najlepsza konfiguracja łączy dwa lub trzy z nich.

## ICO

Pierwotny format faviconów. Plik `.ico` to kontener, który może zawierać kilka bitmap w różnych rozmiarach, np. 16×16, 32×32 i 48×48, dzięki czemu system operacyjny może wybrać odpowiednią.

- **Zalety:** obsługiwany przez każdą przeglądarkę, jaka kiedykolwiek powstała; automatycznie pobierany spod `/favicon.ico`; jeden plik dla kilku rozmiarów.
- **Wady:** większy rozmiar pliku; brak skalowania wektorowego; do utworzenia potrzebne jest specjalne narzędzie.

**Do czego go używać:** jeden plik `favicon.ico` w katalogu głównym strony, głównie dla kompatybilności.

## PNG

PNG to dziś najpopularniejszy format faviconów. Obsługuje przezroczystość i dobrze się kompresuje.

- **Zalety:** uniwersalna obsługa; łatwy eksport z dowolnego narzędzia graficznego; idealny dla `apple-touch-icon` 180×180 oraz ikon manifestu 192×192 i 512×512.
- **Wady:** każdy rozmiar to osobny plik; nie skaluje się powyżej swojego rozmiaru w pikselach.

**Do czego go używać:** ikony dotykowe, ikony manifestu i fallback dla przeglądarek, które nie obsługują SVG.

## SVG

SVG to format wektorowy, więc jeden mały plik pozostaje ostry w każdym rozmiarze i przy każdej gęstości pikseli ekranu.

- **Zalety:** idealna ostrość wszędzie; malutki rozmiar pliku; może reagować na tryb ciemny dzięki zapytaniom o media w CSS.
- **Wady:** obsługa w przeglądarkach nie jest jeszcze powszechna, więc zachowaj fallback w ICO lub PNG; bardzo szczegółowe logo mogą nadal wymagać uproszczonej wersji dla 16×16.

Favicon SVG może zmieniać kolory, gdy użytkownik preferuje ciemny motyw:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    path { fill: #0f172a; }
    @media (prefers-color-scheme: dark) { path { fill: #f8fafc; } }
  </style>
  <path d="M4 4h24v24H4z"/>
</svg>
```

## GIF, JPEG i WebP

Te formaty działają w większości nowoczesnych przeglądarek, ale w przypadku ikon mają niewiele zalet. GIF obsługuje animację, ale animowane favicony rozpraszają i nie wszędzie są wyświetlane. JPEG nie obsługuje przezroczystości. WebP i AVIF są wydajne, ale nie obsługuje ich każda platforma, która odczytuje favicony.

## Jakich formatów używać?

Najbardziej niezawodny zestaw na dziś to:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Przeglądarki, które rozumieją SVG, użyją `icon.svg`; pozostałe sięgną po `favicon.ico`.

## W jakim formacie Favicon.is zwraca ikony?

Favicon.is zwraca ikonę w formacie, w jakim udostępnia ją strona. Najczęściej jest to PNG, ale może to być też ICO, SVG, JPEG, GIF lub WebP. Nagłówek odpowiedzi `Content-Type` zawsze informuje, jaki format otrzymałeś, a każdy z nich działa w zwykłym tagu `<img>`.
