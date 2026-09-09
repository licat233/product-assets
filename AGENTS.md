# Agent Rules

This repository is a controlled product source-of-truth for product metadata, evidence indexes, and DetailFlow inputs.

## Storage architecture

- GitHub stores lightweight metadata only: `product.md`, `manifest.yaml`, templates, scripts, and repository documentation.
- Product binary files such as JPG, PNG, WebP, PDF, DOCX, XLSX, ZIP, and similar assets must not be committed to Git history.
- Cloudflare R2 is the approved binary asset store.
- Product binaries use the same logical product slug and object layout as the local product directory.
- `assets.licat.xyz` is the public asset origin for R2 objects that ChatGPT / DetailFlow must retrieve directly.
- Do not reintroduce Cloudflare Pages as the long-term binary store after the R2 migration is complete.

## Product boundaries

- One product uses one stable slug under `products/<product-slug>/`.
- Every scaffold contains `product.md`, `manifest.yaml`, `docs/`, and `images/`.
- `docs/` and `images/` are local staging directories whose binary contents are ignored by Git; only `.gitkeep` placeholders are tracked.
- The R2 object layout mirrors those directories:
  - `products/<slug>/docs/<filename>`
  - `products/<slug>/images/<filename>`
- Do not mix assets from different products.

## Evidence rules

- Never invent product facts.
- Preserve the evidence classes: user-confirmed, authoritative-document fact, directly observed image fact, reasonable inference, and unknown/do-not-claim.
- Original manuals, datasheets, certification documents, and test documents uploaded to R2 are evidence, not decoration.
- `product.md` is an LLM-friendly summary and evidence index; it does not override authoritative source documents unless it records an explicit user-confirmed correction with provenance.
- A visible compliance mark in a photo is not automatically proof of formal certification.
- Unknown parameters remain unknown until supported by evidence.

## Image rules

- `images/` is for authoritative real product references staged locally before upload to R2.
- Do not replace source photos with AI-generated images.
- Preserve original product shape, ports, controls, markings, materials, colors, and proportions.
- Prefer semantic lowercase kebab-case filenames.
- Do not name an image after an unverified feature.

## Scope control

- Prefer the smallest change that satisfies the task.
- R2 is intentionally approved for binary product assets because Git history must remain lightweight.
- Do not add Cloudflare Images, a database, CMS, image-processing pipeline, or application framework unless explicitly approved.
- Do not force-add ignored binary files to Git.
