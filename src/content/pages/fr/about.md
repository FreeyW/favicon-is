---
title: "À propos de Favicon.is"
description: "Favicon.is, l’API de favicons gratuite, renvoie l’icône de tout site via une seule URL. Découvrez à qui elle s’adresse, son fonctionnement et sa technologie."
updated: 2026-11-22
---

Favicon.is est un service gratuit qui renvoie le favicon de n’importe quel site web à partir d’une seule URL. Ajoutez un domaine après `https://favicon.is/` et vous recevez l’icône du site sous forme d’image, prête pour une balise `<img>`.

## À qui s’adresse le service

- **Aux développeurs** qui affichent des liens, des favoris ou des intégrations et veulent des icônes reconnaissables sans avoir à extraire le contenu des sites web.
- **Aux designers** qui ont besoin en quelques secondes du logo d’un site connu pour une maquette.
- **Aux webmasters** qui veulent vérifier l’apparence de leur propre favicon et s’assurer que toutes les tailles sont en place.

## Comment ça marche

Chaque requête passe par un court pipeline. Nous normalisons la saisie, vérifions que le domaine se termine par un domaine de premier niveau de la base de données de la zone racine de l’IANA, puis cherchons l’icône dans notre cache edge, dans notre stockage, dans le cache de favicons de Google et enfin sur le site web lui-même. Le meilleur résultat est stocké et servi depuis l’edge : la requête suivante est donc quasi instantanée.

Si aucune icône n’existe, vous recevez une icône neutre par défaut au lieu d’une image cassée.

## Technologie

Le site est construit avec [Astro](https://astro.build) et TypeScript. L’API et les pages tournent sur [Cloudflare Workers](https://workers.cloudflare.com) dans des centres de données du monde entier, et les icônes sont stockées dans [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/). La liste des TLD pris en charge provient de la [base de données de la zone racine de l’IANA](https://www.iana.org/domains/root/db).

## Utilisation responsable

Favicon.is ne récupère que des icônes accessibles publiquement, s’identifie avec un user agent explicite et stocke au plus une copie par icône et par taille. Les logos restent la propriété de leurs détenteurs. Si vous êtes propriétaire d’un site web et souhaitez que son icône soit retirée de notre cache, contactez-nous à l’aide des coordonnées ci-dessous.

## Crédits

Favicon.is s’inspire de Favicon.im et fait partie d’une famille de petits outils web gratuits, listés en bas de chaque page.
