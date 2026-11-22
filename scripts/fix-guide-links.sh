#!/usr/bin/env bash
# Guides render at /{locale}/guides/{slug}/, so links to site pages must be
# relative (../../checker/) to stay inside the reader's language.
set -euo pipefail
cd "$(dirname "$0")/.."
find src/content/guides -name '*.md' -print0 | xargs -0 sed -i -E 's#\]\(/(checker|docs|examples|popular|tlds|faq|guides|about|privacy|terms)/([^)]*)\)#](../../\1/\2)#g'
