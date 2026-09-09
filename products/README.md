# Products

Each direct child directory is one independent product metadata package with matching local staging directories and matching Cloudflare R2 object paths.

Required local structure:

```text
products/<product-slug>/
├── product.md
├── manifest.yaml
├── docs/
└── images/
```

Create it with:

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

Example:

```bash
bash scripts/new-product.sh led-sensor-light "LED Sensor Light"
```

Important:

- `product.md` and `manifest.yaml` are committed to Git.
- Real binary contents in `docs/` and `images/` are local staging files and are ignored by Git.
- Upload staged binaries to Cloudflare R2 with `scripts/upload-product-assets.sh`.
- R2 mirrors the same product-relative paths under `products/<slug>/...`.
- Never use `git add -f` to force product binaries into the repository.

Do not mix assets from different products in the same directory.

The product slug is the stable identifier used in prompts, manifests, GitHub paths, R2 object keys, and `assets.licat.xyz` URLs.

See `../docs/PRODUCT-DIRECTORY-SPEC.md` before adding a product.
