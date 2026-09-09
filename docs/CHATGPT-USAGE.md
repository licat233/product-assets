# ChatGPT + DetailFlow Usage

This repository is designed so a new ChatGPT session can retrieve a product's source material without asking the user to re-upload the same manuals, specifications, and reference images.

## Storage model

GitHub stores:

- `product.md`
- `manifest.yaml`
- repository rules and scripts

Cloudflare R2 stores the binary evidence referenced by the manifest:

- manuals / datasheets / certification files
- authoritative product photos

The stable public origin is:

```text
https://assets.licat.xyz/products/<product-slug>/...
```

## Standard workflow

For product `<product-slug>`, ChatGPT should inspect sources in this order:

1. `products/<product-slug>/product.md` from GitHub.
2. `products/<product-slug>/manifest.yaml` from GitHub.
3. Relevant authoritative source documents using the R2 URLs listed under `documents`.
4. Every authoritative product image using the R2 URLs listed under `images`.

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
1. Read products/<product-slug>/product.md from GitHub.
2. Read products/<product-slug>/manifest.yaml from GitHub.
3. Open the relevant authoritative documents using the URLs listed in the manifest.
4. Inspect all authoritative product images using the URLs listed in the manifest.
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
Read its GitHub metadata and all R2 source URLs in the manifest first. English overseas-market page. Follow both approval gates.
```

## Important limitation

A concise `product.md` is useful, but it is not a substitute for opening the relevant manual or datasheet when exact parameters matter. The original source document referenced by the manifest should be checked before a technical value is used in commercial copy.

## Missing or inaccessible assets

If a manifest URL returns 404 or cannot be retrieved, treat the corresponding evidence as unavailable. Do not infer the missing technical fact merely because a filename or manifest entry suggests it exists.
