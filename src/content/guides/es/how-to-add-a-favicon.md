---
title: "Cómo añadir un favicon a tu sitio web (paso a paso)"
description: "Guía paso a paso para añadir un favicon a cualquier web: etiquetas HTML, manifiesto de aplicación web, iconos Apple Touch y qué hacer si el favicon no se actualiza."
order: 4
updated: 2026-11-22
---

Añadir un favicon lleva unos diez minutos. Esta guía te acompaña en la creación de los archivos, la inserción del HTML y la comprobación del resultado.

## 1. Prepara la imagen de origen

Empieza con una imagen cuadrada de al menos **512×512 píxeles**, idealmente una versión vectorial (SVG) de tu logotipo. Simplifícala: a 16 píxeles, el texto y las líneas finas desaparecen. Muchas marcas usan una sola letra o un símbolo como favicon.

## 2. Crea los archivos de icono

Exporta estos archivos desde tu herramienta de diseño o desde un generador de favicons:

- `favicon.ico` – 32×32 (opcionalmente con 16×16 y 48×48 en su interior)
- `icon.svg` – la versión escalable
- `apple-touch-icon.png` – 180×180 con fondo sólido
- `icon-192.png` e `icon-512.png` – para el manifiesto de aplicación web

Colócalos en la carpeta raíz de tu sitio web (la misma carpeta que tu página de inicio).

## 3. Añade las etiquetas HTML

Pega estas líneas dentro del `<head>` de cada página:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

La mayoría de los frameworks y creadores de sitios tienen un lugar específico para esto: la carpeta `public` en los proyectos de Astro, Next.js y Vite, los ajustes de «Identidad del sitio» en WordPress o la configuración del tema en Shopify.

## 4. Añade un manifiesto de aplicación web

Crea `manifest.webmanifest` junto a tus iconos:

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

## 5. Comprueba el resultado

Abre tu sitio en una nueva pestaña del navegador y luego pásalo por el [comprobador de Favicon.is](../../checker/). Enumera todos los iconos que declara tu página, comprueba que los archivos cargan y te indica qué tamaños faltan.

## Solución de problemas: mi favicon no se actualiza

Los navegadores almacenan los favicons en caché de forma muy agresiva. Si has reemplazado tu icono pero sigues viendo el antiguo:

- Añade una versión a la URL, por ejemplo `/icon.svg?v=2`, y actualiza las etiquetas `<link>`.
- Abre directamente la URL del icono y fuerza la recarga.
- Borra la caché del navegador o prueba en una ventana privada.
- Los buscadores tienen que volver a rastrear tu página de inicio, y eso puede tardar días o semanas.

## Extra: muestra los favicons de otros sitios web

Si tu app muestra enlaces a otros sitios, usa Favicon.is en lugar de alojar sus iconos tú mismo:

```html
<img src="https://favicon.is/example.com?size=32" width="16" height="16" alt="">
```
