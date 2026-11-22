---
title: "Comment ajouter un favicon à votre site web (étape par étape)"
description: "Guide pas à pas pour ajouter un favicon à votre site : balises HTML, manifeste web, icônes Apple Touch et que faire si le favicon ne se met pas à jour."
order: 4
updated: 2026-11-22
---

Ajouter un favicon prend une dizaine de minutes. Ce guide vous accompagne de la création des fichiers jusqu’à la vérification du résultat, en passant par l’ajout du HTML.

## 1. Préparez votre image source

Partez d’une image carrée d’au moins **512×512 pixels**, idéalement une version vectorielle (SVG) de votre logo. Simplifiez-la : à 16 pixels, le texte et les traits fins disparaissent. Beaucoup de marques utilisent une seule lettre ou un symbole pour leur favicon.

## 2. Créez les fichiers d’icône

Exportez ces fichiers depuis votre outil de design ou un générateur de favicon :

- `favicon.ico` – 32×32 (avec éventuellement 16×16 et 48×48 à l’intérieur)
- `icon.svg` – la version vectorielle
- `apple-touch-icon.png` – 180×180 avec un fond opaque
- `icon-192.png` et `icon-512.png` – pour le manifeste d’application web

Placez-les dans le dossier racine de votre site web (le même dossier que votre page d’accueil).

## 3. Ajoutez les balises HTML

Collez ces lignes dans le `<head>` de chaque page :

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

La plupart des frameworks et des créateurs de sites prévoient un emplacement dédié : le dossier `public` dans les projets Astro, Next.js et Vite, les réglages « Identité du site » dans WordPress ou les paramètres du thème dans Shopify.

## 4. Ajoutez un manifeste d’application web

Créez `manifest.webmanifest` à côté de vos icônes :

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

## 5. Vérifiez le résultat

Ouvrez votre site dans un nouvel onglet, puis passez-le au [vérificateur Favicon.is](../../checker/). Il liste toutes les icônes déclarées par votre page, vérifie que les fichiers se chargent et vous indique les tailles manquantes.

## Dépannage : mon favicon ne se met pas à jour

Les navigateurs mettent les favicons en cache de façon très agressive. Si vous avez remplacé votre icône mais voyez toujours l’ancienne :

- Ajoutez une version à l’URL, par exemple `/icon.svg?v=2`, et mettez à jour les balises `<link>`.
- Ouvrez directement l’URL de l’icône et forcez le rechargement.
- Videz le cache du navigateur ou testez dans une fenêtre de navigation privée.
- Les moteurs de recherche doivent explorer à nouveau votre page d’accueil, ce qui peut prendre des jours, voire des semaines.

## Bonus : afficher les favicons d’autres sites web

Si votre application affiche des liens vers d’autres sites, utilisez Favicon.is au lieu d’héberger vous-même leurs icônes :

```html
<img src="https://favicon.is/example.com?size=32" width="16" height="16" alt="">
```
