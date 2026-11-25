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

## Product Detail Designer capability preflight

**Pinned Skill:** Product Detail Designer v1.0.3 — https://github.com/licat233/product-detail-designer

Read only the pinned Skill file: https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.3/SKILL.md

The user's task-specific prompt controls page structure, approval gates, image ratio, and deliverables. Product Detail Designer supplies general product-identity, factual-accuracy, visual-consistency, and image-quality safeguards; do not add unrequested stages or dependencies.

### Stage 0 — image generation first

Before reading product evidence or producing a Blueprint, verify that the current session has an actually invokable image-generation/editing capability for the outputs requested by the user's prompt.

If it does not, state the limitation and stop. Do not pretend to generate images.

### Stage 1 — Skill + metadata

If Stage 0 passes:

1. Read the pinned Product Detail Designer `SKILL.md` at https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.3/SKILL.md.
2. Read the product `product.md`.
3. Read the product `manifest.yaml`.

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


### Stage 4 — Separate product evidence from visual design

Product PDFs, brochures, manuals, and specification sheets are factual sources by default, not visual templates. Extract verified facts and useful individual product images, but do not trace, recolor, rearrange, translate, or adapt the source document's page UI, layout, tables, icon grids, backgrounds, or page order. Use real product photos to preserve product appearance. Only follow a document's visual design when the user explicitly designates it as a style/layout reference or asks for a faithful redesign.

The final ecommerce page must be independently conceived for the buyer, market, and platform. If it looks like a restyled PDF or follows the PDF page by page, reject and redesign it.

## Continuous long-page composition (mandatory)

The eight final images must be **adjacent slices of one vertical ecommerce detail page**, not eight independent posters or PowerPoint slides. Screen / Slice is a file-delivery boundary only, not a buyer-visible page boundary.

- Plan one continuous top-to-bottom page first, then generate its separate high-resolution files.
- Define `top_edge_anchor` and `bottom_edge_anchor` for every slice. The previous slice's bottom background, lighting, texture, spatial depth, and visual direction must inform the next slice's top edge.
- Extend backgrounds naturally to image edges. Joins must not show a restarted background, color-temperature jump, spatial break, or meaningless empty gap.
- Do not let key products or props cross a seam unless their position, scale, and direction can be aligned reliably.
- Each image may have different content and composition, but must not become a self-contained promotional poster. Do not make separate cover/back-cover slides.
- Separate file generation does not mean independent design. Carry each slice's `bottom_edge_anchor` forward as the next slice's `top_edge_anchor`.

Unless explicitly requested, prohibit headers, footers, navigation bars, page numbers, Screen / Slice labels, 01–08 numbers, repeated logos/product title bars, corner badges, decorative corner elements, full-image borders, repeated top/bottom bars, and the PowerPoint pattern of “title at top + cards in the middle + logo at bottom.” Information cards, specification tables, and real instructional step numbers may appear within the content, but must not frame the entire slice as an independent slide.

Concatenate all images in order and inspect every top/bottom join. Repair background breaks, lighting jumps, spatial discontinuities, visible page boundaries, or slide-like styling. Never hide a failed join with blur, mirrored padding, borders, or arbitrary cropping.

### Stage 3 — Production Brief Confirmation

After inspecting the product materials and before the Blueprint, confirm output language, per-screen dimensions / aspect ratio, ecommerce platform and placement, and sales region. Skip items already stated in the user's prompt or explicitly delegated. Ask for all missing items in one concise message. If platform placement is known but size is missing, recommend a working size and ask for confirmation. Proceed once all four items are confirmed or delegated; do not add another visual approval gate.

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
