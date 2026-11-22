---
title: "Formatos de favicon: ICO vs. PNG vs. SVG explicados"
description: "Compara los formatos de favicon ICO, PNG, SVG, GIF y WebP, descubre qué navegadores los admiten y qué combinación conviene usar hoy."
order: 3
updated: 2026-11-22
---

Un favicon se puede guardar en varios formatos de imagen. Cada uno tiene sus puntos fuertes, y la mejor configuración combina dos o tres.

## ICO

El formato original de los favicons. Un archivo `.ico` es un contenedor que puede incluir varios mapas de bits de distintos tamaños, por ejemplo 16×16, 32×32 y 48×48, para que el sistema operativo elija el adecuado.

- **Ventajas:** compatible con todos los navegadores que han existido; se solicita automáticamente en `/favicon.ico`; un solo archivo para varios tamaños.
- **Desventajas:** archivos más pesados; no escala como un vector; requiere una herramienta especial para crearlo.

**Úsalo para:** un único `favicon.ico` en la raíz de tu sitio, sobre todo por compatibilidad.

## PNG

PNG es hoy el formato más común para favicons. Admite transparencia y se comprime bien.

- **Ventajas:** compatibilidad universal; fácil de exportar desde cualquier herramienta de diseño; ideal para el `apple-touch-icon` de 180×180 y los iconos del manifiesto de 192×192 y 512×512.
- **Desventajas:** cada tamaño es un archivo independiente; no escala más allá de su tamaño en píxeles.

**Úsalo para:** iconos táctiles, iconos del manifiesto y como alternativa para los navegadores que no admiten SVG.

## SVG

SVG es un formato vectorial, así que un único archivo pequeño se mantiene nítido en cualquier tamaño y con cualquier densidad de pantalla.

- **Ventajas:** perfectamente nítido en todas partes; archivos diminutos; puede reaccionar al modo oscuro con media queries de CSS.
- **Desventajas:** la compatibilidad con los navegadores aún no es universal, así que mantén un ICO o PNG como alternativa; los logotipos muy detallados pueden seguir necesitando una versión simplificada para 16×16.

Un favicon SVG puede cambiar de colores cuando el usuario prefiere un tema oscuro:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    path { fill: #0f172a; }
    @media (prefers-color-scheme: dark) { path { fill: #f8fafc; } }
  </style>
  <path d="M4 4h24v24H4z"/>
</svg>
```

## GIF, JPEG y WebP

Estos formatos funcionan en la mayoría de los navegadores modernos, pero ofrecen pocas ventajas para los iconos. GIF admite animación, aunque los favicons animados distraen y no se muestran en todas partes. JPEG no admite transparencia. WebP y AVIF son eficientes, pero no son compatibles con todas las plataformas que leen favicons.

## ¿Qué formatos deberías usar?

La combinación más fiable hoy en día es:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Los navegadores que entienden SVG usarán `icon.svg`; los demás recurrirán a `favicon.ico`.

## ¿Qué formato devuelve Favicon.is?

Favicon.is devuelve el icono en el formato que proporciona el sitio web. En la mayoría de los casos es PNG, pero puede ser ICO, SVG, JPEG, GIF o WebP. La cabecera de respuesta `Content-Type` siempre indica cuál has recibido, y todos los formatos funcionan en una etiqueta `<img>` normal.
