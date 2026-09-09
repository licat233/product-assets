# Codex Task — Migrate Product Binary Storage from Cloudflare Pages to R2

## Goal

Migrate the product-assets binary delivery architecture to Cloudflare R2 so GitHub remains lightweight as the product catalog grows.

Repository:

`https://github.com/licat233/product-assets`

Cloudflare:

- Personal account that owns `licat.xyz`
- Existing Pages project: `product-assets`
- Existing custom domain: `assets.licat.xyz`
- Target R2 bucket: `product-assets`
- Target R2 custom domain: `assets.licat.xyz`

There are currently no real product binaries that need migration. Do not add the previously discussed LED Sensor Light or any test product to Git.

## 1. Read repository rules first

Before changing anything, read:

- `AGENTS.md`
- `README.md`
- `docs/PRODUCT-DIRECTORY-SPEC.md`
- `docs/CLOUDFLARE.md`
- `docs/ADDING-A-PRODUCT.md`
- `scripts/new-product.sh`
- `scripts/upload-product-assets.sh`
- `scripts/check-storage-boundary.sh`

Check:

- current branch
- `git status`
- current `main` HEAD
- whether any user work is uncommitted

Do not overwrite unrelated work.

## 2. Validate repository-side scripts

Run at minimum:

```bash
sh -n scripts/new-product.sh
sh -n scripts/upload-product-assets.sh
sh -n scripts/check-storage-boundary.sh
bash scripts/check-storage-boundary.sh
```

Use a temporary local product scaffold if needed to test `--dry-run`, but remove it afterward and do not commit a fake product.

Confirm `.gitignore` prevents ordinary Git staging of binary files inside:

```text
products/*/docs/
products/*/images/
```

while allowing `.gitkeep` placeholders and metadata files.

If a clear bug exists, make only the smallest necessary fix and validate it before commit.

## 3. Verify Cloudflare account

Use the current machine's authorized Cloudflare environment.

Confirm the selected account actually owns the `licat.xyz` zone.

Do not operate another Cloudflare account or another zone.

## 4. Create the R2 bucket

Create or reuse exactly:

```text
product-assets
```

in the same Cloudflare account that owns `licat.xyz`.

Use Standard storage unless there is a concrete reason not to.

Do not add Cloudflare Images, D1, KV, Durable Objects, a Worker application, or a database.

## 5. Verify Wrangler access

Confirm the local environment can access the remote bucket with Wrangler.

If authentication is missing, use the normal Cloudflare Wrangler login flow for the user's personal account.

Do not write secrets into the Git repository.

## 6. Create temporary R2 acceptance objects

Create temporary local files outside Git-tracked product directories, for example:

- a tiny PNG or JPG
- a tiny PDF

Upload them to temporary R2 keys such as:

```text
_system/acceptance/test-image.png
_system/acceptance/test-document.pdf
```

Use remote R2, not Wrangler local emulation.

Verify the objects exist before changing the production custom domain.

## 7. Cut over `assets.licat.xyz` safely

The hostname is currently attached to the Cloudflare Pages project `product-assets`.

Perform the cutover in this order:

1. Confirm the R2 bucket is ready.
2. Confirm the temporary acceptance objects are uploaded.
3. Inspect the existing `assets.licat.xyz` Pages binding and DNS state.
4. Detach `assets.licat.xyz` from the old Pages project only when ready to attach it to R2 immediately.
5. Attach `assets.licat.xyz` as the R2 bucket's Custom Domain.
6. Allow Cloudflare to create/manage the required DNS binding.
7. Wait until custom-domain ownership and SSL status are Active.
8. Do not leave a conflicting Pages/DNS binding behind.
9. Do not touch other `licat.xyz` hostnames.

Do not use the `r2.dev` hostname as the production URL. If it is temporarily enabled for setup verification, disable it after the custom domain is active.

## 8. Public-access behavior

The intended public URL pattern is:

```text
https://assets.licat.xyz/products/<slug>/docs/<filename>
https://assets.licat.xyz/products/<slug>/images/<filename>
```

The bucket is intentionally public through this custom domain because ChatGPT / DetailFlow needs stable direct URLs to source manuals and product images.

Do not upload secrets, private customer data, credentials, or confidential internal documents to this bucket.

Do not enable public bucket listing. R2 custom-domain access should retrieve known object URLs but not provide a browsable directory index.

## 9. CORS

Configure only the minimum CORS needed for read access if browser cross-origin retrieval requires it.

Do not grant unauthenticated PUT/POST/DELETE access from browsers.

Public GET/HEAD retrieval is sufficient for product evidence consumption.

## 10. HTTP acceptance tests

After the custom domain is Active, verify:

```text
https://assets.licat.xyz/_system/acceptance/test-image.png
https://assets.licat.xyz/_system/acceptance/test-document.pdf
```

Requirements:

- image returns HTTP 200 and correct image content type
- PDF returns HTTP 200 and `application/pdf`
- HTTPS certificate is valid
- root bucket URL does not expose a browsable listing

Then remove the temporary acceptance objects from R2 and verify they return 404 afterward.

## 11. Retire the legacy Pages publishing path

Only after R2 cutover is fully verified:

- remove the obsolete Pages-only repository files if they are no longer used:
  - `scripts/build-public.sh`
  - `static/`
- remove obsolete Pages references from repository docs
- keep the old Cloudflare Pages project only if there is a clear reason; otherwise it may be deleted after confirming no custom domains or required services depend on it

Do not delete the Pages project before the R2 custom domain is proven healthy.

## 12. Final repository verification

Run:

```bash
git status
git diff --check
sh -n scripts/new-product.sh
sh -n scripts/upload-product-assets.sh
sh -n scripts/check-storage-boundary.sh
bash scripts/check-storage-boundary.sh
```

If repository cleanup was required, commit and push it to `main`.

Do not commit any product JPG/PNG/PDF binaries.

## 13. Final report

Return a concise report containing:

1. Cloudflare account and zone used
2. R2 bucket name
3. storage class
4. R2 custom domain and status
5. SSL status
6. whether `r2.dev` is disabled
7. image acceptance result
8. PDF acceptance result
9. bucket-listing behavior
10. Pages custom-domain status after cutover
11. whether the old Pages project remains or was deleted
12. repository changes and final commit SHA, if any
13. confirmation that no product binaries were committed to Git
14. unresolved issues, if any

Continue until acceptance is complete. Stop only if Cloudflare requires an unavoidable user-only authorization step or if `assets.licat.xyz` cannot be safely moved without risking another service.
