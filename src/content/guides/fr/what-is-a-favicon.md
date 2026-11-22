---
title: "Qu’est-ce qu’un favicon ? Guide rapide des icônes de site"
description: "Découvrez ce qu’est un favicon, où navigateurs et moteurs de recherche l’affichent, pourquoi il compte pour votre marque et comment le navigateur le trouve."
order: 1
updated: 2026-11-22
---

Un **favicon** (abréviation de *favorite icon*, « icône favorite ») est la petite image qui représente un site web. Vous le voyez dans les onglets du navigateur, dans vos favoris et votre historique, dans la barre d’adresse, à côté des résultats de recherche et sur l’écran d’accueil de votre téléphone lorsque vous enregistrez un site comme raccourci.

## Où les favicons apparaissent

- **Onglets du navigateur.** Quand de nombreux onglets sont ouverts, l’icône est souvent le seul moyen de les distinguer.
- **Favoris et historique.** Les icônes permettent de parcourir de longues listes d’un coup d’œil.
- **Résultats de recherche.** Google et les autres moteurs de recherche affichent le favicon à côté du nom de votre site, sur mobile comme sur ordinateur.
- **Écrans d’accueil et lanceurs d’applications.** Quand quelqu’un ajoute votre site à son téléphone, l’icône tactile devient l’icône de l’application.
- **Autres applications.** Messageries, services de lecture différée, gestionnaires de mots de passe et tableaux de bord utilisent tous les favicons pour identifier les liens.

## Un peu d’histoire

Les favicons ont été introduits par Internet Explorer 5 en 1999. Le navigateur cherchait un fichier nommé `favicon.ico` à la racine d’un site web et l’affichait dans le menu *Favoris* (*Favorites* en anglais), d’où leur nom. Plus tard, HTML a ajouté la balise `<link rel="icon">` pour que les sites puissent choisir l’emplacement, le format et la taille de leur icône.

Aujourd’hui, un site web propose généralement plusieurs icônes : un petit ICO ou PNG pour les onglets, un SVG qui s’adapte à toutes les tailles, une `apple-touch-icon` pour iOS et, pour Android, des fichiers PNG plus grands listés dans un manifeste d’application web.

## Pourquoi les favicons sont importants

1. **Reconnaissance.** Une icône claire aide les gens à retrouver votre onglet parmi des dizaines d’autres et renforce la confiance dans votre marque.
2. **Image professionnelle.** Sans favicon, le navigateur affiche une icône générique, ce qui donne une impression de travail inachevé.
3. **Visibilité dans les recherches.** Les moteurs de recherche affichent les favicons dans les résultats, et une icône distinctive peut améliorer le taux de clics.
4. **Moins d’erreurs.** Les navigateurs demandent `/favicon.ico` automatiquement. Sans ce fichier, les journaux de votre serveur se remplissent d’erreurs 404.

## Comment les navigateurs trouvent un favicon

Au chargement d’une page, le navigateur parcourt le `<head>` à la recherche de balises `<link>` dont l’attribut `rel` contient `icon`. Il choisit le meilleur candidat en fonction des attributs `sizes` et `type` et de l’écran sur lequel il affiche la page. En l’absence de toute déclaration, il se rabat sur `https://example.com/favicon.ico`.

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Obtenir le favicon de n’importe quel site

Si vous développez un produit qui affiche des liens vers d’autres sites web, inutile d’extraire vous-même l’icône de chaque site. Favicon.is renvoie l’icône de n’importe quel domaine à partir d’une seule URL :

```html
<img src="https://favicon.is/wikipedia.org" width="32" height="32" alt="Wikipedia">
```

Découvrez ensuite [les tailles dont vous avez besoin](../favicon-sizes/) et [les formats de fichier à utiliser](../favicon-formats/).
