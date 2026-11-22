---
title: "O Favicon.is"
description: "Favicon.is to darmowe API faviconów, które zwraca ikonę dowolnej strony z jednego URL-a. Dla kogo jest, jak działa i na jakiej technologii powstało."
updated: 2026-11-22
---

Favicon.is to darmowa usługa, która zwraca favicon dowolnej strony z jednego URL-a. Dodaj domenę po `https://favicon.is/`, a dostaniesz ikonę strony jako obraz, gotowy do użycia w tagu `<img>`.

## Dla kogo jest ta usługa

- **Dla programistów**, którzy wyświetlają linki, zakładki lub integracje i chcą rozpoznawalnych ikon bez scrapowania stron.
- **Dla projektantów**, którzy w kilka sekund potrzebują logo znanej strony do makiety.
- **Dla webmasterów**, którzy chcą sprawdzić, jak wygląda ich własny favicon i czy wszystkie rozmiary są na miejscu.

## Jak to działa

Każde żądanie przechodzi przez krótki proces. Normalizujemy dane wejściowe, sprawdzamy, czy domena kończy się domeną najwyższego poziomu z bazy strefy głównej IANA, a następnie szukamy ikony w naszym cache edge, w naszym magazynie, w cache faviconów Google i na końcu na samej stronie. Najlepszy wynik jest zapisywany i serwowany z brzegu sieci, więc kolejne żądanie jest obsługiwane niemal natychmiast.

Jeśli ikona nie istnieje, dostajesz neutralną ikonę domyślną zamiast uszkodzonego obrazka.

## Technologia

Strona jest zbudowana w [Astro](https://astro.build) i TypeScript. API i strony działają na [Cloudflare Workers](https://workers.cloudflare.com) w centrach danych na całym świecie, a ikony są przechowywane w [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/). Lista obsługiwanych TLD pochodzi z [bazy strefy głównej IANA](https://www.iana.org/domains/root/db).

## Odpowiedzialne korzystanie

Favicon.is pobiera wyłącznie publicznie dostępne ikony, przedstawia się czytelnym user agentem i przechowuje najwyżej jedną kopię każdej ikony w każdym rozmiarze. Logo pozostają własnością ich właścicieli. Jeśli jesteś właścicielem strony i chcesz, aby jej ikona została usunięta z naszego cache, skontaktuj się z nami, korzystając z danych poniżej.

## Podziękowania

Favicon.is powstał z inspiracji Favicon.im i należy do rodziny małych, darmowych narzędzi internetowych wymienionych na dole każdej strony.
