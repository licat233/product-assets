#!/bin/sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$repo_root"

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is required to sync product manifests." >&2
  exit 1
fi

node scripts/sync-manifest.mjs "$@"
