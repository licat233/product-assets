# Cloudflare Storage and Delivery

## Purpose

Cloudflare R2 is the long-term binary asset store for product source documents and authoritative product images.

GitHub stores lightweight metadata and repository logic. R2 stores binary files so Git history does not grow indefinitely as the catalog expands.

## Target configuration

- Cloudflare account: Licat personal account
- Zone: `licat.xyz`
- R2 bucket: `product-assets`
- Custom domain: `assets.licat.xyz`
- GitHub repository: `licat233/product-assets`

## Object layout

R2 keys mirror the local product-relative paths:

```text
products/<product-slug>/docs/<filename>
products/<product-slug>/images/<filename>
```

Public URLs:

```text
https://assets.licat.xyz/products/<product-slug>/docs/<filename>
https://assets.licat.xyz/products/<product-slug>/images/<filename>
```

## Public access model

The current use case requires ChatGPT / DetailFlow to retrieve product manuals and product images directly from stable URLs. Therefore the R2 bucket is exposed through the custom domain `assets.licat.xyz`.

Do not enable the `r2.dev` development URL for production use when the custom domain is active.

Do not place secrets, credentials, internal-only contracts, private customer files, or other confidential material in this public bucket. If private evidence storage becomes necessary later, design a separate private-access path rather than weakening this boundary.

## Upload path

Local product binaries are staged in:

```text
products/<slug>/docs/
products/<slug>/images/
```

They are ignored by Git and uploaded with:

```bash
bash scripts/upload-product-assets.sh <slug>
```

The script uses Wrangler `r2 object put`, which uploads one object at a time. Cloudflare recommends rclone or another S3-compatible client for bulk or very large uploads; Wrangler currently has a 315 MB per-object upload limit.

## Migration from Cloudflare Pages

The repository was initially deployed as a Cloudflare Pages static asset origin at `assets.licat.xyz`.

R2 replaces Pages for long-term product binary delivery.

Cutover order:

1. Create the R2 bucket `product-assets` in the same Cloudflare account that owns `licat.xyz`.
2. Verify Wrangler access to that bucket.
3. Upload a temporary harmless test object to R2.
4. Confirm the test object is retrievable through an R2 development or direct verification path before changing the production hostname.
5. Remove `assets.licat.xyz` from the old Pages project only when R2 is ready for cutover.
6. Attach `assets.licat.xyz` to the R2 bucket as a custom domain.
7. Wait for custom-domain and SSL status to become Active.
8. Verify HTTP retrieval through `https://assets.licat.xyz/...`.
9. Disable the R2 development URL if it was temporarily enabled.
10. Keep or delete the old Pages project only after confirming it is no longer needed.

Do not overwrite unrelated DNS records or affect other `licat.xyz` services.

## CORS

If browser-based cross-origin access is required, configure an R2 CORS policy that permits read access from the intended origins. Do not grant browser write access merely for convenience.

For ChatGPT / DetailFlow retrieval, ordinary public HTTPS GET access through the custom domain is the primary requirement.

## Scope limits

R2 is intentionally approved because binary product assets should not live in normal Git history.

Do not add the following unless a real need is identified and explicitly approved:

- Cloudflare Images
- D1 / KV / Durable Objects
- Worker application logic
- CMS
- image transformation pipeline
- separate database

## Acceptance tests after R2 cutover

1. R2 bucket `product-assets` exists in the correct personal Cloudflare account.
2. `assets.licat.xyz` is attached to the R2 bucket and reports Active.
3. HTTPS/SSL is valid.
4. A test image object returns HTTP 200 with the correct content type.
5. A test PDF object returns HTTP 200 with `application/pdf`.
6. Bucket contents cannot be enumerated from the domain root.
7. Other `licat.xyz` services remain unchanged.
8. The old Pages custom-domain binding is no longer active.
9. The `r2.dev` production access path is disabled if it was used for setup.
