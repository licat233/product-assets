# Product Assets

[中文](./README.md) · [ChatGPT Usage](./docs/CHATGPT-USAGE.md) · [Product Directory Spec](./docs/PRODUCT-DIRECTORY-SPEC.md)

This repository is a reusable product source-of-truth for **ChatGPT, DetailFlow, Codex, and other AI content workflows**.

Its purpose is not merely to store images. Each product should have a durable package of original product evidence, structured facts, authoritative reference images, and machine-readable metadata so a new ChatGPT session can understand the product without asking the user to upload the same files again.

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

- `product.md` is the LLM-friendly product summary and evidence index.
- `manifest.yaml` is the machine-readable inventory of documents, images, URLs, and DetailFlow defaults.
- `docs/` contains original authoritative evidence such as manuals, datasheets, test reports, and certification documents.
- `images/` contains authoritative real product reference images.

`product.md` does **not** replace the original manual or datasheet. Exact technical values should be verified against the authoritative source document before being used in commercial copy.

## Create a product

Do not recreate the structure from memory. Run:

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

Example:

```bash
bash scripts/new-product.sh led-sensor-light "LED Sensor Light"
```

Then add the real product documents and reference images, and complete `product.md` and `manifest.yaml` from those sources.

See [`docs/ADDING-A-PRODUCT.md`](./docs/ADDING-A-PRODUCT.md).

## How ChatGPT should read a product

For `<product-slug>`, ChatGPT should:

1. Read `products/<product-slug>/product.md`.
2. Read `products/<product-slug>/manifest.yaml`.
3. Open the relevant authoritative source documents referenced by the manifest.
4. Inspect all authoritative product images referenced by the manifest.
5. Separate information into:
   - user-confirmed corrections
   - authoritative-document facts
   - directly observed image facts
   - reasonable inference
   - unknown / do-not-claim
6. Start planning or generation only after the evidence review is complete.

Evidence priority:

```text
User-confirmed correction
        ↓
Manual / Datasheet / authoritative source
        ↓
Directly observable product-image fact
        ↓
Structured summary in product.md
        ↓
Reasonable creative inference
        ↓
Unknown: do not invent
```

## Recommended ChatGPT prompt for DetailFlow

Replace `<product-slug>` and send this in a new ChatGPT conversation:

```text
Use DetailFlow to create an 8-screen English ecommerce detail page for product:
<product-slug>

DetailFlow Skill:
https://github.com/AJbeckliy/detail-flow

Product repository:
https://github.com/licat233/product-assets

Before planning:
1. Read and follow the DetailFlow Skill, especially the ecommerce 8-screen product detail page workflow and both approval gates.
2. Read products/<product-slug>/product.md.
3. Read products/<product-slug>/manifest.yaml.
4. Open the relevant original manuals, datasheets, and other authoritative sources referenced by the manifest.
5. Inspect all authoritative real product images referenced by the manifest.
6. Separate user-confirmed facts, authoritative-document facts, directly observed image facts, reasonable inference, and unknown/do-not-claim information.
7. Verify exact specifications against the original manual/datasheet rather than relying only on product.md.
8. Do not invent specifications, certification status, test results, awards, discounts, partnerships, or unsupported commercial claims.
9. Use English visible commercial copy by default for the overseas market.
10. Do not generate final detail-page images immediately.
11. First produce the complete 8-screen Detail Page Blueprint and wait for my approval.
12. Follow both DetailFlow approval gates strictly.
```

Short form:

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.
Read product.md, manifest.yaml, the relevant original source documents, and all authoritative product images before planning.
Create an English overseas-market 8-screen ecommerce detail page and follow both DetailFlow approval gates strictly.
```

See [`docs/CHATGPT-USAGE.md`](./docs/CHATGPT-USAGE.md) for more examples.

## Repository map

```text
products/                      # one product directory per product
templates/                     # product.md and manifest.yaml templates
docs/                          # operating documentation
prompts/                       # reusable ChatGPT / DetailFlow prompts
scripts/new-product.sh         # creates the canonical product scaffold
scripts/                       # asset and deployment helper scripts
static/                        # static publishing support files
```

## Scope

This repository is intentionally focused. It is not a CMS, ERP, PIM, ecommerce backend, social publishing system, or marketing-output archive.

Its core responsibility is:

> Preserve traceable, reusable product evidence and structured facts so ChatGPT and other AI workflows can reliably understand the product later.
