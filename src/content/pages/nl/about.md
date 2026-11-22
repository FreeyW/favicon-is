---
title: Over Favicon.is
description: Favicon.is is een gratis favicon-API die het icoon van elke website via één URL teruggeeft. Lees voor wie het is, hoe het werkt en welke techniek erachter zit.
updated: 2026-11-22
---

Favicon.is is een gratis service die het favicon van elke website via één URL teruggeeft. Zet een domein achter `https://favicon.is/` en je krijgt het icoon van de site terug als afbeelding, klaar voor een `<img>`-tag.

## Voor wie is het?

- **Ontwikkelaars** die links, bladwijzers of integraties tonen en herkenbare iconen willen zonder websites te scrapen.
- **Ontwerpers** die binnen enkele seconden het logo van een bekende site nodig hebben voor een mock-up.
- **Webmasters** die willen controleren hoe hun eigen favicon eruitziet en of alle afmetingen aanwezig zijn.

## Hoe het werkt

Elk verzoek doorloopt een korte pipeline. We normaliseren de invoer, controleren of het domein eindigt op een topleveldomein uit de IANA Root Zone Database en zoeken het icoon vervolgens in onze edge-cache, onze opslag, de favicon-cache van Google en tot slot op de website zelf. Het beste resultaat wordt opgeslagen en vanaf de edge geleverd, zodat het volgende verzoek vrijwel direct wordt beantwoord.

Bestaat er geen icoon, dan krijg je een neutraal standaardicoon in plaats van een kapotte afbeelding.

## Technologie

De website is gebouwd met [Astro](https://astro.build) en TypeScript. De API en de pagina’s draaien op [Cloudflare Workers](https://workers.cloudflare.com) in datacenters over de hele wereld, en de iconen worden opgeslagen in [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/). De lijst met ondersteunde TLD’s komt uit de [IANA Root Zone Database](https://www.iana.org/domains/root/db).

## Verantwoord gebruik

Favicon.is haalt alleen openbaar beschikbare iconen op, identificeert zich met een duidelijke user agent en bewaart maximaal één kopie per icoon en grootte. Logo’s blijven eigendom van hun eigenaren. Ben je eigenaar van een website en wil je het icoon ervan uit onze cache laten verwijderen, neem dan contact met ons op via de gegevens hieronder.

## Credits

Favicon.is is geïnspireerd door Favicon.im en maakt deel uit van een familie kleine, gratis webtools, die onderaan elke pagina staan vermeld.
