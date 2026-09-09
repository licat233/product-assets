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

The product slug is the stable identifier used by GitHub paths, Cloudflare image URLs, ChatGPT prompts, and DetailFlow.

## Creation rule

Do not recreate this directory tree manually or from memory. Create every new product with:

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

The script is the canonical scaffold mechanism. It creates the required directories, copies the current templates, fills the product slug and name, and refuses to overwrite an existing product directory.

## `docs/` — original evidence layer

Use `docs/` for the original product evidence supplied by the manufacturer or explicitly approved by the user.

Typical files:

- user manuals
- datasheets
- installation guides
- wiring diagrams
- test reports
- certification documents
- packaging specifications

These files are the primary source for exact technical specifications and operating behavior.

Do not silently rewrite source documents. If an original source is replaced with a newer revision, preserve the filename/version information needed to understand the change.

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

## `manifest.yaml` — machine-readable inventory

The manifest inventories the files and tells tools how to use them.

It should contain:

- product identity
- source document inventory
- source image inventory
- public image URLs
- evidence priority
- claims policy
- DetailFlow defaults

All paths inside the manifest should be relative to the product directory unless explicitly documented otherwise.

The scaffold template starts `documents` and `images` as empty lists. Add only files that actually exist; do not leave placeholder source entries that could be mistaken for evidence.

## `images/` — authoritative visual references

Use `images/` for real product photography or other user-approved source images that accurately represent the physical product.

Use semantic lowercase kebab-case filenames.

Good examples:

```text
hero-01.jpg
hero-02.jpg
front-view.jpg
rear-view.jpg
side-profile.jpg
connector-detail.jpg
label-markings.jpg
```

Avoid camera filenames such as `IMG_4832.jpg` after ingestion.

Do not use feature names that have not been verified. A filename itself must not turn an inference into a fact.

## Evidence priority

When evidence conflicts, resolve it in this order:

1. Explicit user-confirmed correction or override with provenance.
2. Authoritative source documents in `docs/`.
3. Facts directly observable in authoritative source images.
4. Derived summaries in `product.md`.
5. Reasonable creative inference.
6. Unknown information remains unknown.

## DetailFlow readiness

Before DetailFlow planning starts, ChatGPT should:

1. Read `product.md`.
2. Read `manifest.yaml`.
3. Read the authoritative source documents listed in the manifest that are relevant to the requested claims.
4. Inspect the authoritative source images.
5. Classify facts by evidence level.
6. Build the 8-screen blueprint only after the evidence review.

The presence of a product folder does not mean every possible claim is approved. Unsupported values must remain in the unknown/do-not-claim category.

## Public image publishing

Source images stay in `products/<slug>/images/`.

Cloudflare Pages publishes generated copies only at:

```text
https://assets.licat.xyz/products/<slug>/images/<filename>
```

Do not commit a duplicated public copy of the same image.
