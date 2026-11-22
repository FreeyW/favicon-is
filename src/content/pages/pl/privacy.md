---
title: "Polityka prywatności"
description: "Jak Favicon.is przetwarza dane: co jest rejestrowane przy żądaniu ikony lub odwiedzinach strony, jakie usługi zewnętrzne są zaangażowane i jakie prawa przysługują użytkownikom."
updated: 2026-11-22
---

Niniejsza polityka wyjaśnia, jakie informacje przetwarza Favicon.is podczas korzystania z API faviconów lub odwiedzania tej strony. W skrócie: zbieramy możliwie najmniej danych i nie sprzedajemy ich.

## Żądania ikon

Gdy aplikacja lub przeglądarka żąda ikony, np. `https://favicon.is/example.com`, przetwarzamy:

- **Żądaną domenę i parametry** – w celu znalezienia i zwrócenia ikony. Domena i ikona są zapisywane w naszym cache (Cloudflare R2), aby można było szybko udostępnić je ponownie.
- **Techniczne dane żądania**, takie jak adres IP, user agent i czas, które nasz dostawca hostingu Cloudflare przetwarza w celu dostarczenia odpowiedzi, ochrony usługi przed nadużyciami oraz tworzenia zbiorczych statystyk. Nie wykorzystujemy tych danych do identyfikowania osób.

Odpowiedzi z ikonami nie ustawiają plików cookie.

## Pobieranie ikon z innych stron

Aby znaleźć ikonę, nasze serwery mogą łączyć się z usługą faviconów Google lub z żądaną stroną. Żądania te są wysyłane z naszych serwerów, a nie z urządzenia użytkownika, i zawierają wyłącznie nazwę domeny. Adres IP użytkownika nie jest przekazywany.

Inaczej działa tester faviconów: wyświetla on ikony sprawdzanej strony w przeglądarce użytkownika, więc przeglądarka ładuje te obrazy bezpośrednio z tej strony.

## Odwiedziny tej strony

- **Analityka.** Do zliczania odsłon używamy przyjaznego dla prywatności skryptu analitycznego, który nie korzysta z plików cookie. Nie śledzi on użytkowników na innych stronach.
- **Reklamy.** Na niektórych stronach mogą być wyświetlane reklamy Google AdSense. Google może używać plików cookie do wyświetlania reklam i mierzenia ich skuteczności; zob. [jak Google wykorzystuje informacje z witryn korzystających z jego usług](https://policies.google.com/technologies/partner-sites). Personalizacją reklam można zarządzać w ustawieniach konta Google.
- **Preferencje.** Wybrany motyw (jasny lub ciemny) jest zapisywany w pamięci lokalnej przeglądarki i nigdy nie jest do nas przesyłany.

## Przechowywanie danych

Ikony w cache są przechowywane tak długo, jak są przydatne, i regularnie odświeżane. Logi żądań są przechowywane przez Cloudflare przez ograniczony czas, zgodnie z jego własnymi zasadami przechowywania danych.

## Prawa użytkowników

W zależności od miejsca zamieszkania użytkownikom może przysługiwać prawo dostępu do danych osobowych, ich sprostowania lub usunięcia, a także prawo do sprzeciwu wobec ich przetwarzania. Ponieważ nie łączymy żądań z konkretnymi osobami, zazwyczaj nie posiadamy danych osobowych, które można przypisać danej osobie, ale nadal można się z nami skontaktować, korzystając z danych poniżej.

## Zmiany

Możemy aktualizować niniejszą politykę, gdy usługa ulega zmianom. Data na górze tej strony wskazuje najnowszą wersję.
