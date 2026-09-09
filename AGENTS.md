# Agent Rules

This repository is a controlled product source-of-truth for product documents, product facts, and authoritative reference images.

## Product boundaries

- One product must live entirely under `products/<product-slug>/`.
- Do not place product-specific source files outside that product directory.
- Do not duplicate source images into a second committed publishing directory.
- `dist/` is generated output and must not be committed.

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
- Prefer semantic lowercase kebab-case filenames.
- Do not name an image after an unverified feature.

## Scope control

- Prefer the smallest change that satisfies the task.
- Do not add frameworks, databases, R2, Cloudflare Images, image-processing services, CMS layers, or build dependencies unless explicitly approved.
- Cloudflare publishing should expose only generated public image assets, not product source documents or metadata.
