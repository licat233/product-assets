# Product Assets

[中文](./README.md) · [ChatGPT Usage](./docs/CHATGPT-USAGE.md) · [Product Directory Spec](./docs/PRODUCT-DIRECTORY-SPEC.md)

This repository is a reusable product source-of-truth for **ChatGPT, Product Detail Designer, Codex, and other AI content workflows**.

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

## Mandatory Product Detail Designer preflight

Do not assume the current ChatGPT session can generate images. Verify that native image generation/editing is actually available.

**Pinned Skill release:**
- Repository: https://github.com/licat233/product-detail-designer
- Version: `v1.0.2`
- Only required file: https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.2/SKILL.md

### Stage 0 — image generation

Verify that this session can actually generate or edit the requested images. If the task-specific prompt requires a visual master, continuity master, or staged image generation, verify those requested operations as well.

If image generation is unavailable, state the limitation and stop. Do not pretend to generate images.

### Stage 1 — Skill + product metadata

1. Read the pinned `SKILL.md` at https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.2/SKILL.md.
2. Read the product `product.md`.
3. Read the product `manifest.yaml`.

The user's production prompt defines the page structure, approval gates, and deliverables. Product Detail Designer provides only general product-identity, factual-accuracy, visual-consistency, and image-quality safeguards.

### Stage 2 — binary evidence

Before the Blueprint, the session must actually:

- inspect at least one authoritative original source document; and
- visually inspect at least one authoritative real product image.

Use the binary fallback order above. If all allowed routes fail, stop before the Blueprint.


### Stage 3 — confirm the production brief (before the Blueprint)

After inspecting the product evidence and before producing the Blueprint, confirm:

- Output language
- Image dimensions / aspect ratio for each screen
- Ecommerce platform and specific placement
- Sales country / region

Do not ask again for items already specified in the user's prompt (for example, English or a 9:21 vertical ratio). Ask for all missing items together. If the user does not know the size, recommend one based on the confirmed platform placement and ask for confirmation. If the user explicitly delegates a decision, choose and state the assumption. See [Product Detail Designer v1.0.2](https://github.com/licat233/product-detail-designer/releases/tag/v1.0.2).
## Product documents are not design templates

Product PDFs, brochures, and specification sheets are factual sources by default. Unless the user explicitly requests a faithful redesign, do not copy their page UI, layout, icon grids, tables, backgrounds, or page order. Independently plan and design the ecommerce detail page for the buyer and platform. A result that merely recolors or retypes the source PDF fails review.

## Recommended Product Detail Designer prompt

Use the canonical prompt here:

[`prompts/detailflow-session-bootstrap.md`](./prompts/detailflow-session-bootstrap.md)

The critical opening is:

```text
Use Product Detail Designer and the task-specific production prompt to create an English overseas-market ecommerce product detail page for product:

<product-slug>

IMPORTANT:
Do not assume you already know this Skill; read the pinned SKILL.md first.

Product Detail Designer is our own open-source GitHub Skill, pinned to release v1.0.2:
https://github.com/licat233/product-detail-designer/tree/v1.0.2

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

STAGE 1 — PRODUCT DETAIL DESIGNER SKILL + PRODUCT METADATA

Read the pinned `SKILL.md` at `https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.2/SKILL.md`. Then read product.md and manifest.yaml. The user's prompt controls the task-specific workflow; the Skill supplies general safeguards.

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
