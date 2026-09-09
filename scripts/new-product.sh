#!/bin/sh
set -eu

usage() {
  cat <<'EOF'
Usage:
  bash scripts/new-product.sh <product-slug> "<Product Name>"

Example:
  bash scripts/new-product.sh led-sensor-light "LED Sensor Light"
EOF
}

if [ "${1:-}" = "--help" ] || [ "${1:-}" = "-h" ]; then
  usage
  exit 0
fi

if [ "$#" -ne 2 ]; then
  usage >&2
  exit 2
fi

slug=$1
product_name=$2

case "$slug" in
  ''|*[!a-z0-9-]*|-*|*-|*--*)
    echo "Error: product slug must use lowercase letters, numbers, and single hyphens only." >&2
    exit 2
    ;;
esac

if [ -z "$product_name" ]; then
  echo "Error: product name cannot be empty." >&2
  exit 2
fi

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
target="$repo_root/products/$slug"

if [ -e "$target" ]; then
  echo "Error: product already exists: products/$slug" >&2
  exit 1
fi

product_template="$repo_root/templates/product.md"
manifest_template="$repo_root/templates/manifest.yaml"

if [ ! -f "$product_template" ] || [ ! -f "$manifest_template" ]; then
  echo "Error: required templates are missing." >&2
  exit 1
fi

mkdir -p "$target/docs" "$target/images"
cp "$product_template" "$target/product.md"
cp "$manifest_template" "$target/manifest.yaml"
: > "$target/docs/.gitkeep"
: > "$target/images/.gitkeep"

escape_replacement() {
  printf '%s' "$1" | sed 's/[&|\\]/\\&/g'
}

slug_escaped=$(escape_replacement "$slug")
name_escaped=$(escape_replacement "$product_name")

for file in "$target/product.md" "$target/manifest.yaml"; do
  tmp="$file.tmp"
  sed \
    -e "s|<product-slug>|$slug_escaped|g" \
    -e "s|<Product Name>|$name_escaped|g" \
    "$file" > "$tmp"
  mv "$tmp" "$file"
done

cat <<EOF
Created product scaffold:
  products/$slug/
  ├── product.md
  ├── manifest.yaml
  ├── docs/
  └── images/

Next:
  1. Put manuals, datasheets, and other source documents in docs/.
  2. Put authoritative real product photos in images/.
  3. Fill product.md from the source evidence.
  4. Update manifest.yaml so it lists the files that actually exist.
EOF
