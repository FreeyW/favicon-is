---
title: "Sobre o Favicon.is"
description: "O Favicon.is é uma API de favicon gratuita que retorna o ícone de qualquer site com uma única URL. Saiba para quem é, como funciona e a tecnologia usada."
updated: 2026-11-22
---

O Favicon.is é um serviço gratuito que retorna o favicon de qualquer site a partir de uma única URL. Coloque um domínio depois de `https://favicon.is/` e receba o ícone do site como imagem, pronto para uma tag `<img>`.

## Para quem é

- **Desenvolvedores** que exibem links, favoritos ou integrações e querem ícones reconhecíveis sem fazer scraping de sites.
- **Designers** que precisam do logo de um site conhecido para um mock-up em segundos.
- **Webmasters** que querem conferir como fica o próprio favicon e se todos os tamanhos estão no lugar.

## Como funciona

Cada requisição passa por um pipeline curto. Normalizamos a entrada, verificamos se o domínio termina em um domínio de topo do IANA Root Zone Database e então procuramos o ícone no nosso cache de borda, no nosso armazenamento, no cache de favicons do Google e, por fim, no próprio site. O melhor resultado é armazenado e servido a partir da borda, então a próxima requisição é quase instantânea.

Se não existir nenhum ícone, você recebe um ícone padrão neutro em vez de uma imagem quebrada.

## Tecnologia

O site é feito com [Astro](https://astro.build) e TypeScript. A API e as páginas rodam no [Cloudflare Workers](https://workers.cloudflare.com) em data centers ao redor do mundo, e os ícones são armazenados no [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/). A lista de TLDs suportados vem do [IANA Root Zone Database](https://www.iana.org/domains/root/db).

## Uso responsável

O Favicon.is só busca ícones disponíveis publicamente, identifica-se com um user agent claro e armazena no máximo uma cópia por ícone e tamanho. Os logos continuam sendo propriedade de seus donos. Se você é dono de um site e quer que o ícone dele seja removido do nosso cache, entre em contato pelos dados abaixo.

## Créditos

O Favicon.is foi inspirado no Favicon.im e faz parte de uma família de pequenas ferramentas web gratuitas, listadas no rodapé de todas as páginas.
