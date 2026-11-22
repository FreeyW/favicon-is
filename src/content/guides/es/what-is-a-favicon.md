---
title: "¿Qué es un favicon? Guía breve sobre los iconos de sitios web"
description: "Descubre qué es un favicon, dónde lo muestran los navegadores y buscadores, por qué es importante para tu marca y cómo lo encuentran los navegadores."
order: 1
updated: 2026-11-22
---

Un **favicon** (abreviatura de *favorite icon*, «icono favorito») es la pequeña imagen que representa a un sitio web. Lo ves en las pestañas del navegador, en tus marcadores y tu historial, en la barra de direcciones, junto a los resultados de búsqueda y en la pantalla de inicio de tu teléfono cuando guardas un sitio como acceso directo.

## Dónde aparecen los favicons

- **Pestañas del navegador.** Con muchas pestañas abiertas, el icono suele ser lo único que permite distinguirlas.
- **Marcadores e historial.** Los iconos permiten recorrer listas largas de un vistazo.
- **Resultados de búsqueda.** Google y otros buscadores muestran el favicon junto al nombre de tu sitio, tanto en dispositivos móviles como en el escritorio.
- **Pantallas de inicio y lanzadores de aplicaciones.** Cuando alguien añade tu sitio a su teléfono, el icono táctil se convierte en el icono de la app.
- **Otras aplicaciones.** Las apps de chat, los servicios para leer más tarde, los gestores de contraseñas y los paneles usan favicons para identificar los enlaces.

## Un poco de historia

Los favicons llegaron con Internet Explorer 5 en 1999. El navegador buscaba un archivo llamado `favicon.ico` en la raíz de un sitio web y lo mostraba en el menú *Favoritos* (*Favorites* en inglés), de ahí su nombre. Más adelante, HTML incorporó la etiqueta `<link rel="icon">` para que los sitios pudieran elegir la ubicación, el formato y el tamaño de su icono.

Hoy, un sitio web suele incluir varios iconos: un ICO o PNG pequeño para las pestañas, un SVG que se adapta a cualquier tamaño, un `apple-touch-icon` para iOS y, para Android, archivos PNG más grandes incluidos en un manifiesto de aplicación web.

## Por qué son importantes los favicons

1. **Reconocimiento.** Un icono claro ayuda a la gente a encontrar tu pestaña entre decenas de ellas y genera confianza en tu marca.
2. **Aspecto profesional.** Si falta el favicon, se muestra un marcador de posición genérico que da sensación de trabajo sin terminar.
3. **Visibilidad en las búsquedas.** Los buscadores muestran favicons en los resultados, y un icono distintivo puede mejorar el porcentaje de clics.
4. **Menos errores.** Los navegadores solicitan `/favicon.ico` automáticamente. Si no existe, los registros de tu servidor se llenan de errores 404.

## Cómo encuentran los navegadores un favicon

Cuando se carga una página, el navegador lee el `<head>` en busca de etiquetas `<link>` cuyo atributo `rel` contenga `icon`. Elige el mejor candidato según los atributos `sizes` y `type` y la pantalla en la que está dibujando. Si no hay ninguna declaración, recurre a `https://example.com/favicon.ico`.

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Cómo obtener el favicon de cualquier sitio web

Si estás creando un producto que muestra enlaces a otros sitios web, no necesitas extraer el icono de cada sitio por tu cuenta. Favicon.is devuelve el icono de cualquier dominio a partir de una sola URL:

```html
<img src="https://favicon.is/wikipedia.org" width="32" height="32" alt="Wikipedia">
```

A continuación, descubre [qué tamaños necesitas](../favicon-sizes/) y [qué formatos de archivo usar](../favicon-formats/).
