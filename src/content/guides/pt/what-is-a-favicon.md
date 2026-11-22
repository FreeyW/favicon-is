---
title: "O que é um favicon? Um guia rápido sobre ícones de sites"
description: "Saiba o que é um favicon, onde navegadores e buscadores o exibem, por que ele é importante para a sua marca e como os navegadores o encontram."
order: 1
updated: 2026-11-22
---

Um **favicon** (abreviação de *favorite icon*, “ícone favorito”) é a pequena imagem que representa um site. Você o vê nas abas do navegador, nos favoritos e no histórico, na barra de endereços, ao lado dos resultados de busca e na tela inicial do celular quando salva um site como atalho.

## Onde os favicons aparecem

- **Abas do navegador.** Com muitas abas abertas, o ícone costuma ser a única coisa que as diferencia.
- **Favoritos e histórico.** Os ícones permitem percorrer listas longas com uma olhada rápida.
- **Resultados de busca.** O Google e outros mecanismos de busca exibem o favicon ao lado do nome do seu site no celular e no computador.
- **Telas iniciais e launchers de apps.** Quando alguém adiciona seu site ao celular, o touch icon vira o ícone do app.
- **Outros apps.** Apps de chat, serviços de leitura posterior, gerenciadores de senhas e dashboards usam favicons para identificar links.

## Um pouco de história

Os favicons foram introduzidos pelo Internet Explorer 5 em 1999. O navegador procurava um arquivo chamado `favicon.ico` na raiz de um site e o exibia no menu *Favoritos* (*Favorites*, em inglês), que é a origem do nome. Mais tarde, o HTML ganhou a tag `<link rel="icon">` para que os sites pudessem escolher o local, o formato e o tamanho do ícone.

Hoje, um site normalmente inclui vários ícones: um ICO ou PNG pequeno para as abas, um SVG que se adapta a qualquer tamanho, um `apple-touch-icon` para iOS e arquivos PNG maiores listados em um web app manifest para Android.

## Por que os favicons são importantes

1. **Reconhecimento.** Um ícone claro ajuda as pessoas a encontrar sua aba entre dezenas de outras e gera confiança na sua marca.
2. **Aparência profissional.** Sem favicon, aparece um ícone genérico, o que passa a impressão de site inacabado.
3. **Visibilidade nas buscas.** Os buscadores exibem favicons nos resultados, e um ícone marcante pode aumentar a taxa de cliques.
4. **Menos erros.** Os navegadores solicitam `/favicon.ico` automaticamente. Sem ele, os logs do seu servidor se enchem de erros 404.

## Como os navegadores encontram um favicon

Quando uma página carrega, o navegador lê o `<head>` em busca de tags `<link>` cujo atributo `rel` contenha `icon`. Ele escolhe o melhor candidato com base nos atributos `sizes` e `type` e na tela em que está desenhando. Se não houver nenhuma declaração, ele recorre a `https://example.com/favicon.ico`.

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Como obter o favicon de qualquer site

Se você está criando um produto que exibe links para outros sites, não precisa fazer scraping de cada site por conta própria. O Favicon.is retorna o ícone de qualquer domínio a partir de uma única URL:

```html
<img src="https://favicon.is/wikipedia.org" width="32" height="32" alt="Wikipedia">
```

A seguir, descubra [de quais tamanhos você precisa](../favicon-sizes/) e [quais formatos de arquivo usar](../favicon-formats/).
