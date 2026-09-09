# Adding a Product

Every product uses one stable slug and one canonical scaffold.

## 1. Create the scaffold

Do not create the directory tree manually. Run:

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

Example:

```bash
bash scripts/new-product.sh led-sensor-light "LED Sensor Light"
```

This creates:

```text
products/led-sensor-light/
├── product.md
├── manifest.yaml
├── docs/
│   └── .gitkeep
└── images/
    └── .gitkeep
```

The script fills the product slug and product name in the templates and refuses to overwrite an existing product.

## 2. Stage original source documents locally

Place manuals, datasheets, certification documents, installation guides, test reports, and similar evidence in:

```text
products/<slug>/docs/
```

These binary files are intentionally ignored by Git.

Do not rewrite an original source just to make it easier for AI to read. Preserve the original and summarize it separately in `product.md`.

## 3. Stage authoritative product images locally

Place real product source images in:

```text
products/<slug>/images/
```

Use semantic lowercase kebab-case filenames such as:

- `hero-01.jpg`
- `hero-02.jpg`
- `front-view.jpg`
- `rear-view.jpg`
- `side-profile.jpg`
- `connector-detail.jpg`
- `label-markings.jpg`

Do not name an image after an unverified feature. Do not put AI-generated marketing renders into the authoritative source set.

## 4. Upload binary assets to Cloudflare R2

Preview first if useful:

```bash
bash scripts/upload-product-assets.sh <product-slug> --dry-run
```

Then upload:

```bash
bash scripts/upload-product-assets.sh <product-slug>
```

Default target:

```text
R2 bucket: product-assets
Object keys:
products/<slug>/docs/<filename>
products/<slug>/images/<filename>
```

Public URLs follow:

```text
https://assets.licat.xyz/products/<slug>/docs/<filename>
https://assets.licat.xyz/products/<slug>/images/<filename>
```

The upload script uses an installed `wrangler` command when available, otherwise `npx wrangler`.

For an individual file larger than Wrangler's 315 MB object-upload limit, use rclone or another S3-compatible client instead.

## 5. Build `product.md`

Read the original source evidence, then create the LLM-friendly summary.

Keep these categories separate:

1. User-confirmed corrections or overrides.
2. Confirmed specifications from authoritative documents.
3. Directly observed facts from product images.
4. Reasonable creative inferences.
5. Unknown / do-not-claim information.

For exact specifications, record the source filename and page/section when practical.

## 6. Complete `manifest.yaml`

The scaffold intentionally starts with empty `documents` and `images` lists.

Add only objects that actually exist in R2.

For each document record:

- id
- type
- local staging path
- R2 object key
- URL
- authority
- notes

For each image record:

- id
- role
- local staging path
- R2 object key
- URL
- evidence notes

## 7. Commit metadata only

Before committing, check:

```bash
git status
```

Expected tracked product files are primarily:

```text
products/<slug>/product.md
products/<slug>/manifest.yaml
products/<slug>/docs/.gitkeep
products/<slug>/images/.gitkeep
```

The actual manuals, PDFs, JPGs, PNGs, and other binary files should not appear as tracked files.

Never use `git add -f` to force product binaries into Git.

Recommended commit style:

```text
product: add <product-slug> metadata
```

## 8. DetailFlow readiness

A product is ready when:

- `product.md` is populated.
- `manifest.yaml` matches the real R2 objects.
- relevant authoritative documents are retrievable from the manifest URLs.
- authoritative product images are retrievable from the manifest URLs.
- unknown claims are explicitly listed rather than guessed.
