# Product Assets

[中文](./README.md) · [ChatGPT Usage](./docs/CHATGPT-USAGE.md) · [Product Directory Spec](./docs/PRODUCT-DIRECTORY-SPEC.md)

This repository is a reusable product source-of-truth for **ChatGPT, DetailFlow, Codex, and other AI content workflows**.

Its purpose is to preserve original product evidence, structured facts, authoritative visual references, and machine-readable metadata so a new ChatGPT session can understand a product without asking the user to upload the same files again.

## Core rule

**One product = one independent product directory.**

```text
products/<product-slug>/
├── product.md
├── manifest.yaml
├── docs/
│   ├── user-manual.pdf
│   ├── datasheet.pdf
│   └── ...
└── images/
    ├── hero-01.jpg
    ├── front-view.jpg
    ├── rear-view.jpg
    └── ...
```

- `product.md` is the human/LLM-friendly product summary and evidence index.
- `manifest.yaml` is an **auto-generated** machine inventory. Users should not maintain it manually.
- `docs/` contains original authoritative evidence such as manuals, datasheets, drawings, test reports, and certification documents.
- `images/` contains authoritative real product reference images and reference videos.

Exact technical values should be verified against original source documents.

## Create a product

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

Then add source documents to `docs/`, real product media to `images/`, and maintain `product.md`.

Regenerate the machine inventory with:

```bash
bash scripts/sync-manifest.sh <product-slug>
```

Agents are required by `AGENTS.md` to do this automatically before committing product changes.

## Public binary evidence origin

Cloudflare Pages generates:

```text
https://assets.licat.xyz/
```

Each product page lists:

- source documents from `docs/`
- authoritative visual references from `images/`

Stable binary URLs follow these patterns:

```text
https://assets.licat.xyz/products/<slug>/docs/<filename>
https://assets.licat.xyz/products/<slug>/images/<filename>
```

The GitHub repository is already public. The asset origin provides a stable direct binary retrieval path so ChatGPT does not have to depend on GitHub connector/base64 handling for PDFs, images, or videos.

Product metadata files (`product.md`, `manifest.yaml`) remain read from GitHub.

## ChatGPT reading rule

```text
GitHub
→ product.md / manifest.yaml / text metadata

assets.licat.xyz
→ PDFs / datasheets / drawings / images / videos / binary evidence
```

The manifest records both source URLs and stable `public_url` values.

## Mandatory DetailFlow capability preflight

Before Approval Gate 1, a ChatGPT session must verify that it can:

1. generate images in the current session;
2. read `product.md`;
3. read `manifest.yaml`;
4. inspect at least one original document through an `assets.licat.xyz` `public_url`;
5. visually inspect at least one authoritative product image through an `assets.licat.xyz` `public_url`.

If any capability is unavailable, stop **before** the 8-screen blueprint. Do not reach Gate 1 and only then discover that Visual Master or final image generation cannot continue.

## Recommended DetailFlow prompt

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.

Before Approval Gate 1, run a capability preflight:
- confirm this session can generate images;
- read product.md and manifest.yaml from GitHub;
- use manifest public_url links on assets.licat.xyz for binary documents and visual references;
- verify that at least one original document can be inspected;
- visually inspect at least one authoritative product image.

If any of those capabilities are unavailable, stop before the blueprint and tell me immediately.

If the preflight passes, review the relevant original sources, create the English overseas-market 8-screen DetailFlow blueprint, and follow both approval gates strictly.
```

See [`docs/CHATGPT-USAGE.md`](./docs/CHATGPT-USAGE.md) and [`prompts/detailflow-session-bootstrap.md`](./prompts/detailflow-session-bootstrap.md).

## Lightweight clone for collaborators

Avoid a full clone as the binary catalog grows.

```bash
git clone --filter=blob:none --sparse https://github.com/licat233/product-assets.git
cd product-assets

git sparse-checkout set \
  scripts \
  templates \
  products/<product-slug>
```

This keeps the repository history and structure while downloading only the files needed for the selected product.

To add another product later:

```bash
git sparse-checkout add products/<another-product-slug>
```

## Scope

This repository is intentionally focused. It is not a CMS, ERP, PIM, ecommerce backend, social publishing system, or marketing-output archive.

Its responsibility is:

> Preserve traceable, reusable product evidence and structured facts while automating repetitive file-management work.
