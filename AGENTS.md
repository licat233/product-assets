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
- Every source document and image/reference media file should receive a stable `public_url` under `https://assets.licat.xyz/products/<slug>/...` so ChatGPT can retrieve binary evidence without relying on GitHub connector base64 output.

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

Before a DetailFlow session reaches Approval Gate 1, the session should verify that it can:

1. read `product.md` and `manifest.yaml`;
2. inspect an original source document through an `assets.licat.xyz` `public_url`;
3. visually inspect an authoritative product image through an `assets.licat.xyz` `public_url`;
4. generate images in the current ChatGPT session.

If any of these are unavailable, report the missing capability before producing the blueprint. Do not let the workflow reach Gate 1 and then discover that Visual Master or final image generation cannot continue.

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
