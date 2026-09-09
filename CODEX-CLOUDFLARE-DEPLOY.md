# Codex Task — Finish Product Assets Publishing

## Context

The GitHub source repository already exists and is being prepared directly by ChatGPT:

- Repository: `https://github.com/licat233/product-assets`
- Owner: personal GitHub account `licat233`
- Domain owner: Licat personal Cloudflare account
- Zone: `licat.xyz`

Do not create or use `ARMOR-Lighting/product-assets`. Do not touch `ARMOR-Lighting/armorltgcom`.

## Goal

1. Ensure the authoritative product image files from the supplied local scaffold are present in the existing repository under:
   `public/products/rechargeable-led-sensor-light/`
2. Deploy only `public/` through Cloudflare Pages.
3. Bind the custom domain `assets.licat.xyz`.
4. Validate public image retrieval for ChatGPT / DetailFlow.

## Repository image files

The following exact filenames are required:

- `hero-01.jpg`
- `hero-02.jpg`
- `front-view.jpg`
- `rear-view.jpg`
- `side-profile.jpg`
- `thickness-profile.jpg`
- `usb-c-switch.png`
- `sensor-control.jpg`
- `rear-markings-closeup.jpg`
- `frameless-detail.jpg`

Use the real product photos from the bootstrap/scaffold supplied by the user. Do not replace them with AI-generated outputs. Do not invent missing product facts.

## Cloudflare Pages configuration

- Account: user's personal Cloudflare account
- Zone: `licat.xyz`
- Project name: `product-assets`
- Git repository: `licat233/product-assets`
- Production branch: `main`
- Framework preset: None
- Build command: none
- Output directory: `public`
- Custom domain: `assets.licat.xyz`

Prefer native Cloudflare Pages Git integration. Do not add R2, Cloudflare Images, Workers application code, databases, or secrets to the repository.

Before changing DNS, verify `assets.licat.xyz` is not already used by another service. If it is occupied, stop and report the conflict instead of overwriting it.

## Acceptance tests

The task is complete only when:

1. All 10 required images exist on `main`.
2. `https://assets.licat.xyz/` returns HTTP 200.
3. `https://assets.licat.xyz/products/rechargeable-led-sensor-light/hero-01.jpg` returns HTTP 200 with an image content type.
4. `https://assets.licat.xyz/products/rechargeable-led-sensor-light/usb-c-switch.png` returns HTTP 200 with an image content type.
5. `/products/rechargeable-led-sensor-light/product.md` is not publicly exposed by the asset origin.
6. `/robots.txt` is reachable and disallows crawling.
7. `git status` is clean and all repository changes are pushed.

## Final report

Return:

- repository commit SHA
- Cloudflare Pages project name
- custom domain
- tested image URLs + HTTP status/content type
- whether native Git auto-deploy is active
- any unavoidable manual step
