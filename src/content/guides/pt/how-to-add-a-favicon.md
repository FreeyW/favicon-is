---
title: "Como adicionar um favicon ao seu site (passo a passo)"
description: "Guia passo a passo para adicionar um favicon a qualquer site: tags HTML, web app manifest, Apple touch icons e como corrigir um favicon que não atualiza."
order: 4
updated: 2026-11-22
---

Adicionar um favicon leva cerca de dez minutos. Este guia mostra como criar os arquivos, adicionar o HTML e verificar o resultado.

## 1. Prepare a imagem de origem

Comece com uma imagem quadrada de pelo menos **512×512 pixels**, de preferência uma versão vetorial (SVG) do seu logo. Simplifique: em 16 pixels, textos e linhas finas desaparecem. Muitas marcas usam uma única letra ou símbolo como favicon.

## 2. Crie os arquivos de ícone

Exporte estes arquivos da sua ferramenta de design ou de um gerador de favicon:

- `favicon.ico` – 32×32 (opcionalmente com 16×16 e 48×48 dentro)
- `icon.svg` – a versão escalável
- `apple-touch-icon.png` – 180×180 com fundo sólido
- `icon-192.png` e `icon-512.png` – para o web app manifest

Coloque-os na pasta raiz do seu site (a mesma pasta da página inicial).

## 3. Adicione as tags HTML

Cole estas linhas dentro do `<head>` de todas as páginas:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

A maioria dos frameworks e criadores de sites tem um lugar próprio para isso: a pasta `public` em projetos Astro, Next.js e Vite, as configurações de Identidade do site no WordPress ou as configurações do tema no Shopify.

## 4. Adicione um web app manifest

Crie o `manifest.webmanifest` ao lado dos seus ícones:

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

## 5. Verifique o resultado

Abra seu site em uma nova aba do navegador e depois passe-o pelo [verificador do Favicon.is](../../checker/). Ele lista todos os ícones que sua página declara, verifica se os arquivos carregam e informa quais tamanhos estão faltando.

## Solução de problemas: meu favicon não atualiza

Os navegadores armazenam favicons em cache de forma muito agressiva. Se você substituiu o ícone, mas ainda vê o antigo:

- Adicione uma versão à URL, por exemplo `/icon.svg?v=2`, e atualize as tags `<link>`.
- Abra a URL do ícone diretamente e force o recarregamento.
- Limpe o cache do navegador ou teste em uma janela anônima.
- Os mecanismos de busca precisam rastrear sua página inicial novamente; isso pode levar dias ou semanas.

## Bônus: exiba os favicons de outros sites

Se o seu app lista links para outros sites, use o Favicon.is em vez de hospedar os ícones deles você mesmo:

```html
<img src="https://favicon.is/example.com?size=32" width="16" height="16" alt="">
```
