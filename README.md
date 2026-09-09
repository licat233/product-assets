# Product Assets

Structured source-of-truth repository for product facts, evidence indexes, DetailFlow inputs, and references to product binary assets.

The repository is designed so ChatGPT, Codex, and other approved tools can understand a product without requiring the user to re-upload the same manual, specifications, and reference images in every new session.

## Core architecture

**GitHub stores metadata. Cloudflare R2 stores binaries.**

Git history must remain lightweight as the catalog grows.

For every product, the local working tree keeps the familiar structure:

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
    └── ...
```

But there is an important storage boundary:

- `product.md` and `manifest.yaml` are committed to Git.
- Binary contents of `docs/` and `images/` are ignored by Git and used only as local staging files.
- After upload, the binary files live in Cloudflare R2 under the same logical paths.
- `.gitkeep` files preserve the empty local staging directories in a fresh clone.

R2 object layout:

```text
products/<product-slug>/docs/<filename>
products/<product-slug>/images/<filename>
```

Public asset URLs:

```text
https://assets.licat.xyz/products/<product-slug>/docs/<filename>
https://assets.licat.xyz/products/<product-slug>/images/<filename>
```

This prevents product photos, manuals, and their historical revisions from making normal Git clone/pull operations progressively heavier.

## Create a new product

Do not recreate the directory structure from memory. Use:

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

Example:

```bash
bash scripts/new-product.sh led-sensor-light "LED Sensor Light"
```

Then place the original files into the generated local staging directories:

```text
products/led-sensor-light/docs/
products/led-sensor-light/images/
```

Those binary files are intentionally ignored by Git.

Upload them to R2 with:

```bash
bash scripts/upload-product-assets.sh led-sensor-light
```

Preview the upload without changing R2:

```bash
bash scripts/upload-product-assets.sh led-sensor-light --dry-run
```

After upload, populate `product.md` and `manifest.yaml`, including the real R2 object keys and URLs, then commit only the metadata.

Before committing, verify the storage boundary:

```bash
bash scripts/check-storage-boundary.sh
```

This fails if product binaries under `docs/` or `images/` have accidentally become tracked by Git.

## Evidence priority

When sources disagree, use this order:

1. Explicit user-confirmed correction recorded with provenance.
2. Authoritative product documents referenced by the manifest.
3. Facts directly observable in authoritative product images.
4. Derived summaries in `product.md`.
5. Reasonable creative inference.
6. Unknown information must remain unknown and must not be invented.

## DetailFlow

A new ChatGPT session should read:

1. `products/<slug>/product.md` from GitHub.
2. `products/<slug>/manifest.yaml` from GitHub.
3. Authoritative source documents using the R2 URLs in the manifest.
4. Product reference images using the R2 URLs in the manifest.

Only after reviewing those sources should DetailFlow produce the 8-screen blueprint.

## Repository map

```text
products/                          # lightweight product metadata + local ignored staging dirs
templates/                         # product.md and manifest.yaml templates
docs/                              # repository operating rules
prompts/                           # reusable ChatGPT / DetailFlow bootstrap prompt
scripts/new-product.sh             # creates canonical product scaffold
scripts/upload-product-assets.sh   # uploads local docs/images to Cloudflare R2
scripts/check-storage-boundary.sh  # prevents product binaries from entering Git history
scripts/build-public.sh            # legacy Pages build; remove after R2 cutover
static/                            # legacy Pages root files; remove after R2 cutover
```

See:

- `docs/PRODUCT-DIRECTORY-SPEC.md`
- `docs/ADDING-A-PRODUCT.md`
- `docs/CLOUDFLARE.md`
