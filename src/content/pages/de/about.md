---
title: Über Favicon.is
description: Die kostenlose Favicon-API Favicon.is liefert das Icon jeder Website per URL. Erfahre, für wen sie gedacht ist, wie sie funktioniert und was dahintersteckt.
updated: 2026-11-22
---

Favicon.is ist ein kostenloser Dienst, der das Favicon jeder Website über eine einzige URL liefert. Setz eine Domain hinter `https://favicon.is/` und du bekommst das Icon der Website als Bild zurück – bereit für ein `<img>`-Tag.

## Für wen ist Favicon.is?

- **Entwickler**, die Links, Lesezeichen oder Integrationen anzeigen und gut erkennbare Icons wollen, ohne Websites zu scrapen.
- **Designer**, die für ein Mock-up in Sekunden das Logo einer bekannten Website brauchen.
- **Webmaster**, die prüfen möchten, wie ihr eigenes Favicon aussieht und ob alle Größen vorhanden sind.

## So funktioniert es

Jede Anfrage durchläuft eine kurze Pipeline. Wir normalisieren die Eingabe, prüfen, ob die Domain auf eine Top-Level-Domain aus der IANA Root Zone Database endet, und suchen das Icon dann in unserem Edge-Cache, in unserem Speicher, im Favicon-Cache von Google und zuletzt auf der Website selbst. Das beste Ergebnis wird gespeichert und über das Edge-Netzwerk ausgeliefert, sodass die nächste Anfrage fast sofort beantwortet wird.

Gibt es kein Icon, erhältst du statt eines kaputten Bildes ein neutrales Standard-Icon.

## Technik

Die Website ist mit [Astro](https://astro.build) und TypeScript gebaut. Die API und die Seiten laufen auf [Cloudflare Workers](https://workers.cloudflare.com) in Rechenzentren auf der ganzen Welt, und die Icons werden in [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/) gespeichert. Die Liste der unterstützten TLDs stammt aus der [IANA Root Zone Database](https://www.iana.org/domains/root/db).

## Verantwortungsvolle Nutzung

Favicon.is ruft nur öffentlich verfügbare Icons ab, identifiziert sich mit einem eindeutigen User-Agent und speichert höchstens eine Kopie pro Icon und Größe. Logos bleiben Eigentum ihrer Inhaber. Wenn dir eine Website gehört und du ihr Icon aus unserem Cache entfernen lassen möchtest, kontaktiere uns über die unten stehenden Angaben.

## Danksagung

Favicon.is wurde von Favicon.im inspiriert und gehört zu einer Familie kleiner, kostenloser Web-Tools, die unten auf jeder Seite aufgeführt sind.
