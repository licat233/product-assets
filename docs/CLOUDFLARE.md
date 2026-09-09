# Cloudflare Deployment

## Purpose

Cloudflare Pages is only the public image origin for product reference images.

GitHub remains the source of truth for product directories, manuals, datasheets, metadata, prompts, and repository documentation.

## Target configuration

- Repository: `licat233/product-assets`
- Cloudflare account: Licat personal account
- Zone: `licat.xyz`
- Pages project: `product-assets`
- Production branch: `main`
- Framework preset: None
- Build command: `sh scripts/build-public.sh`
- Output directory: `dist`
- Custom domain: `assets.licat.xyz`

## Source-to-public mapping

Source:

```text
products/<product-slug>/images/<filename>
```

Published URL:

```text
https://assets.licat.xyz/products/<product-slug>/images/<filename>
```

The build script copies only product image files into `dist/`. It does not publish:

- `product.md`
- `manifest.yaml`
- `docs/`
- manuals or datasheets
- repository documentation
- prompts
- agent rules

## Why a build step exists

Every product must remain self-contained in GitHub. Maintaining a second committed `public/products/...` copy would duplicate source images and eventually create drift.

`scripts/build-public.sh` generates the public image tree during deployment instead.

This keeps the architecture simple while preserving a single authoritative image source.

## Scope limits

Do not add the following unless a real need appears later and is explicitly approved:

- R2
- Cloudflare Images
- Workers application code
- database
- CMS
- image transformation pipeline
- framework dependencies

## Headers and indexing

Files under `static/` are copied to the root of the generated `dist/` output.

`static/_headers` should:

- allow cross-origin image retrieval
- discourage indexing of the asset origin

`static/robots.txt` should disallow crawling.

## Acceptance tests

After deployment:

1. `https://assets.licat.xyz/` returns HTTP 200.
2. At least one published product image returns HTTP 200 with the correct image content type.
3. `Access-Control-Allow-Origin: *` is present for `/products/*`.
4. A source metadata path such as `/products/<slug>/product.md` is not published.
5. A source document path such as `/products/<slug>/docs/user-manual.pdf` is not published.
6. `robots.txt` is reachable and disallows crawling.
7. Existing services under `licat.xyz` remain unchanged.
8. Native Git auto-deploy is enabled for `main`.

Before binding `assets.licat.xyz`, check that the hostname is not already used by another service. Never overwrite an existing DNS/service binding without explicit approval.
