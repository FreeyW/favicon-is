---
title: "Acerca de Favicon.is"
description: "Favicon.is es una API de favicons gratuita que devuelve el icono de cualquier sitio web con una sola URL. Descubre para quién es, cómo funciona y su tecnología."
updated: 2026-11-22
---

Favicon.is es un servicio gratuito que devuelve el favicon de cualquier sitio web a partir de una sola URL. Añade un dominio después de `https://favicon.is/` y recibirás el icono del sitio como imagen, listo para una etiqueta `<img>`.

## Para quién es

- **Desarrolladores** que muestran enlaces, marcadores o integraciones y quieren iconos reconocibles sin tener que hacer scraping de los sitios web.
- **Diseñadores** que necesitan en segundos el logotipo de un sitio conocido para una maqueta.
- **Webmasters** que quieren comprobar cómo se ve su propio favicon y si están todos los tamaños.

## Cómo funciona

Cada solicitud pasa por un breve proceso. Normalizamos la entrada, comprobamos que el dominio termina en un dominio de nivel superior de la base de datos de la zona raíz de IANA y, después, buscamos el icono en nuestra caché edge, en nuestro almacenamiento, en la caché de favicons de Google y, por último, en el propio sitio web. El mejor resultado se guarda y se sirve desde el edge, así que la siguiente solicitud es casi instantánea.

Si no existe ningún icono, recibes un icono neutro predeterminado en lugar de una imagen rota.

## Tecnología

El sitio web está creado con [Astro](https://astro.build) y TypeScript. La API y las páginas se ejecutan en [Cloudflare Workers](https://workers.cloudflare.com) en centros de datos de todo el mundo, y los iconos se guardan en [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/). La lista de TLD compatibles procede de la [base de datos de la zona raíz de IANA](https://www.iana.org/domains/root/db).

## Uso responsable

Favicon.is solo obtiene iconos disponibles públicamente, se identifica con un user agent claro y guarda como máximo una copia por icono y tamaño. Los logotipos siguen siendo propiedad de sus dueños. Si eres propietario de un sitio web y quieres que eliminemos su icono de nuestra caché, contáctanos con los datos que aparecen a continuación.

## Créditos

Favicon.is se inspiró en Favicon.im y forma parte de una familia de pequeñas herramientas web gratuitas, que aparecen al pie de cada página.
