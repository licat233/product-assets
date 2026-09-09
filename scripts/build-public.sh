#!/bin/sh
set -eu

rm -rf dist
mkdir -p dist/products

cp static/404.html dist/404.html
cp static/robots.txt dist/robots.txt
cp static/_headers dist/_headers
cp static/browser.css dist/browser.css

if ! command -v node >/dev/null 2>&1; then
  echo 'Error: Node.js is required to generate the static asset browser.' >&2
  exit 1
fi

node scripts/generate-asset-browser.mjs

printf '%s\n' 'Public product asset browser generated in dist/'
