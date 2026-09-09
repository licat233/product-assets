#!/bin/sh
set -eu

usage() {
  cat <<'EOF'
Usage:
  bash scripts/upload-product-assets.sh <product-slug> [--dry-run]

Environment overrides:
  R2_BUCKET       Cloudflare R2 bucket name (default: product-assets)
  ASSETS_BASE_URL Public asset origin (default: https://assets.licat.xyz)

Example:
  bash scripts/upload-product-assets.sh led-sensor-light
EOF
}

if [ "${1:-}" = "--help" ] || [ "${1:-}" = "-h" ]; then
  usage
  exit 0
fi

if [ "$#" -lt 1 ] || [ "$#" -gt 2 ]; then
  usage >&2
  exit 2
fi

slug=$1
dry_run=false
if [ "${2:-}" = "--dry-run" ]; then
  dry_run=true
elif [ "$#" -eq 2 ]; then
  usage >&2
  exit 2
fi

case "$slug" in
  ''|*[!a-z0-9-]*|-*|*-|*--*)
    echo "Error: invalid product slug: $slug" >&2
    exit 2
    ;;
esac

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
product_dir="$repo_root/products/$slug"
bucket=${R2_BUCKET:-product-assets}
base_url=${ASSETS_BASE_URL:-https://assets.licat.xyz}

if [ ! -d "$product_dir" ]; then
  echo "Error: product directory not found: products/$slug" >&2
  exit 1
fi

run_wrangler() {
  if command -v wrangler >/dev/null 2>&1; then
    wrangler "$@"
  elif command -v npx >/dev/null 2>&1; then
    npx --yes wrangler "$@"
  else
    echo "Error: Wrangler is required. Install it or ensure npx is available." >&2
    exit 1
  fi
}

content_type() {
  case "$1" in
    *.jpg|*.jpeg|*.JPG|*.JPEG) printf '%s' 'image/jpeg' ;;
    *.png|*.PNG) printf '%s' 'image/png' ;;
    *.webp|*.WEBP) printf '%s' 'image/webp' ;;
    *.gif|*.GIF) printf '%s' 'image/gif' ;;
    *.svg|*.SVG) printf '%s' 'image/svg+xml' ;;
    *.pdf|*.PDF) printf '%s' 'application/pdf' ;;
    *.docx|*.DOCX) printf '%s' 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ;;
    *.xlsx|*.XLSX) printf '%s' 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ;;
    *.zip|*.ZIP) printf '%s' 'application/zip' ;;
    *) printf '%s' 'application/octet-stream' ;;
  esac
}

count=0

upload_dir() {
  kind=$1
  dir="$product_dir/$kind"
  [ -d "$dir" ] || return 0

  find "$dir" -type f ! -name '.gitkeep' -print | while IFS= read -r file; do
    rel=${file#"$product_dir/"}
    key="products/$slug/$rel"
    url="$base_url/$key"
    ct=$(content_type "$file")
    size=$(wc -c < "$file" | tr -d ' ')

    if [ "$size" -gt 330301440 ]; then
      echo "Error: file exceeds Wrangler's 315 MB upload limit: $rel" >&2
      echo "Use rclone or another S3-compatible client for this file." >&2
      exit 1
    fi

    if [ "$dry_run" = true ]; then
      printf 'DRY RUN  %-12s  %s\n' "$ct" "$key"
    else
      printf 'Uploading %-12s  %s\n' "$ct" "$key"
      run_wrangler r2 object put "$bucket/$key" \
        --file="$file" \
        --content-type="$ct" \
        --remote
    fi

    printf 'URL: %s\n' "$url"
  done
}

upload_dir docs
upload_dir images

if [ "$dry_run" = true ]; then
  echo "Dry run complete. Nothing was uploaded."
else
  echo "Upload complete."
fi

echo "Next: update products/$slug/manifest.yaml with only the R2 objects that actually exist."
