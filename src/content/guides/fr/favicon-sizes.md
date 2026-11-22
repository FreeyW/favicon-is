---
title: "Tailles de favicon en 2026 : l’aide-mémoire complet"
description: "Quelles tailles de favicon vous faut-il vraiment ? La liste pratique des tailles d’icônes pour les navigateurs, Google Search, iOS, Android et les manifestes web."
order: 2
updated: 2026-11-22
---

Les navigateurs, les systèmes d’exploitation et les moteurs de recherche affichent tous les icônes de sites à des tailles différentes. Bonne nouvelle : quelques fichiers suffisent pour qu’elles soient nettes partout.

## La réponse courte

Pour presque tous les sites web, cet ensemble suffit :

| Fichier | Taille | Utilisé par |
| --- | --- | --- |
| `favicon.ico` | 32×32 (peut aussi contenir 16×16 et 48×48) | Tous les navigateurs, les anciens outils, la requête automatique `/favicon.ico` |
| `icon.svg` | Vectoriel | Navigateurs modernes, net à toutes les tailles, peut prendre en charge le mode sombre |
| `apple-touch-icon.png` | 180×180 | Écrans d’accueil d’iPhone et d’iPad |
| `icon-192.png` | 192×192 | Écran d’accueil Android, manifeste d’application web |
| `icon-512.png` | 512×512 | Écrans de démarrage Android, applications web installables |

## Tailles de favicon courantes et leur utilité

| Taille | Où elle apparaît |
| --- | --- |
| 16×16 | Onglets et favoris sur les écrans de résolution standard |
| 32×32 | Onglets sur les écrans haute résolution, raccourcis de la barre des tâches Windows |
| 48×48 | Icônes de site Windows ; la taille minimale recommandée par Google Search |
| 96×96, 144×144 | Google Search sur les écrans haute densité (multiples de 48) |
| 180×180 | `apple-touch-icon` pour iOS et iPadOS |
| 192×192 | Écran d’accueil Android avec Chrome et taille minimale du manifeste |
| 512×512 | Icône du manifeste pour les écrans de démarrage et les boutiques d’applications des PWA |

## Exigences de Google Search

Google affiche votre favicon à côté de vos pages dans les résultats de recherche. Selon les consignes de Google, l’icône doit être **carrée**, mesurer au moins **48×48 pixels** (ou un multiple de 48, comme 96×96 ou 144×144) et être accessible à une URL stable que Googlebot est autorisé à explorer. Les fichiers SVG sont également acceptés. Les icônes très petites sont agrandies et peuvent paraître floues.

## Conseils pour des icônes nettes

- **Concevez d’abord pour la plus petite taille.** En 16×16, il n’y a de place que pour une forme simple ou une ou deux lettres. Supprimez les détails fins et les traits minces.
- **Utilisez tout le carré.** Les icônes avec trop de marge paraissent minuscules dans les onglets.
- **Testez sur fond clair et sur fond sombre.** Les onglets, les résultats de recherche et les écrans d’accueil utilisent les deux.
- **Donnez à iOS un fond opaque.** iOS remplit en noir les zones transparentes de `apple-touch-icon`.
- **Signalez les icônes adaptatives (maskable).** Android peut recadrer les icônes en cercles ou en « squircles » ; utilisez `"purpose": "maskable"` dans le manifeste pour les icônes dotées d’une zone de sécurité.

## Obtenir des icônes de toutes tailles avec Favicon.is

Lorsque vous affichez les icônes d’*autres* sites web, demandez exactement la taille dont vous avez besoin :

```text
https://favicon.is/github.com?size=32
https://favicon.is/github.com?size=64
https://favicon.is/github.com?larger=true
```

Les valeurs prises en charge sont 16, 32, 48, 64, 128 et 256 pixels. Le résultat ne peut pas être plus net que la plus grande icône publiée par le site : vérifiez-la avec le [vérificateur de favicon](../../checker/).
