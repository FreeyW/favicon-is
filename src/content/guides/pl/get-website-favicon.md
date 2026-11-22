---
title: "Jak pobrać favicon dowolnej strony internetowej"
description: "Pięć sposobów na pobranie faviconu strony – od /favicon.ico i kodu HTML po API faviconów – z przykładami kodu oraz zaletami i wadami każdego z nich."
order: 5
updated: 2026-11-22
---

Niezależnie od tego, czy budujesz menedżer zakładek, stronę link-in-bio, dashboard czy rozszerzenie przeglądarki, prędzej czy później będziesz potrzebować ikon innych stron. Oto dostępne opcje – od najbardziej ręcznej do najprostszej.

## 1. Pobierz /favicon.ico

Najstarsza konwencja: wiele stron wciąż udostępnia ikonę w katalogu głównym.

```text
https://example.com/favicon.ico
```

**Zalety:** żadnych usług zewnętrznych. **Wady:** spora część stron nie ma tego pliku, często ma on tylko 16×16 lub 32×32 piksele, a gdy go brakuje, dostajesz uszkodzony obrazek.

## 2. Odczytaj kod HTML strony

Niezawodny sposób to pobranie strony głównej i wyszukanie `<link rel="icon">`, `<link rel="apple-touch-icon">` oraz manifestu aplikacji webowej, a następnie wybranie najlepszego rozmiaru.

```js
const html = await fetch('https://example.com').then((r) => r.text());
const links = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
```

**Zalety:** znajduje ikonę, którą strona faktycznie deklaruje. **Wady:** przekierowania, względne URL-e, timeouty, strony blokujące boty, cache i fallbacki musisz obsłużyć sam – a z przeglądarki nie zrobisz tego w ogóle z powodu CORS.

## 3. Użyj API rozszerzeń przeglądarki

Rozszerzenia Chrome mogą używać uprawnienia `favicon` i adresu `chrome-extension://<id>/_favicon/?pageUrl=…`, aby pobierać ikony, które przeglądarka już zna. Działa to tylko wewnątrz rozszerzenia i tylko dla stron, które użytkownik odwiedził.

## 4. Użyj usługi faviconów wyszukiwarki

Google i DuckDuckGo udostępniają ikony, które zbierają podczas indeksowania:

```text
https://www.google.com/s2/favicons?domain=example.com&sz=64
https://icons.duckduckgo.com/ip3/example.com.ico
```

**Zalety:** szybko i z szerokim zasięgiem. **Wady:** nieoficjalne i nieudokumentowane, ograniczona kontrola nad rozmiarem i formatem oraz brak informacji o tym, co zostało zwrócone.

## 5. Użyj Favicon.is

Favicon.is łączy wszystkie powyższe metody za jednym URL-em. Sprawdza cache faviconów Google, odczytuje kod HTML strony, próbuje `/favicon.ico`, zapisuje wynik w Cloudflare R2 i zawsze zwraca obraz:

```html
<img src="https://favicon.is/example.com" width="32" height="32" alt="">
```

- Wybierz rozmiar od `?size=16` do `?size=256` albo użyj `?larger=true`.
- Użyj `?original=true`, aby pominąć Google i odczytać deklaracje ikon samej strony.
- Sprawdź nagłówek `X-Source`, aby zobaczyć, skąd pochodzi ikona.
- Wyszukiwane są tylko domeny z TLD z bazy strefy głównej IANA, więc dla literówek i nazw prywatnych od razu zwracana jest ikona domyślna.

Wszystkie opcje znajdziesz w [dokumentacji API](../../docs/), a gotowy fragment kodu możesz skopiować z [przykładów](../../examples/).
