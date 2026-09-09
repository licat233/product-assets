# DetailFlow Session Bootstrap

Use DetailFlow for a product detail-page task.

Product repository: `licat233/product-assets`

For the requested product slug:

1. Read `products/<slug>/product.md` from GitHub.
2. Read `products/<slug>/manifest.yaml` from GitHub.
3. Open the authoritative source documents using the Cloudflare R2 URLs listed in the manifest that are relevant to the claims or specifications being used.
4. Inspect every authoritative product image using the R2 URLs listed in the manifest before planning.
5. Separate user-confirmed corrections, document-supported facts, directly observed image facts, reasonable inference, and unknown/do-not-claim information.
6. Treat an inaccessible/404 manifest asset as unavailable evidence; do not guess its contents.
7. Use English visible copy by default for overseas-market outputs.
8. Follow DetailFlow's ecommerce 8-screen workflow and both approval gates strictly.
9. Do not generate final detail-page slices until the complete blueprint is approved.
10. Never invent technical parameters, certification status, awards, test results, discounts, medical/regulated claims, or brand partnerships.
11. Preserve product geometry, ports, controls, markings, colors, materials, and proportions across generated slices.
12. Treat the eight outputs as sequential segments of one long ecommerce page, not eight unrelated posters.
13. When an exact technical value is important, verify it against the original manual/datasheet URL rather than relying only on the derived `product.md` summary.
