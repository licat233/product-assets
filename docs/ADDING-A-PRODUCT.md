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

Do not create the directory tree manually. Use the repository script:

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

It also fills the product slug and product name placeholders in `product.md` and `manifest.yaml`.

The script refuses to overwrite an existing product directory.

## 2. Add original source documents first

Place the available authoritative documents in `docs/`, for example:

- `user-manual.pdf`
- `datasheet.pdf`
- `installation-guide.pdf`
- `test-report.pdf`
- certification documents

Do not rewrite an original manual merely to make it easier for AI to read. Preserve the source document and summarize it separately in `product.md`.

## 3. Add authoritative real product images

Place source photos in `images/`.

Use semantic lowercase kebab-case filenames such as:

- `hero-01.jpg`
- `hero-02.jpg`
- `front-view.jpg`
- `rear-view.jpg`
- `side-profile.jpg`
- `usb-c-switch.jpg`
- `sensor-detail.jpg`
- `rear-markings-closeup.jpg`

Do not name an image after an unverified feature. For example, do not call an unknown circular component `pir-sensor.jpg` unless PIR is supported by evidence.

Do not place AI-generated marketing renders in the authoritative `images/` source set.

## 4. Build `product.md`

Read the manuals and datasheets, then create the LLM-friendly summary.

Keep these categories separate:

1. User-confirmed corrections or overrides.
2. Confirmed specifications from authoritative documents.
3. Directly observed facts from product images.
4. Reasonable creative inferences.
5. Unknown / do-not-claim information.

For exact specifications, record the source filename and page/section when practical.

## 5. Complete `manifest.yaml`

The newly created manifest intentionally starts with empty `documents` and `images` lists. Add only files that actually exist.

For each document record:

- id
- type
- path
- authority
- notes

For each image record:

- id
- role
- source path
- public Cloudflare URL
- concise notes describing what the image proves visually

## 6. Validate before use

A product is DetailFlow-ready when:

- `product.md` exists and is populated.
- `manifest.yaml` matches the actual files.
- at least one authoritative product document is present when technical specifications are required, or the absence is explicitly documented.
- authoritative product reference images are present.
- unknown claims are explicitly listed instead of guessed.

## 7. Commit

Recommended commit style:

```text
product: add <product-slug> source assets
```

Cloudflare publishing is handled from the source `images/` directories by `scripts/build-public.sh`; do not duplicate images into another committed public directory.
