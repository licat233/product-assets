#!/bin/sh
set -eu

rm -rf dist
mkdir -p dist/products

cp static/index.html dist/index.html
cp static/404.html dist/404.html
cp static/robots.txt dist/robots.txt
cp static/_headers dist/_headers

for image_dir in products/*/images; do
  [ -d "$image_dir" ] || continue

  product_dir=$(dirname "$image_dir")
  slug=$(basename "$product_dir")
  target="dist/products/$slug/images"
  mkdir -p "$target"

  find "$image_dir" -maxdepth 1 -type f \( \
    -iname '*.jpg' -o \
    -iname '*.jpeg' -o \
    -iname '*.png' -o \
    -iname '*.webp' \
  \) -exec cp {} "$target"/ \;
done

printf '%s\n' 'Public product-image output generated in dist/'
