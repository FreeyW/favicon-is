---
title: "Tamanhos de favicon em 2026 – o guia de referência completo"
description: "De quais tamanhos de favicon você realmente precisa? Uma lista prática de tamanhos de ícone para navegadores, Google Search, iOS, Android e web app manifests."
order: 2
updated: 2026-11-22
---

Navegadores, sistemas operacionais e mecanismos de busca exibem ícones de sites em tamanhos diferentes. A boa notícia: você só precisa de alguns arquivos para ter ícones nítidos em todo lugar.

## A resposta curta

Para quase todos os sites, este conjunto é suficiente:

| Arquivo | Tamanho | Usado por |
| --- | --- | --- |
| `favicon.ico` | 32×32 (também pode conter 16×16 e 48×48) | Todos os navegadores, ferramentas legadas, a solicitação automática de `/favicon.ico` |
| `icon.svg` | Escalável | Navegadores modernos, nítido em qualquer tamanho, pode suportar modo escuro |
| `apple-touch-icon.png` | 180×180 | Tela inicial do iPhone e do iPad |
| `icon-192.png` | 192×192 | Tela inicial do Android, web app manifest |
| `icon-512.png` | 512×512 | Telas de abertura do Android, web apps instaláveis |

## Tamanhos de favicon comuns e para que servem

| Tamanho | Onde aparece |
| --- | --- |
| 16×16 | Abas e favoritos do navegador em telas de resolução padrão |
| 32×32 | Abas do navegador em telas de alta resolução, atalhos na barra de tarefas do Windows |
| 48×48 | Ícones de sites no Windows; o tamanho mínimo recomendado pelo Google Search |
| 96×96, 144×144 | Google Search em telas de alta densidade (múltiplos de 48) |
| 180×180 | `apple-touch-icon` para iOS e iPadOS |
| 192×192 | Tela inicial do Chrome no Android e tamanho mínimo do manifest |
| 512×512 | Ícone do manifest para telas de abertura e lojas de apps para PWAs |

## Requisitos do Google Search

O Google exibe seu favicon ao lado das suas páginas nos resultados de busca. De acordo com as diretrizes do Google, o ícone deve ser **quadrado**, ter pelo menos **48×48 pixels** (ou um múltiplo de 48, como 96×96 ou 144×144) e estar disponível em uma URL estável que o Googlebot tenha permissão para rastrear. Arquivos SVG também são aceitos. Ícones muito pequenos são ampliados e podem ficar borrados.

## Dicas para ícones nítidos

- **Desenhe primeiro para o menor tamanho.** Em 16×16 só há espaço para uma forma simples ou uma ou duas letras. Remova detalhes finos e linhas estreitas.
- **Use o quadrado inteiro.** Ícones com muito espaçamento interno parecem minúsculos nas abas.
- **Teste em fundos claros e escuros.** Abas, resultados de busca e telas iniciais usam os dois.
- **Dê ao iOS um fundo sólido.** O iOS preenche com preto as áreas transparentes do `apple-touch-icon`.
- **Marque os ícones maskable.** O Android pode recortar ícones em círculos ou squircles; use `"purpose": "maskable"` no manifest para ícones com uma zona de segurança.

## Ícones em qualquer tamanho com o Favicon.is

Ao exibir ícones de *outros* sites, solicite exatamente o tamanho de que você precisa:

```text
https://favicon.is/github.com?size=32
https://favicon.is/github.com?size=64
https://favicon.is/github.com?larger=true
```

Os valores suportados são 16, 32, 48, 64, 128 e 256 pixels. A nitidez é limitada pelo maior ícone que o site publica, então confira com o [verificador de favicon](../../checker/).
