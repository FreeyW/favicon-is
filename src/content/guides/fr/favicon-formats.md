---
title: "Formats de favicon : ICO vs PNG vs SVG expliqués"
description: "Comparez les formats de favicon ICO, PNG, SVG, GIF et WebP, découvrez quels navigateurs les prennent en charge et quelle combinaison utiliser aujourd’hui."
order: 3
updated: 2026-11-22
---

Un favicon peut être enregistré dans plusieurs formats d’image. Chacun a ses atouts, et la meilleure configuration en combine deux ou trois.

## ICO

Le format de favicon d’origine. Un fichier `.ico` est un conteneur qui peut regrouper plusieurs images bitmap de tailles différentes, par exemple 16×16, 32×32 et 48×48, afin que le système d’exploitation choisisse la bonne.

- **Avantages :** pris en charge par tous les navigateurs ayant jamais existé ; demandé automatiquement à l’adresse `/favicon.ico` ; un seul fichier pour plusieurs tailles.
- **Inconvénients :** fichier plus lourd ; pas de mise à l’échelle vectorielle ; nécessite un outil spécial pour le créer.

**À utiliser pour :** un unique `favicon.ico` à la racine de votre site, surtout pour la compatibilité.

## PNG

Le PNG est aujourd’hui le format le plus répandu pour les favicons. Il gère la transparence et se compresse bien.

- **Avantages :** pris en charge partout ; facile à exporter depuis n’importe quel outil de design ; idéal pour l’`apple-touch-icon` en 180×180 et les icônes de manifeste en 192×192 et 512×512.
- **Inconvénients :** chaque taille est un fichier distinct ; il ne s’agrandit pas au-delà de sa taille en pixels.

**À utiliser pour :** les icônes tactiles, les icônes de manifeste et comme solution de repli pour les navigateurs qui ne prennent pas en charge le SVG.

## SVG

Le SVG est un format vectoriel : un seul petit fichier reste net à toutes les tailles et sur toutes les densités d’écran.

- **Avantages :** parfaitement net partout ; fichier très léger ; peut réagir au mode sombre grâce aux media queries CSS.
- **Inconvénients :** la prise en charge par les navigateurs n’est pas encore universelle, gardez donc un ICO ou un PNG en solution de repli ; les logos très détaillés peuvent tout de même nécessiter une version simplifiée pour le 16×16.

Un favicon SVG peut changer de couleurs lorsque l’utilisateur préfère un thème sombre :

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    path { fill: #0f172a; }
    @media (prefers-color-scheme: dark) { path { fill: #f8fafc; } }
  </style>
  <path d="M4 4h24v24H4z"/>
</svg>
```

## GIF, JPEG et WebP

Ces formats fonctionnent dans la plupart des navigateurs modernes, mais présentent peu d’avantages pour les icônes. Le GIF permet l’animation, mais les favicons animés distraient et ne s’affichent pas partout. Le JPEG ne gère pas la transparence. Le WebP et l’AVIF sont efficaces, mais ne sont pas pris en charge par toutes les plateformes qui lisent les favicons.

## Quels formats utiliser ?

La combinaison la plus fiable aujourd’hui est la suivante :

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Les navigateurs qui comprennent le SVG utiliseront `icon.svg` ; les autres se rabattront sur `favicon.ico`.

## Quel format Favicon.is renvoie-t-il ?

Favicon.is renvoie l’icône dans le format fourni par le site web. Dans la plupart des cas, il s’agit de PNG, mais ce peut être de l’ICO, du SVG, du JPEG, du GIF ou du WebP. L’en-tête de réponse `Content-Type` indique toujours lequel vous avez reçu, et tous les formats fonctionnent dans une balise `<img>` classique.
