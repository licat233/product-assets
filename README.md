# ARMOR Product Assets

Source-of-truth repository for ARMOR product facts and authoritative product reference images used by ChatGPT, Codex, DetailFlow, website content, and approved content workflows.

## Architecture

- **GitHub — `licat233/product-assets`** stores product facts, provenance, manifests, templates, and the authoritative reference-image set.
- **Cloudflare Pages** publishes only `public/` as a stable public asset origin at `https://assets.licat.xyz/`.
- **DetailFlow** reads a product folder and its referenced images before planning an ecommerce detail page.

The repository is intentionally simple: no application framework, database, R2, Cloudflare Images, or custom asset pipeline is required for the initial stage.

## Repository structure

```text
products/<product-slug>/
  product.md       # human-readable source of truth
  manifest.yaml    # machine-readable asset inventory + DetailFlow settings

public/products/<product-slug>/
  *.jpg / *.png    # authoritative product reference images served by Cloudflare

templates/
  product.md
  manifest.yaml

docs/
  ADDING-A-PRODUCT.md
  CHATGPT-USAGE.md
  CLOUDFLARE.md

prompts/
  detailflow-session-bootstrap.md
```

## Evidence rules

1. `product.md` is the primary factual source for content generation.
2. Keep **confirmed**, **directly observed**, **reasonable inference**, and **unknown / do-not-claim** information separate.
3. Never promote an inference to a confirmed fact without evidence.
4. A visible compliance mark is not automatically proof of formal certification. Record what is visible unless supporting certification evidence exists.
5. Use semantic lowercase kebab-case image filenames rather than camera filenames.
6. Preserve original product shape, ports, controls, markings, materials, and proportions in authoritative reference images.
7. Only files under `public/` are intended to be exposed through the Cloudflare asset origin.

## Current product

- `rechargeable-led-sensor-light`

See `docs/CHATGPT-USAGE.md` for the reusable DetailFlow prompt and `docs/ADDING-A-PRODUCT.md` for the product-ingestion contract.
