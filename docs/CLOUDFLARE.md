# Cloudflare Deployment

## Initial architecture

Use **Cloudflare Pages** as a static asset origin. Keep the first stage deliberately simple: no R2, Cloudflare Images, database, Worker application, or image-processing pipeline.

GitHub remains the source of truth; Cloudflare publishes only the `public/` directory and provides stable image URLs for ChatGPT / DetailFlow.

## Target

- Repository: `licat233/product-assets`
- Cloudflare account: Licat personal account
- Pages project: `product-assets`
- Production branch: `main`
- Framework preset: None
- Build command: none
- Output directory: `public`
- Custom domain: `assets.licat.xyz`

## Expected URL

`https://assets.licat.xyz/products/rechargeable-led-sensor-light/hero-01.jpg`

## Public/private boundary

Only `public/` should be served by the Pages deployment. Product metadata under `products/`, prompts, docs, and repository rules are repository content and must not accidentally become paths on `assets.licat.xyz`.

The repository's GitHub visibility is managed separately from the Cloudflare deployment and is not changed by this setup.

## Headers

`public/_headers` configures permissive CORS for product images and asks search engines not to index the asset origin.

## Acceptance tests

1. `https://assets.licat.xyz/` returns the asset-origin landing page.
2. A JPG URL returns HTTP 200 with an image content type.
3. A PNG/JPG detail-reference URL returns HTTP 200 with an image content type.
4. `Access-Control-Allow-Origin: *` is present for `/products/*`.
5. `https://assets.licat.xyz/products/rechargeable-led-sensor-light/product.md` does not expose repository metadata.
6. `robots.txt` is reachable and disallows crawling.
7. Existing services under `licat.xyz` remain unchanged.
