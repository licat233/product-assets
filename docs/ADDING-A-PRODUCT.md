# Adding a Product

Every product must be self-contained under one canonical slug.

```text
products/<product-slug>/
├── product.md
├── manifest.yaml
├── docs/
└── images/
```

Prefer the canonical website slug when practical.

## 1. Create the product scaffold

Do not create the directory tree manually. Use:

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

Example:

```bash
bash scripts/new-product.sh led-sensor-light "LED Sensor Light"
```

The script creates:

```text
products/led-sensor-light/
├── product.md
├── manifest.yaml
├── docs/
│   └── .gitkeep
└── images/
    └── .gitkeep
```

It also fills the product identity and generates the initial manifest automatically.

The script refuses to overwrite an existing product directory.

## 2. Add original source documents

Place authoritative source files in `docs/`, for example:

- user manual
- datasheet
- installation guide
- dimension drawing
- test report
- certification document
- manufacturer brochure

Preserve original source files. Do not rewrite an original manual merely to make it easier for AI to read.

## 3. Add authoritative real product media

Place real product photos and reference videos in `images/`.

Prefer semantic filenames when practical, for example:

- `hero-01.jpg`
- `front-view.jpg`
- `rear-view.jpg`
- `side-profile.jpg`
- `connector-detail.jpg`
- `product-demo.mp4`

Do not name an image after an unverified feature. Do not place AI-generated marketing renders in the authoritative source set.

## 4. Build `product.md`

Read the source documents and inspect the product media, then maintain the LLM-friendly product summary.

Keep these categories separate:

1. User-confirmed corrections or overrides.
2. Confirmed specifications from authoritative documents.
3. Directly observed facts from product images.
4. Reasonable creative inferences.
5. Unknown / do-not-claim information.

For exact specifications, record the source filename and page/section when practical.

## 5. Sync `manifest.yaml` automatically

**Do not edit `manifest.yaml` manually.**

After adding, deleting, or renaming files in `docs/` or `images/`, or after changing product identity fields in `product.md`, run:

```bash
bash scripts/sync-manifest.sh <product-slug>
```

To sync every product:

```bash
bash scripts/sync-manifest.sh
```

The script scans the actual product directory and generates:

- document inventory
- image/video inventory
- media/file types
- GitHub source URLs
- stable `assets.licat.xyz` `public_url` values for source documents and visual references
- product identity copied from `product.md`
- DetailFlow defaults and claims policy

Generated manifests begin with:

```yaml
# AUTO-GENERATED FILE — DO NOT EDIT MANUALLY.
```

If Codex or another Agent is onboarding the product, `AGENTS.md` requires the Agent to run this command before commit. The user should not be asked to maintain YAML file lists.

## 6. Validate before use

A product is source-ready when:

- `product.md` exists and reflects the available evidence.
- `manifest.yaml` has been regenerated after the latest file changes.
- source documents required for exact technical claims are present, or their absence is explicitly documented.
- authoritative product reference media are present.
- unknown claims are listed instead of guessed.

A ChatGPT session is DetailFlow-ready only after a capability preflight confirms that the session can:

- read `product.md` and `manifest.yaml`;
- inspect an original source document through an `assets.licat.xyz` `public_url`;
- visually inspect an authoritative product image through an `assets.licat.xyz` `public_url`;
- generate images in the current session.

If the session fails this preflight, stop before Approval Gate 1.

## 7. Commit

Recommended commit style:

```text
product: add <product-slug> source assets
```

Commit the generated `manifest.yaml` together with the source files and `product.md`.

Cloudflare publishing is generated from the source `docs/` and `images/` directories by the repository build scripts. Do not duplicate binaries into another committed public directory.
