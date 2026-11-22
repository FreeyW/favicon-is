---
title: "Tamaños de favicon en 2026: la guía de referencia completa"
description: "¿Qué tamaños de favicon necesitas de verdad? Una lista práctica de tamaños de icono para navegadores, Google Search, iOS, Android y manifiestos de apps web."
order: 2
updated: 2026-11-22
---

Los navegadores, los sistemas operativos y los buscadores muestran los iconos de los sitios web en tamaños distintos. La buena noticia: solo necesitas unos pocos archivos para que se vean nítidos en todas partes.

## La respuesta corta

Para casi cualquier sitio web, este conjunto es suficiente:

| Archivo | Tamaño | Lo usan |
| --- | --- | --- |
| `favicon.ico` | 32×32 (también puede contener 16×16 y 48×48) | Todos los navegadores, las herramientas antiguas, la solicitud automática de `/favicon.ico` |
| `icon.svg` | Escalable | Navegadores modernos, nítido en cualquier tamaño, puede admitir el modo oscuro |
| `apple-touch-icon.png` | 180×180 | Pantallas de inicio de iPhone y iPad |
| `icon-192.png` | 192×192 | Pantalla de inicio de Android, manifiesto de aplicación web |
| `icon-512.png` | 512×512 | Pantallas de bienvenida de Android, aplicaciones web instalables |

## Tamaños de favicon habituales y para qué sirven

| Tamaño | Dónde aparece |
| --- | --- |
| 16×16 | Pestañas y marcadores del navegador en pantallas de resolución estándar |
| 32×32 | Pestañas del navegador en pantallas de alta resolución, accesos directos de la barra de tareas de Windows |
| 48×48 | Iconos de sitio de Windows; el tamaño mínimo que recomienda Google Search |
| 96×96, 144×144 | Google Search en pantallas de alta densidad (múltiplos de 48) |
| 180×180 | `apple-touch-icon` para iOS y iPadOS |
| 192×192 | Pantalla de inicio de Chrome para Android y mínimo del manifiesto |
| 512×512 | Icono del manifiesto para pantallas de bienvenida y tiendas de aplicaciones de PWA |

## Requisitos de Google Search

Google muestra tu favicon junto a tus páginas en los resultados de búsqueda. Según las directrices de Google, el icono debe ser **cuadrado**, de al menos **48×48 píxeles** (o un múltiplo de 48, como 96×96 o 144×144) y estar disponible en una URL estable que Googlebot tenga permitido rastrear. También se aceptan archivos SVG. Los iconos muy pequeños se amplían y pueden verse borrosos.

## Consejos para iconos nítidos

- **Diseña primero para el tamaño más pequeño.** En 16×16 solo cabe una forma sencilla o una o dos letras. Elimina los detalles finos y las líneas delgadas.
- **Aprovecha todo el cuadrado.** Los iconos con demasiado margen se ven diminutos en las pestañas.
- **Prueba sobre fondos claros y oscuros.** Las pestañas, los resultados de búsqueda y las pantallas de inicio usan ambos.
- **Dale a iOS un fondo sólido.** iOS rellena de negro las zonas transparentes del `apple-touch-icon`.
- **Marca los iconos adaptables (maskable).** Android puede recortar los iconos en círculos o «squircles»; usa `"purpose": "maskable"` en el manifiesto para los iconos con zona segura.

## Obtén iconos de cualquier tamaño con Favicon.is

Cuando muestres iconos de *otros* sitios web, solicita exactamente el tamaño que necesitas:

```text
https://favicon.is/github.com?size=32
https://favicon.is/github.com?size=64
https://favicon.is/github.com?larger=true
```

Los valores admitidos son 16, 32, 48, 64, 128 y 256 píxeles. La nitidez nunca superará la del icono más grande que publique el sitio, así que compruébalo con el [comprobador de favicon](../../checker/).
