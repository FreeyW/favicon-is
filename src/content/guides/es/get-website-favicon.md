---
title: "Cómo obtener el favicon de cualquier sitio web"
description: "Cinco formas de obtener el favicon de un sitio web, desde /favicon.ico y el HTML de la página hasta las API de favicons, con ejemplos de código y sus pros y contras."
order: 5
updated: 2026-11-22
---

Si estás creando un gestor de marcadores, una página «link in bio», un panel o una extensión de navegador, tarde o temprano necesitarás los iconos de otros sitios web. Estas son las opciones, de la más manual a la más sencilla.

## 1. Solicitar /favicon.ico

La convención más antigua: muchos sitios todavía sirven un icono en la raíz.

```text
https://example.com/favicon.ico
```

**Ventajas:** sin terceros. **Desventajas:** una gran parte de los sitios no tiene ese archivo, a menudo solo mide 16×16 o 32×32 píxeles y obtienes una imagen rota cuando falta.

## 2. Leer el HTML de la página

La forma fiable es descargar la página de inicio y buscar `<link rel="icon">`, `<link rel="apple-touch-icon">` y el manifiesto de aplicación web, y luego elegir el mejor tamaño.

```js
const html = await fetch('https://example.com').then((r) => r.text());
const links = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
```

**Ventajas:** encuentra el icono que el sitio declara realmente. **Desventajas:** tienes que encargarte tú mismo de las redirecciones, las URL relativas, los tiempos de espera, los sitios que bloquean bots, la caché y las alternativas – y no puedes hacerlo desde un navegador debido a CORS.

## 3. Usar las API de extensiones del navegador

Las extensiones de Chrome pueden usar el permiso `favicon` y `chrome-extension://<id>/_favicon/?pageUrl=…` para obtener los iconos que el navegador ya conoce. Esto solo funciona dentro de una extensión y solo con los sitios que el usuario ha visitado.

## 4. Usar el servicio de favicons de un buscador

Google y DuckDuckGo ofrecen los iconos que recopilan mientras rastrean la web:

```text
https://www.google.com/s2/favicons?domain=example.com&sz=64
https://icons.duckduckgo.com/ip3/example.com.ico
```

**Ventajas:** rápido y con amplia cobertura. **Desventajas:** no es oficial ni está documentado, ofrece un control limitado sobre el tamaño y el formato, y no da información sobre lo que se ha devuelto.

## 5. Usar Favicon.is

Favicon.is combina todo lo anterior tras una sola URL. Consulta la caché de favicons de Google, lee el HTML del sitio, prueba con `/favicon.ico`, guarda el resultado en Cloudflare R2 y siempre devuelve una imagen:

```html
<img src="https://favicon.is/example.com" width="32" height="32" alt="">
```

- Elige un tamaño de `?size=16` a `?size=256`, o usa `?larger=true`.
- Usa `?original=true` para omitir Google y leer las declaraciones de iconos del propio sitio.
- Consulta la cabecera `X-Source` para ver de dónde procede el icono.
- Solo se buscan dominios con un TLD de la base de datos de la zona raíz de IANA, así que los errores tipográficos y los nombres privados devuelven el icono predeterminado al instante.

Consulta la [documentación de la API](../../docs/) para ver todas las opciones o copia un fragmento de los [ejemplos](../../examples/).
