# ChatGPT + DetailFlow Usage

This repository is designed so a new ChatGPT session can retrieve a product's source material without asking the user to re-upload the same files.

## Standard workflow

For product `<product-slug>`, ChatGPT should inspect the product directory in this order:

1. `products/<product-slug>/product.md`
2. `products/<product-slug>/manifest.yaml`
3. relevant authoritative source documents listed under `documents`
4. every authoritative product image listed under `images`

Then classify what it learned as:

- user-confirmed correction
- authoritative-document fact
- directly observed image fact
- reasonable creative inference
- unknown / do not claim

Only after this evidence pass should DetailFlow produce the 8-screen blueprint.

## Recommended prompt

```text
Use DetailFlow to create an 8-screen English ecommerce detail page for product:
<product-slug>

Product repository:
licat233/product-assets

Before planning:
1. Read products/<product-slug>/product.md.
2. Read products/<product-slug>/manifest.yaml.
3. Read the relevant authoritative documents listed in the manifest.
4. Inspect all authoritative product images listed in the manifest.
5. Separate user-confirmed facts, document-supported facts, directly observed image facts, reasonable inference, and unknown/do-not-claim information.

Do not invent technical specifications or certification status.
Follow DetailFlow's standard two approval gates strictly.
Do not generate final detail-page slices before I approve the complete blueprint.
Use English visible commercial copy unless I say otherwise.
```

## Short form

Once the repository structure is familiar, this is normally sufficient:

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.
Read its product summary, manifest, authoritative source documents, and reference images first. English overseas-market page. Follow both approval gates.
```

## Image retrieval

The GitHub product directory remains the source of truth.

When the Cloudflare asset origin is live, image URLs follow:

```text
https://assets.licat.xyz/products/<product-slug>/images/<filename>
```

ChatGPT should use those public image URLs when that is the most reliable way to inspect or pass source images to image-generation workflows.

## Important limitation

A concise `product.md` is useful, but it is not a substitute for reading the relevant manual or datasheet when exact parameters matter. The original source document should be checked before a technical value is used in commercial copy.
