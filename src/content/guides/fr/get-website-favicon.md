---
title: "Comment obtenir le favicon de n’importe quel site web"
description: "Cinq façons de récupérer le favicon d’un site, de /favicon.ico et du HTML de la page aux API de favicon, avec exemples de code, avantages et inconvénients."
order: 5
updated: 2026-11-22
---

Que vous développiez un gestionnaire de favoris, une page « link in bio », un tableau de bord ou une extension de navigateur, vous aurez tôt ou tard besoin des icônes d’autres sites web. Voici les options, de la plus manuelle à la plus simple.

## 1. Demander /favicon.ico

La convention la plus ancienne : beaucoup de sites servent encore une icône à la racine.

```text
https://example.com/favicon.ico
```

**Avantages :** aucun service tiers. **Inconvénients :** une grande partie des sites n’ont pas ce fichier, il ne fait souvent que 16×16 ou 32×32 pixels, et vous obtenez une image cassée lorsqu’il est absent.

## 2. Lire le HTML de la page

La méthode fiable consiste à télécharger la page d’accueil et à chercher `<link rel="icon">`, `<link rel="apple-touch-icon">` et le manifeste d’application web, puis à choisir la meilleure taille.

```js
const html = await fetch('https://example.com').then((r) => r.text());
const links = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
```

**Avantages :** trouve l’icône réellement déclarée par le site. **Inconvénients :** vous devez gérer vous-même les redirections, les URL relatives, les délais d’expiration, les sites qui bloquent les robots, le cache et les solutions de repli – et vous ne pouvez pas le faire depuis un navigateur à cause de CORS.

## 3. Utiliser les API des extensions de navigateur

Les extensions Chrome peuvent utiliser la permission `favicon` et `chrome-extension://<id>/_favicon/?pageUrl=…` pour obtenir les icônes que le navigateur connaît déjà. Cela ne fonctionne qu’à l’intérieur d’une extension et uniquement pour les sites que l’utilisateur a visités.

## 4. Utiliser le service de favicons d’un moteur de recherche

Google et DuckDuckGo exposent les icônes qu’ils collectent pendant l’exploration du Web :

```text
https://www.google.com/s2/favicons?domain=example.com&sz=64
https://icons.duckduckgo.com/ip3/example.com.ico
```

**Avantages :** rapide et large couverture. **Inconvénients :** non officiel et non documenté, contrôle limité sur la taille et le format, et aucune information sur ce qui a été renvoyé.

## 5. Utiliser Favicon.is

Favicon.is combine toutes ces méthodes derrière une seule URL. Il consulte le cache de favicons de Google, lit le HTML du site, essaie `/favicon.ico`, stocke le résultat sur Cloudflare R2 et renvoie toujours une image :

```html
<img src="https://favicon.is/example.com" width="32" height="32" alt="">
```

- Choisissez une taille de `?size=16` à `?size=256`, ou utilisez `?larger=true`.
- Utilisez `?original=true` pour ignorer Google et lire les déclarations d’icônes du site lui-même.
- Consultez l’en-tête `X-Source` pour savoir d’où vient l’icône.
- Seuls les domaines dont le TLD figure dans la base de données de la zone racine de l’IANA sont recherchés : les fautes de frappe et les noms privés renvoient instantanément l’icône par défaut.

Consultez la [documentation de l’API](../../docs/) pour découvrir toutes les options, ou copiez un extrait depuis les [exemples](../../examples/).
