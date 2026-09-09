# DetailFlow Session Bootstrap

Use DetailFlow for a product detail-page task.

DetailFlow Skill:
`https://github.com/AJbeckliy/detail-flow`

Product repository:
`https://github.com/licat233/product-assets`

## Mandatory capability preflight — run BEFORE Approval Gate 1

Before doing the blueprint, first verify that this ChatGPT session can actually complete the full workflow.

1. Confirm that the current session has image-generation capability.
2. Read `products/<slug>/product.md` and `products/<slug>/manifest.yaml` from GitHub.
3. For binary evidence, do **not** rely on GitHub connector/base64 output when a manifest `public_url` is available.
4. Open at least one authoritative document through its `https://assets.licat.xyz/.../docs/...` `public_url` and confirm the original document can be inspected.
5. Open and visually inspect at least one authoritative product image through its `https://assets.licat.xyz/.../images/...` `public_url`.
6. If image generation, original-document inspection, or visual image inspection is unavailable in the current session, STOP before producing the 8-screen blueprint. Report the missing capability immediately instead of reaching Gate 1 and failing later.

The purpose of this preflight is to avoid wasting the user's time on a blueprint in a session that cannot continue to Visual Master and final image generation.

## DetailFlow workflow

After the preflight passes, for the requested product slug:

1. Read and follow the DetailFlow Skill first, especially the ecommerce 8-screen product detail page workflow and both approval gates.
2. Read `products/<slug>/product.md`.
3. Read `products/<slug>/manifest.yaml`.
4. Use GitHub primarily for text metadata (`product.md`, `manifest.yaml`).
5. Use the manifest `public_url` values under `assets.licat.xyz` for binary source documents, product images, and reference videos whenever available.
6. Open the authoritative source documents relevant to the claims or specifications being used and verify exact technical values against the originals.
7. Inspect every authoritative real product image before planning the Visual Master.
8. Separate user-confirmed corrections, document-supported facts, directly observed image facts, reasonable inference, and unknown/do-not-claim information.
9. Treat an inaccessible/404 manifest source as unavailable evidence; do not guess its contents.
10. Use English visible copy by default for overseas-market outputs.
11. Follow DetailFlow's ecommerce 8-screen workflow and both approval gates strictly.
12. Do not generate final detail-page slices until the complete blueprint is approved.
13. Never invent technical parameters, certification status, awards, test results, discounts, medical/regulated claims, or brand partnerships.
14. Preserve product geometry, ports, controls, markings, colors, materials, and proportions across generated slices.
15. Treat the eight outputs as sequential segments of one long ecommerce page, not eight unrelated posters.
16. When an exact technical value is important, verify it against the original manual/datasheet rather than relying only on the derived `product.md` summary.

## Recommended prompt

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.

Before Approval Gate 1, run a capability preflight:
- confirm this session can generate images;
- read product.md and manifest.yaml;
- use manifest public_url links on assets.licat.xyz for binary documents and visual references;
- verify that at least one original document can be inspected;
- visually inspect at least one authoritative product image.

If any of those capabilities are unavailable, stop before the blueprint and tell me immediately.

If the preflight passes, read all relevant original source documents and authoritative product images, then create an English overseas-market 8-screen ecommerce detail page and follow both DetailFlow approval gates strictly.
```

## Short prompt

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.
Run the capability preflight before Gate 1. Use GitHub for product.md/manifest and assets.licat.xyz public_url links for binary evidence. If document/image inspection or image generation is unavailable, stop before the blueprint. Otherwise follow both DetailFlow approval gates strictly.
```
