---
title: "Como obter o favicon de qualquer site"
description: "Cinco formas de obter o favicon de um site – do /favicon.ico e do HTML da página até APIs de favicon – com exemplos de código e os prós e contras de cada uma."
order: 5
updated: 2026-11-22
---

Seja para criar um gerenciador de favoritos, uma página de link na bio, um dashboard ou uma extensão de navegador, cedo ou tarde você vai precisar dos ícones de outros sites. Veja as opções, da mais manual à mais fácil.

## 1. Solicite /favicon.ico

A convenção mais antiga: muitos sites ainda disponibilizam um ícone na raiz.

```text
https://example.com/favicon.ico
```

**Prós:** sem terceiros. **Contras:** boa parte dos sites não tem o arquivo, ele muitas vezes tem só 16×16 ou 32×32 pixels e você recebe uma imagem quebrada quando ele não existe.

## 2. Leia o HTML da página

O método confiável é baixar a página inicial e procurar `<link rel="icon">`, `<link rel="apple-touch-icon">` e o web app manifest, e depois escolher o melhor tamanho.

```js
const html = await fetch('https://example.com').then((r) => r.text());
const links = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
```

**Prós:** encontra o ícone que o site realmente declara. **Contras:** você precisa lidar por conta própria com redirecionamentos, URLs relativas, timeouts, sites que bloqueiam bots, cache e fallbacks – e não dá para fazer isso no navegador por causa do CORS.

## 3. Use as APIs de extensões do navegador

Extensões do Chrome podem usar a permissão `favicon` e `chrome-extension://<id>/_favicon/?pageUrl=…` para obter ícones que o navegador já conhece. Isso só funciona dentro de uma extensão e apenas para sites que o usuário já visitou.

## 4. Use o serviço de favicons de um buscador

O Google e o DuckDuckGo disponibilizam os ícones que coletam durante o rastreamento:

```text
https://www.google.com/s2/favicons?domain=example.com&sz=64
https://icons.duckduckgo.com/ip3/example.com.ico
```

**Prós:** rápido e com ampla cobertura. **Contras:** não oficial e sem documentação, controle limitado sobre tamanho e formato, e nenhuma informação sobre o que foi retornado.

## 5. Use o Favicon.is

O Favicon.is reúne todas essas abordagens por trás de uma única URL. Ele verifica o cache de favicons do Google, lê o HTML do site, tenta `/favicon.ico`, armazena o resultado no Cloudflare R2 e sempre retorna uma imagem:

```html
<img src="https://favicon.is/example.com" width="32" height="32" alt="">
```

- Escolha um tamanho de `?size=16` a `?size=256` ou use `?larger=true`.
- Use `?original=true` para ignorar o Google e ler as declarações de ícone do próprio site.
- Confira o cabeçalho `X-Source` para saber de onde o ícone veio.
- Só são consultados domínios com um TLD do IANA Root Zone Database, então erros de digitação e nomes privados retornam o ícone padrão instantaneamente.

Consulte a [documentação da API](../../docs/) para ver todas as opções ou copie um snippet dos [exemplos](../../examples/).
