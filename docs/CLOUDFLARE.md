# Cloudflare Deployment

## Purpose

Cloudflare Pages is the public visual-asset origin and static asset browser for this repository.

GitHub remains the source of truth for product directories, manuals, datasheets, metadata, prompts, and repository documentation.

## Target configuration

- Repository: `licat233/product-assets`
- Cloudflare account: Licat personal account
- Zone: `licat.xyz`
- Pages project: `product-assets`
- Production branch: `main`
- Framework preset: None
- Build command: `bash scripts/build-public.sh`
- Output directory: `dist`
- Custom domain: `assets.licat.xyz`

## Public asset browser

The build generates a lightweight static browser automatically.

Root:

```text
https://assets.licat.xyz/
```

shows the product list.

Each product has a generated page:

```text
https://assets.licat.xyz/products/<product-slug>/
```

which lists the public visual files from that product's `images/` directory with previews and direct links.

The generated machine-readable catalog is:

```text
https://assets.licat.xyz/catalog.json
```

No framework, database, CMS, or server-side application is required. The browser is generated at build time by `scripts/generate-asset-browser.mjs`.

## Source-to-public mapping

Source:

```text
products/<product-slug>/images/<filename>
```

Published URL:

```text
https://assets.licat.xyz/products/<product-slug>/images/<filename>
```

Supported public visual media currently include common image formats and browser-friendly video files such as MP4/WebM.

The build does **not** publish:

- `product.md`
- `manifest.yaml`
- `docs/`
- manuals or datasheets
- repository documentation
- prompts
- agent rules

The product page links back to the corresponding GitHub source package when the original source files need to be inspected.

## Why a build step exists

Every product remains self-contained in GitHub. Maintaining a second committed `public/products/...` copy would duplicate assets and create drift.

`scripts/build-public.sh` creates `dist/` during deployment and calls the static browser generator. The generated output contains only the public browsing interface and public visual assets.

## Scope limits

Do not add the following unless a real need appears later and is explicitly approved:

- R2
- Cloudflare Images
- Workers application code
- database
- CMS
- image transformation pipeline
- frontend framework dependencies

## Headers and indexing

`static/_headers` should:

- allow cross-origin retrieval for `/products/*`
- discourage indexing of the asset origin

`static/robots.txt` should disallow crawling.

## Acceptance tests

After deployment:

1. `https://assets.licat.xyz/` returns HTTP 200 and shows the product list.
2. `https://assets.licat.xyz/products/<slug>/` returns HTTP 200 and shows the published files for that product.
3. At least one published image or video returns HTTP 200 with the correct content type.
4. `Access-Control-Allow-Origin: *` is present for `/products/*`.
5. `https://assets.licat.xyz/catalog.json` returns the generated product/media inventory.
6. A source metadata path such as `/products/<slug>/product.md` is not published.
7. A source document path such as `/products/<slug>/docs/user-manual.pdf` is not published.
8. `robots.txt` is reachable and disallows crawling.
9. Existing services under `licat.xyz` remain unchanged.
10. Native Git auto-deploy is enabled for `main`.

Before binding `assets.licat.xyz`, check that the hostname is not already used by another service. Never overwrite an existing DNS/service binding without explicit approval.
