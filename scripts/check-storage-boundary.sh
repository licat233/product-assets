#!/bin/sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$repo_root"

if ! command -v git >/dev/null 2>&1; then
  echo "Error: git is required." >&2
  exit 1
fi

tracked=$(git ls-files 'products/*/docs/*' 'products/*/images/*' | grep -v '/.gitkeep$' || true)

if [ -n "$tracked" ]; then
  echo "Error: product binary paths are tracked by Git:" >&2
  printf '%s\n' "$tracked" >&2
  echo "Product binaries belong in Cloudflare R2, not Git history." >&2
  exit 1
fi

echo "Storage boundary PASS: no product binaries are tracked by Git."
