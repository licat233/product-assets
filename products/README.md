# Products

Each direct child directory is one independent product source package.

Required structure:

```text
products/<product-slug>/
├── product.md
├── manifest.yaml
├── docs/
└── images/
```

Do not create this structure manually. From the repository root, run:

```bash
bash scripts/new-product.sh <product-slug> "<Product Name>"
```

Example:

```bash
bash scripts/new-product.sh led-sensor-light "LED Sensor Light"
```

Do not mix assets from different products in the same directory.

The product slug is the stable identifier used in prompts, manifests, GitHub paths, and Cloudflare image URLs.

See `../docs/PRODUCT-DIRECTORY-SPEC.md` before adding a product.
