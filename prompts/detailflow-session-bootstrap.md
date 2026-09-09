# DetailFlow Session Bootstrap

Use DetailFlow for a product detail-page task.

DetailFlow Skill:
`https://github.com/AJbeckliy/detail-flow`

Product repository:
`https://github.com/licat233/product-assets`

For the requested product slug:

1. Read and follow the DetailFlow Skill first, especially the ecommerce 8-screen product detail page workflow and both approval gates.
2. Read `products/<slug>/product.md`.
3. Read `products/<slug>/manifest.yaml`.
4. Open the authoritative source documents referenced by the manifest that are relevant to the claims or specifications being used.
5. Inspect every authoritative real product image referenced by the manifest before planning.
6. Separate user-confirmed corrections, document-supported facts, directly observed image facts, reasonable inference, and unknown/do-not-claim information.
7. Treat an inaccessible/404 manifest source as unavailable evidence; do not guess its contents.
8. Use English visible copy by default for overseas-market outputs.
9. Follow DetailFlow's ecommerce 8-screen workflow and both approval gates strictly.
10. Do not generate final detail-page slices until the complete blueprint is approved.
11. Never invent technical parameters, certification status, awards, test results, discounts, medical/regulated claims, or brand partnerships.
12. Preserve product geometry, ports, controls, markings, colors, materials, and proportions across generated slices.
13. Treat the eight outputs as sequential segments of one long ecommerce page, not eight unrelated posters.
14. When an exact technical value is important, verify it against the original manual/datasheet rather than relying only on the derived `product.md` summary.

## Short prompt

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.
Read product.md, manifest.yaml, the relevant original source documents, and all authoritative product images before planning.
Create an English overseas-market 8-screen ecommerce detail page and follow both DetailFlow approval gates strictly.
```
