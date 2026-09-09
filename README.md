# Product Assets

Structured source-of-truth repository for product documentation, product facts, authoritative reference images, and DetailFlow inputs.

The repository is designed so ChatGPT, Codex, and other approved tools can understand a product without requiring the user to re-upload the same manual, specifications, and reference images in every new session.

## Core rule

**One product = one self-contained directory.**

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
    ├── rear-view.jpg
    └── ...
```

`docs/` is the original evidence layer. Manuals, datasheets, certification documents, test reports, and other authoritative product documents belong here.

`product.md` is the LLM-friendly product summary and evidence index. It does not replace the original source documents.

`manifest.yaml` is the machine-readable inventory of the product's documents, images, publishing URLs, and DetailFlow defaults.

`images/` contains authoritative real product reference images. AI-generated marketing outputs do not belong in this source directory.

## Evidence priority

When sources disagree, use this order:

1. Explicit user-confirmed correction recorded with provenance.
2. Authoritative product documents in `docs/` such as manuals and datasheets.
3. Facts directly observable in authoritative product images.
4. Derived summaries in `product.md`.
5. Reasonable creative inference.
6. Unknown information must remain unknown and must not be invented.

## Cloudflare asset publishing

GitHub is the source of truth. Cloudflare Pages is only a public image origin.

A small build script copies only product `images/` directories into the generated `dist/` output. Product manuals, metadata, prompts, and repository documentation are not included in the asset deployment.

Target asset pattern:

```text
https://assets.licat.xyz/products/<product-slug>/images/<filename>
```

No framework, database, R2 bucket, Cloudflare Images service, or application server is required.

## Repository map

```text
products/                      # one self-contained directory per product
templates/                     # product.md and manifest.yaml templates
docs/                          # repository operating rules
prompts/                       # reusable ChatGPT / DetailFlow bootstrap prompt
scripts/build-public.sh        # creates Cloudflare Pages output
static/                        # root files copied to the generated asset site
```

Start with `docs/PRODUCT-DIRECTORY-SPEC.md`, then use `docs/ADDING-A-PRODUCT.md` when onboarding a new product.
