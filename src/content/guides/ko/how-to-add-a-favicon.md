---
title: 웹사이트에 파비콘 추가하는 방법(단계별 가이드)
description: HTML 태그, 웹 앱 매니페스트, Apple 터치 아이콘부터 파비콘이 업데이트되지 않을 때의 해결 방법까지, 웹사이트에 파비콘을 추가하는 단계별 가이드입니다.
order: 4
updated: 2026-11-22
---

파비콘을 추가하는 데는 10분 정도면 충분합니다. 이 가이드에서는 파일 만들기부터 HTML 추가, 결과 확인까지 차근차근 안내합니다.

## 1. 원본 이미지 준비하기

최소 **512×512픽셀** 크기의 정사각형 이미지로 시작하세요. 로고의 벡터(SVG) 버전이면 가장 좋습니다. 디자인은 단순하게 만드세요. 16픽셀에서는 글자와 가는 선이 사라집니다. 많은 브랜드가 파비콘에 글자 하나나 심볼 하나만 사용합니다.

## 2. 아이콘 파일 만들기

디자인 도구나 파비콘 생성기에서 다음 파일을 내보내세요.

- `favicon.ico` – 32×32(선택적으로 16×16과 48×48 포함)
- `icon.svg` – 확대·축소 가능한 버전
- `apple-touch-icon.png` – 180×180, 단색 배경
- `icon-192.png` 및 `icon-512.png` – 웹 앱 매니페스트용

이 파일들을 웹사이트의 루트 폴더(홈페이지와 같은 폴더)에 넣으세요.

## 3. HTML 태그 추가하기

모든 페이지의 `<head>` 안에 다음 줄을 붙여 넣으세요.

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

대부분의 프레임워크와 사이트 빌더에는 이를 위한 전용 위치가 있습니다. Astro, Next.js, Vite 프로젝트의 `public` 폴더, WordPress의 사이트 아이덴티티 설정, Shopify의 테마 설정이 그 예입니다.

## 4. 웹 앱 매니페스트 추가하기

아이콘 옆에 `manifest.webmanifest`를 만드세요.

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

## 5. 결과 확인하기

새 브라우저 탭에서 사이트를 연 다음, [Favicon.is 검사기](../../checker/)로 확인해 보세요. 페이지가 선언한 모든 아이콘을 나열하고, 파일이 제대로 로드되는지 확인하며, 어떤 크기가 빠졌는지 알려 줍니다.

## 문제 해결: 파비콘이 업데이트되지 않아요

브라우저는 파비콘을 매우 적극적으로 캐시합니다. 아이콘을 교체했는데도 이전 아이콘이 계속 보인다면 다음을 시도해 보세요.

- `/icon.svg?v=2`처럼 URL에 버전을 추가하고 `<link>` 태그를 업데이트하세요.
- 아이콘 URL을 직접 열고 강제로 새로고침하세요.
- 브라우저 캐시를 지우거나 시크릿 창에서 테스트하세요.
- 검색 엔진은 홈페이지를 다시 크롤링해야 하며, 여기에는 며칠에서 몇 주가 걸릴 수 있습니다.

## 보너스: 다른 웹사이트의 파비콘 표시하기

앱에서 다른 사이트로 연결되는 링크를 나열한다면, 각 사이트의 아이콘을 직접 호스팅하는 대신 Favicon.is를 사용하세요.

```html
<img src="https://favicon.is/example.com?size=32" width="16" height="16" alt="">
```
