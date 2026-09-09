# Cloudflare Deployment

## Purpose

Cloudflare Pages is the stable public binary origin and static asset browser for product evidence that ChatGPT / DetailFlow needs to retrieve directly.

GitHub remains the source of truth for product directories, product facts, metadata, prompts, and repository documentation.

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

Each product page exposes two sections:

- Source documents from `docs/`
- Authoritative visual references from `images/`

The generated machine-readable catalog is:

```text
https://assets.licat.xyz/catalog.json
```

No framework, database, CMS, or server-side application is required. The browser is generated at build time by `scripts/generate-asset-browser.mjs`.

## Source-to-public mapping

Source documents:

```text
products/<product-slug>/docs/<filename>
```

Published URL:

```text
https://assets.licat.xyz/products/<product-slug>/docs/<filename>
```

Authoritative visual references:

```text
products/<product-slug>/images/<filename>
```

Published URL:

```text
https://assets.licat.xyz/products/<product-slug>/images/<filename>
```

The build does **not** publish:

- `product.md`
- `manifest.yaml`
- repository documentation
- prompts
- agent rules

## Why source documents are public here

The GitHub repository itself is public, so manuals, datasheets and other source files committed under `products/<slug>/docs/` are already publicly retrievable from GitHub.

Publishing those same binaries through `assets.licat.xyz` does not create a new privacy boundary. It provides a stable direct URL that ChatGPT can use without depending on GitHub connector base64 handling.

Do not add confidential, customer-private, NDA-protected, credential-bearing, or internal-only files to this public repository or asset origin.

## ChatGPT retrieval rule

For binary evidence, prefer the `public_url` in `manifest.yaml`:

```text
GitHub connector
→ product.md / manifest.yaml / text metadata

assets.licat.xyz
→ PDF / JPG / PNG / video / other binary evidence
```

This separation exists because GitHub connector access can return binary files as base64 or otherwise fail to place them into the document/image inspection path used by a ChatGPT session.

## Why a build step exists

Every product remains self-contained in GitHub. Maintaining a second committed `public/products/...` copy would duplicate assets and create drift.

`scripts/build-public.sh` creates `dist/` during deployment and calls the static browser generator. The generated output contains the browsing interface plus copies of the source binaries required for retrieval.

`dist/` is generated output and must not be committed.

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
2. `https://assets.licat.xyz/products/<slug>/` returns HTTP 200 and lists source documents plus visual references.
3. At least one published image returns HTTP 200 with the correct image content type.
4. At least one published source PDF returns HTTP 200 with `application/pdf`.
5. `Access-Control-Allow-Origin: *` is present for `/products/*`.
6. `https://assets.licat.xyz/catalog.json` returns the generated product/document/media inventory.
7. A source metadata path such as `/products/<slug>/product.md` is not published.
8. A source metadata path such as `/products/<slug>/manifest.yaml` is not published.
9. `robots.txt` is reachable and disallows crawling.
10. Existing services under `licat.xyz` remain unchanged.
11. Native Git auto-deploy is enabled for `main`.

Before binding `assets.licat.xyz`, check that the hostname is not already used by another service. Never overwrite an existing DNS/service binding without explicit approval.
