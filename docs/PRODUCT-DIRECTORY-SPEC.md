# Product Directory Specification

This document defines the required structure and storage boundary for every product.

## Canonical local structure

Create every product with:

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

The local working tree is:

```text
products/<product-slug>/
├── product.md
├── manifest.yaml
├── docs/
│   └── .gitkeep
└── images/
    └── .gitkeep
```

When working on the product locally, place the real binary files into `docs/` and `images/` next to the `.gitkeep` placeholders.

Those binary files are intentionally ignored by Git.

## Why binaries are not committed

This repository is expected to grow over time. Product photos, manuals, datasheets, and their replaced revisions can make Git history grow much faster than the visible working tree.

Therefore:

- GitHub is the lightweight metadata repository.
- Cloudflare R2 is the binary asset store.
- Git must not become the long-term storage layer for JPG, PNG, WebP, PDF, DOCX, XLSX, ZIP, or similar product binaries.

Do not use `git add -f` to bypass the binary ignore rules.

## R2 object layout

R2 mirrors the local product-relative paths:

```text
products/<product-slug>/docs/<filename>
products/<product-slug>/images/<filename>
```

The public origin is:

```text
https://assets.licat.xyz/products/<product-slug>/docs/<filename>
https://assets.licat.xyz/products/<product-slug>/images/<filename>
```

The product slug is the stable identifier across GitHub, R2, ChatGPT prompts, and DetailFlow.

## `docs/` — authoritative evidence staging

Use local `docs/` for original product evidence before or during R2 upload.

Typical files:

- user manuals
- datasheets
- installation guides
- wiring diagrams
- test reports
- certification documents
- packaging specifications

After upload, `manifest.yaml` must record the R2 object key and retrievable URL for each authoritative document.

These source documents remain the primary evidence for exact specifications and operating behavior.

## `images/` — authoritative visual staging

Use local `images/` for real product photography or other user-approved source images.

Use semantic lowercase kebab-case filenames, for example:

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

AI-generated marketing outputs do not belong in the authoritative source set.

## `product.md` — LLM-friendly summary and evidence index

`product.md` is committed to Git and exists so ChatGPT does not have to rediscover the entire product from scratch in every new session.

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

`product.md` does not replace source documents. If a summary conflicts with an authoritative document, the authoritative document wins unless an explicit user-confirmed correction is recorded.

## `manifest.yaml` — machine-readable inventory

`manifest.yaml` is committed to Git and inventories the remote evidence.

For documents and images it should record, as applicable:

- id
- type or role
- local staging path
- R2 object key
- public URL
- authority / evidence notes

The scaffold starts with empty `documents` and `images` arrays. Add entries only after the corresponding R2 object actually exists.

## Upload rule

Upload local binaries with:

```bash
bash scripts/upload-product-assets.sh <product-slug>
```

Use `--dry-run` first when needed:

```bash
bash scripts/upload-product-assets.sh <product-slug> --dry-run
```

The upload script does not make an unsupported file authoritative. Evidence classification still comes from the document content, image content, and user confirmation.

## Evidence priority

When evidence conflicts, resolve it in this order:

1. Explicit user-confirmed correction or override with provenance.
2. Authoritative source documents referenced in the manifest.
3. Facts directly observable in authoritative source images.
4. Derived summaries in `product.md`.
5. Reasonable creative inference.
6. Unknown information remains unknown.

## DetailFlow readiness

Before DetailFlow planning starts, ChatGPT should:

1. Read `product.md` from GitHub.
2. Read `manifest.yaml` from GitHub.
3. Open the relevant authoritative documents using manifest R2 URLs.
4. Inspect the authoritative product images using manifest R2 URLs.
5. Classify facts by evidence level.
6. Build the 8-screen blueprint only after the evidence review.

A product folder does not imply that every possible claim is approved. Unsupported values remain unknown/do-not-claim.
