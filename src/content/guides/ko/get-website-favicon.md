---
title: 모든 웹사이트의 파비콘을 가져오는 방법
description: /favicon.ico와 페이지 HTML부터 파비콘 API까지, 웹사이트 파비콘을 가져오는 5가지 방법을 코드 예제와 각각의 장단점과 함께 소개합니다.
order: 5
updated: 2026-11-22
---

북마크 관리자, 링크인바이오 페이지, 대시보드, 브라우저 확장 프로그램 중 무엇을 만들든 언젠가는 다른 웹사이트의 아이콘이 필요해집니다. 가장 수동적인 방법부터 가장 쉬운 방법까지, 선택지를 소개합니다.

## 1. /favicon.ico 요청하기

가장 오래된 관례입니다. 많은 사이트가 여전히 루트에서 아이콘을 제공합니다.

```text
https://example.com/favicon.ico
```

**장점:** 제3자에 의존하지 않습니다. **단점:** 이 파일이 없는 사이트가 상당히 많고, 있더라도 16×16이나 32×32픽셀에 불과한 경우가 많으며, 파일이 없으면 깨진 이미지가 표시됩니다.

## 2. 페이지 HTML 읽기

확실한 방법은 홈페이지를 다운로드해 `<link rel="icon">`, `<link rel="apple-touch-icon">`, 웹 앱 매니페스트를 찾은 다음 가장 적합한 크기를 고르는 것입니다.

```js
const html = await fetch('https://example.com').then((r) => r.text());
const links = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
```

**장점:** 사이트가 실제로 선언한 아이콘을 찾을 수 있습니다. **단점:** 리디렉션, 상대 URL, 타임아웃, 봇을 차단하는 사이트, 캐시, 대체 처리를 모두 직접 처리해야 하며, CORS 때문에 브라우저에서는 실행할 수 없습니다.

## 3. 브라우저 확장 프로그램 API 사용하기

Chrome 확장 프로그램은 `favicon` 권한과 `chrome-extension://<id>/_favicon/?pageUrl=…`을 사용해 브라우저가 이미 알고 있는 아이콘을 가져올 수 있습니다. 이 방법은 확장 프로그램 안에서만, 그리고 사용자가 방문한 적이 있는 사이트에 대해서만 작동합니다.

## 4. 검색 엔진의 파비콘 서비스 사용하기

Google과 DuckDuckGo는 크롤링하면서 수집한 아이콘을 공개하고 있습니다.

```text
https://www.google.com/s2/favicons?domain=example.com&sz=64
https://icons.duckduckgo.com/ip3/example.com.ico
```

**장점:** 빠르고 폭넓게 지원됩니다. **단점:** 비공식이며 문서화되어 있지 않고, 크기와 형식을 제어하기 어려우며, 무엇이 반환되었는지에 대한 정보가 없습니다.

## 5. Favicon.is 사용하기

Favicon.is는 위의 모든 방법을 URL 하나로 결합합니다. Google 파비콘 캐시를 확인하고, 사이트의 HTML을 읽고, `/favicon.ico`를 시도한 다음, 결과를 Cloudflare R2에 저장하고 항상 이미지를 반환합니다.

```html
<img src="https://favicon.is/example.com" width="32" height="32" alt="">
```

- `?size=16`부터 `?size=256`까지로 크기를 선택하거나 `?larger=true`를 사용하세요.
- `?original=true`를 사용하면 Google을 건너뛰고 사이트 자체의 아이콘 선언을 읽습니다.
- `X-Source` 헤더를 확인하면 아이콘을 어디서 가져왔는지 알 수 있습니다.
- IANA 루트 존 데이터베이스에 등록된 TLD를 사용하는 도메인만 조회하므로, 오타나 사설 이름에는 즉시 기본 아이콘이 반환됩니다.

모든 옵션은 [API 문서](../../docs/)에서 확인하거나, [예제](../../examples/)에서 코드를 복사하세요.
