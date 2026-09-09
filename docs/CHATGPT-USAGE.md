# ChatGPT + DetailFlow Usage

[中文](./CHATGPT-USAGE.zh-CN.md)

This document answers the most common question for a new conversation:

> What should I send to ChatGPT so it correctly reads a product from `licat233/product-assets` before using DetailFlow?

## Recommended DetailFlow bootstrap prompt

Replace `<product-slug>` and send this in a new ChatGPT conversation:

```text
Use DetailFlow to create an 8-screen English ecommerce detail page for product:
<product-slug>

DetailFlow Skill:
https://github.com/AJbeckliy/detail-flow

Product repository:
https://github.com/licat233/product-assets

Before planning:
1. Read and follow the DetailFlow Skill, especially the ecommerce 8-screen product detail page workflow and both approval gates.
2. Read products/<product-slug>/product.md.
3. Read products/<product-slug>/manifest.yaml.
4. Open the relevant original manuals, datasheets, and other authoritative sources referenced by the manifest.
5. Inspect all authoritative real product images referenced by the manifest.
6. Separate user-confirmed facts, authoritative-document facts, directly observed image facts, reasonable inference, and unknown/do-not-claim information.
7. Verify exact specifications against the original manual/datasheet rather than relying only on product.md.
8. Do not invent specifications, certification status, test results, awards, discounts, partnerships, or unsupported commercial claims.
9. Use English visible commercial copy by default for the overseas market.
10. Do not generate final detail-page images immediately.
11. First produce the complete 8-screen Detail Page Blueprint and wait for my approval.
12. Follow both DetailFlow approval gates strictly.
```

## Short form

Once ChatGPT is already familiar with DetailFlow and this repository:

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.
Read product.md, manifest.yaml, the relevant original source documents, and all authoritative product images before planning.
Create an English overseas-market 8-screen ecommerce detail page and follow both DetailFlow approval gates strictly.
```

## Product-analysis-only prompt

If you only want ChatGPT to understand and audit the product first:

```text
Analyze product `<product-slug>` from `licat233/product-assets`.

Read product.md and manifest.yaml first, then open the relevant original manuals/datasheets referenced by the manifest and inspect all authoritative real product images.

Return separate sections for:
1. user-confirmed information
2. authoritative-document specifications and functions
3. directly observed image facts
4. reasonable but unconfirmed inference
5. unknown / do-not-claim information

Cite the source for exact technical specifications and do not invent missing information.
```

## Correct reading order

For product `<product-slug>`:

```text
product.md
    ↓
manifest.yaml
    ↓
original manuals / datasheets / authoritative documents
    ↓
authoritative product images
    ↓
evidence classification
    ↓
DetailFlow Blueprint
```

`product.md` is a useful structured summary, but it is not a substitute for the original source document when an exact technical value matters.

## Evidence classes

Every product claim should belong to one of these groups:

1. **User-confirmed correction or override** — highest priority when explicitly recorded.
2. **Authoritative-document fact** — supported by a manual, datasheet, test report, certification document, or other approved source.
3. **Directly observed image fact** — visible in an authoritative product image without inferring hidden technology.
4. **Reasonable creative inference** — may guide scene design or non-technical marketing language, but is not a verified specification.
5. **Unknown / do not claim** — missing evidence must remain missing.

## DetailFlow workflow expectation

The normal DetailFlow sequence is:

```text
Source review
    ↓
Evidence classification
    ↓
Complete 8-screen Blueprint
    ↓
Approval Gate 1
    ↓
Text Master / Visual Master
    ↓
Generate Screen 01–02
    ↓
Continuity + product + copy audit
    ↓
Approval Gate 2
    ↓
Generate Screen 03–08
    ↓
Full concatenation + final audit
```

The eight screens should behave as sequential slices of one continuous ecommerce detail page, not eight unrelated posters.

## DetailFlow readiness audit

For a newly ingested product, a useful first request is:

```text
Run a DetailFlow readiness audit for `<product-slug>` in `licat233/product-assets`.

Read product.md, manifest.yaml, the relevant original source documents, and all authoritative real product images.

Check:
- whether the manifest matches the actual sources
- whether product.md contains exact values without evidence
- whether any specifications conflict
- whether certification/function claims are adequately supported
- whether there are enough useful images for an 8-screen DetailFlow page
- which 2–4 claim seeds are the strongest

Do not generate final detail-page images yet.
```

## Missing or inaccessible sources

If a source referenced by the manifest returns 404, is inaccessible, or does not match the manifest entry, treat that evidence as unavailable.

A filename or manifest entry alone is not proof of a product claim.

