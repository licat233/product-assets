# Adding a Product

Use one product slug everywhere. Prefer the canonical website slug when practical.

## 1. Create metadata

Copy:

- `templates/product.md` -> `products/<product-slug>/product.md`
- `templates/manifest.yaml` -> `products/<product-slug>/manifest.yaml`

Fill `product.md` first. Treat it as the factual source of truth.

## 2. Add product photos

Place images in:

`public/products/<product-slug>/`

Use semantic lowercase kebab-case filenames such as:

- `hero-01.jpg`
- `hero-02.jpg`
- `front-view.jpg`
- `rear-view.jpg`
- `side-profile.jpg`
- `usb-c-switch.jpg`
- `sensor-detail.jpg`
- `rear-markings-closeup.jpg`

Do not rename a file based on an unverified feature. For example, do not call an unknown circular area `pir-sensor.jpg` unless PIR is confirmed.

## 3. Update the manifest

For every image, record:

- stable id
- role
- repository path
- public Cloudflare URL
- concise notes about what the image proves visually

## 4. Fact classification

Every statement should fit one of these groups:

1. Confirmed fact — explicitly supported by authoritative product data.
2. Directly observed — visible in a supplied product image.
3. Reasonable inference — usable for creative planning but not a technical claim.
4. Unknown / do not claim — requires evidence before publication.

## 5. Commit

Recommended commit style:

`product: add <product-slug> source assets`
