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

Each product page lists source documents from `docs/` and authoritative visual references from `images/`.

The repository itself is public. The asset origin exists to provide stable direct binary URLs, not to change private data into public data.

## Binary evidence retrieval order

For PDFs, images, videos, drawings, brochures, and other binary sources, ChatGPT should try:

```text
1. manifest public_url
   → assets.licat.xyz

fail
   ↓
2. manifest source_url
   → raw.githubusercontent.com

fail
   ↓
3. complete GitHub connector base64
   → decode to original file
   → actually inspect restored file
```

Base64 alone is **not** evidence inspection. A filename, manifest entry, payload size, or undecoded base64 string is not proof of a product claim.

## Mandatory DetailFlow capability preflight

Do not assume a new ChatGPT session already knows what DetailFlow means.

DetailFlow is an external Skill/workflow at:

`https://github.com/AJbeckliy/detail-flow`

### Stage 0 — image generation first

Before reading product evidence, verify that the current session has an actually invokable image-generation/editing capability for:

- Visual Master
- 1:3 continuity master when required
- Screen 01–02
- Screen 03–08

If image generation/editing is unavailable, stop immediately. Do not read the remaining product evidence, do not produce the Blueprint, and do not enter Approval Gate 1.

Do not infer capability from the model name.

### Stage 1 — Skill + metadata

If Stage 0 passes:

1. read the current DetailFlow `SKILL.md` completely;
2. read the referenced files required for the ecommerce 8-screen workflow;
3. read the product `product.md`;
4. read the product `manifest.yaml`.

### Stage 2 — binary evidence

Before the Blueprint, the session must actually:

- inspect at least one authoritative original source document; and
- visually inspect at least one authoritative real product image.

Use the binary fallback order above. If all allowed routes fail, stop before the Blueprint.

## Recommended DetailFlow prompt

Use the canonical prompt here:

[`prompts/detailflow-session-bootstrap.md`](./prompts/detailflow-session-bootstrap.md)

The critical opening is:

```text
Use the DetailFlow workflow to create an English overseas-market ecommerce product detail page for product:

<product-slug>

IMPORTANT:
Do not assume you already know what "DetailFlow" means.

DetailFlow is an external GitHub Skill/workflow stored at:
https://github.com/AJbeckliy/detail-flow

Product source repository:
https://github.com/licat233/product-assets

BEFORE producing any Blueprint or reaching Approval Gate 1, run this capability preflight in order.

STAGE 0 — IMAGE GENERATION FIRST

Confirm that this ChatGPT session has an actually invokable image-generation/editing capability.

If image generation/editing is unavailable:
STOP IMMEDIATELY.
Do not read the remaining product evidence.
Do not produce the 8-screen Blueprint.
Do not enter Approval Gate 1.

STAGE 1 — DETAILFLOW CONTRACT + PRODUCT METADATA

Read the current DetailFlow SKILL.md and required referenced ecommerce workflow files, then read product.md and manifest.yaml.

STAGE 2 — BINARY EVIDENCE

Use:
public_url → source_url → complete connector base64 decoded back to the original file only when the restored file can actually be inspected.

Base64 alone does NOT count as evidence inspection.

Do not produce the Blueprint unless at least one authoritative original document and one authoritative real product image have actually been inspected.
```

See [`docs/CHATGPT-USAGE.md`](./docs/CHATGPT-USAGE.md) for the full rules.

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

To add another product later:

```bash
git sparse-checkout add products/<another-product-slug>
```

## Scope

This repository is intentionally focused. It is not a CMS, ERP, PIM, ecommerce backend, social publishing system, or marketing-output archive.

Its responsibility is:

> Preserve traceable, reusable product evidence and structured facts while automating repetitive file-management work.
