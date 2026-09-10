# Agent Rules

This repository is a controlled product source-of-truth for product documents, product facts, and authoritative reference images.

## Product boundaries

- One product must live entirely under `products/<product-slug>/`.
- Do not place product-specific source files outside that product directory.
- Do not duplicate source assets into a second committed publishing directory.
- `dist/` is generated output and must not be committed.

## Manifest automation

- `manifest.yaml` is machine-generated inventory. Do not ask the user to edit it manually.
- Before committing any change to a product's `docs/`, `images/`, or `product.md`, run:

  ```bash
  bash scripts/sync-manifest.sh <product-slug>
  ```

- When multiple products changed, run `bash scripts/sync-manifest.sh` with no slug to sync all products.
- Commit the resulting `manifest.yaml` changes together with the product files.
- The manifest is derived from the actual directory contents plus product identity fields in `product.md`.
- If the manifest and directory contents disagree, regenerate the manifest instead of hand-editing its file lists.
- Every source document and image/reference media file should receive both a repository source URL and a stable `public_url` under `https://assets.licat.xyz/products/<slug>/...` when applicable.

## Evidence rules

- Never invent product facts.
- Preserve the evidence classes: user-confirmed, authoritative-document fact, directly observed image fact, reasonable inference, and unknown/do-not-claim.
- Original manuals, datasheets, certification documents, and test documents in `docs/` are evidence, not decoration.
- `product.md` is an LLM-friendly summary and index; it does not override authoritative source documents unless it records an explicit user-confirmed correction with provenance.
- A visible compliance mark in a photo is not automatically proof of formal certification.
- Unknown parameters remain unknown until supported by evidence.

## Image rules

- `images/` contains authoritative real product references.
- Do not replace source photos with AI-generated images.
- Preserve original product shape, ports, controls, markings, materials, colors, and proportions.
- Prefer semantic lowercase kebab-case filenames when practical.
- Do not name an image after an unverified feature.

## DetailFlow capability preflight

The preflight must stop as early as possible when the current ChatGPT session cannot complete DetailFlow.

### Stage 0 — image generation first

Before reading product evidence or producing a Blueprint, verify that the current session has an actually invokable image-generation/editing capability for the Visual Master and final slices.

If it does not, stop immediately. Do not read the remaining product evidence, do not produce the Blueprint, and do not enter Approval Gate 1.

### Stage 1 — Skill + metadata

If Stage 0 passes:

1. read the current DetailFlow `SKILL.md` and required referenced ecommerce workflow files;
2. read the product `product.md`;
3. read the product `manifest.yaml`.

Do not substitute prior memory or a generic ecommerce workflow for the current DetailFlow repository contract.

### Stage 2 — binary evidence fallbacks

For PDFs, images, videos, drawings, brochures, and other binary evidence, try in this order:

1. manifest `public_url` on `assets.licat.xyz`;
2. manifest `source_url` on `raw.githubusercontent.com`;
3. only if the GitHub connector provides the complete binary as base64 and the session can decode it back into the original file, restore the file and actually inspect it.

Base64 alone is not evidence inspection. A filename, manifest entry, binary length, or undecoded payload is not proof of a claim.

Before the Blueprint, the session must successfully:

- inspect at least one authoritative original source document; and
- visually inspect at least one authoritative real product image.

If those checks still fail after the allowed fallbacks, stop before the Blueprint and report the missing capability. Do not let the workflow reach Gate 1 and fail later.

## Public publishing boundary

Cloudflare Pages may publish:

- original source documents under `products/<slug>/docs/`;
- authoritative visual references under `products/<slug>/images/`;
- generated static browsing/index pages.

It must not publish:

- `product.md`;
- `manifest.yaml`;
- repository README/docs/prompts;
- agent rules.

The repository itself is public, so publishing product source binaries through `assets.licat.xyz` provides a stable retrieval path rather than changing private data into public data. Do not add confidential or customer-private files to this repository.

## Scope control

- Prefer the smallest change that satisfies the task.
- Do not add frameworks, databases, R2, Cloudflare Images, image-processing services, CMS layers, or build dependencies unless explicitly approved.
