# Product Directory Specification

This document defines the required structure for every product in this repository.

## Canonical structure

```text
products/<product-slug>/
├── product.md
├── manifest.yaml
├── docs/
│   ├── user-manual.pdf
│   ├── datasheet.pdf
│   ├── installation-guide.pdf
│   └── ...
└── images/
    ├── hero-01.jpg
    ├── front-view.jpg
    ├── rear-view.jpg
    └── ...
```

The product slug is the stable identifier used by GitHub paths, Cloudflare asset URLs, ChatGPT prompts, and DetailFlow.

## Creation rule

Do not recreate this directory tree manually or from memory. Create every new product with:

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

The script is the canonical scaffold mechanism. It creates the required directories, fills the product slug and name, generates the initial manifest, and refuses to overwrite an existing product directory.

## `docs/` — original evidence layer

Use `docs/` for original product evidence supplied by the manufacturer or explicitly approved by the user.

Typical files:

- user manuals
- datasheets
- installation guides
- wiring diagrams
- dimension drawings
- test reports
- certification documents
- packaging specifications
- manufacturer brochures

These files are the primary source for exact technical specifications and operating behavior.

Do not silently rewrite source documents. If an original source is replaced with a newer revision, preserve enough filename/version information to understand the change.

## `product.md` — LLM-friendly summary and evidence index

`product.md` exists so ChatGPT does not have to rediscover the entire product from scratch in every new session.

It should summarize:

- product identity
- source register
- user-confirmed corrections
- exact specifications with provenance
- supported functions
- directly observed image facts
- supported applications
- reasonable creative inferences
- unknown / do-not-claim items
- candidate DetailFlow claim seeds

`product.md` does not replace the source documents. If a derived summary conflicts with an authoritative document, the source document wins unless an explicit user-confirmed correction is recorded.

## `manifest.yaml` — auto-generated machine inventory

`manifest.yaml` is a generated file. **The user should not maintain it manually.**

It inventories:

- product identity derived from `product.md`
- actual files present in `docs/`
- actual files present in `images/`
- file/media types
- GitHub source URLs
- stable `assets.licat.xyz` `public_url` values for documents and visual references
- evidence priority
- claims policy
- DetailFlow defaults

Regenerate one product with:

```bash
bash scripts/sync-manifest.sh <product-slug>
```

Or regenerate all products with:

```bash
bash scripts/sync-manifest.sh
```

Generated manifests start with:

```yaml
# AUTO-GENERATED FILE — DO NOT EDIT MANUALLY.
```

If the manifest disagrees with the directory contents, regenerate it. Do not manually repair file lists.

Agents must run the manifest sync before committing changes to `product.md`, `docs/`, or `images/`.

## `images/` — authoritative visual references

Use `images/` for real product photography or other user-approved source media that accurately represent the physical product.

Reference videos may also live here when they help establish product appearance or operating behavior.

Prefer semantic filenames when practical.

Good examples:

```text
hero-01.jpg
front-view.jpg
rear-view.jpg
side-profile.jpg
connector-detail.jpg
label-markings.jpg
product-demo.mp4
```

Do not use feature names that have not been verified. A filename itself must not turn an inference into a fact.

## Evidence priority

When evidence conflicts, resolve it in this order:

1. Explicit user-confirmed correction or override with provenance.
2. Authoritative source documents in `docs/`.
3. Facts directly observable in authoritative source images.
4. Derived summaries in `product.md`.
5. Reasonable creative inference.
6. Unknown information remains unknown.

## DetailFlow readiness and capability preflight

Before DetailFlow produces the 8-screen blueprint, the ChatGPT session should first verify that it can:

1. read `product.md`;
2. read the generated `manifest.yaml`;
3. inspect at least one original source document through an `assets.licat.xyz` `public_url`;
4. visually inspect at least one authoritative product image through an `assets.licat.xyz` `public_url`;
5. generate images in the current session.

If any capability is unavailable, stop before Approval Gate 1 rather than producing a blueprint that cannot proceed to the Visual Master stage.

After the preflight passes, ChatGPT should read the authoritative source documents relevant to the requested claims, inspect the authoritative source media, classify facts by evidence level, and only then build the 8-screen blueprint.

## Public binary publishing

Cloudflare Pages publishes original binary evidence at stable URLs:

```text
https://assets.licat.xyz/products/<slug>/docs/<filename>
https://assets.licat.xyz/products/<slug>/images/<filename>
```

The repository itself is public, so these URLs provide a stable retrieval path for already-public source files. Do not place confidential or customer-private files in this repository.

The static browser is generated at:

```text
https://assets.licat.xyz/
```

Product metadata (`product.md`, `manifest.yaml`) remains available from GitHub rather than the public asset origin.

Do not commit a duplicated public copy of the same binary asset; `dist/` is generated at build time.
