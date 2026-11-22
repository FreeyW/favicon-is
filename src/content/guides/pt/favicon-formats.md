---
title: "Formatos de favicon: ICO, PNG ou SVG? Entenda as diferenças"
description: "Compare os formatos de favicon ICO, PNG, SVG, GIF e WebP, veja quais navegadores os suportam e descubra qual combinação usar hoje."
order: 3
updated: 2026-11-22
---

Um favicon pode ser salvo em vários formatos de imagem. Cada um tem seus pontos fortes, e a melhor configuração combina dois ou três deles.

## ICO

O formato original de favicon. Um arquivo `.ico` é um contêiner que pode guardar vários bitmaps em tamanhos diferentes, por exemplo 16×16, 32×32 e 48×48, para que o sistema operacional escolha o mais adequado.

- **Prós:** suportado por todos os navegadores já criados; solicitado automaticamente em `/favicon.ico`; um único arquivo para vários tamanhos.
- **Contras:** arquivo maior; sem escalabilidade vetorial; exige uma ferramenta específica para ser criado.

**Use para:** um único `favicon.ico` na raiz do site, principalmente por compatibilidade.

## PNG

O PNG é hoje o formato mais comum para favicons. Ele suporta transparência e tem boa compressão.

- **Prós:** suporte universal; fácil de exportar de qualquer ferramenta de design; ideal para o `apple-touch-icon` de 180×180 e para os ícones do manifest de 192×192 e 512×512.
- **Contras:** cada tamanho é um arquivo separado; não escala além do seu tamanho em pixels.

**Use para:** touch icons, ícones do manifest e como fallback para navegadores que não suportam SVG.

## SVG

O SVG é um formato vetorial, então um único arquivo pequeno fica nítido em qualquer tamanho e em qualquer densidade de tela.

- **Prós:** perfeitamente nítido em todo lugar; arquivo minúsculo; pode reagir ao modo escuro com media queries CSS.
- **Contras:** o suporte dos navegadores ainda não é universal, então mantenha um fallback em ICO ou PNG; logos muito detalhados ainda podem precisar de uma versão simplificada para 16×16.

Um favicon SVG pode mudar de cor quando o usuário prefere um tema escuro:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    path { fill: #0f172a; }
    @media (prefers-color-scheme: dark) { path { fill: #f8fafc; } }
  </style>
  <path d="M4 4h24v24H4z"/>
</svg>
```

## GIF, JPEG e WebP

Esses formatos funcionam na maioria dos navegadores modernos, mas oferecem poucas vantagens para ícones. O GIF suporta animação, embora favicons animados distraiam e não sejam exibidos em todo lugar. O JPEG não suporta transparência. WebP e AVIF são eficientes, mas não são suportados por todas as plataformas que leem favicons.

## Quais formatos você deve usar?

A combinação mais confiável hoje é:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Os navegadores que entendem SVG vão usar o `icon.svg`; os demais recorrem ao `favicon.ico`.

## Em que formato o Favicon.is retorna os ícones?

O Favicon.is retorna o ícone no formato fornecido pelo site. Na maioria dos casos é PNG, mas pode ser ICO, SVG, JPEG, GIF ou WebP. O cabeçalho de resposta `Content-Type` sempre informa qual formato você recebeu, e todos os formatos funcionam em uma tag `<img>` comum.
