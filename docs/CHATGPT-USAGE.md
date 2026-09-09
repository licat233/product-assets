# ChatGPT + DetailFlow Usage

[中文](./CHATGPT-USAGE.zh-CN.md)

This document explains how a new ChatGPT session should read a product from `licat233/product-assets` and verify that it can actually complete DetailFlow before reaching Approval Gate 1.

## 1. Use two retrieval paths

```text
GitHub
→ product.md
→ manifest.yaml
→ text metadata

assets.licat.xyz
→ PDF / datasheet / drawing
→ JPG / PNG / WebP
→ reference video
→ other binary evidence
```

The GitHub connector may discover binary files but, in some sessions, return them as base64 or otherwise fail to place them into the document/image inspection path. Therefore binary evidence should use the manifest `public_url` values under `assets.licat.xyz` whenever available.

## 2. Mandatory capability preflight before Gate 1

Before producing the 8-screen blueprint, verify that the current session can:

1. generate images;
2. read `product.md` from GitHub;
3. read `manifest.yaml` from GitHub;
4. inspect at least one original source document through an `assets.licat.xyz` `public_url`;
5. visually inspect at least one authoritative product image through an `assets.licat.xyz` `public_url`.

If any capability is unavailable, stop before the blueprint and report the missing capability immediately.

Do not complete Gate 1 and only then discover that Visual Master or final image generation cannot continue.

## 3. Recommended DetailFlow bootstrap prompt

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.

Before Approval Gate 1, run a capability preflight:
- confirm this session can generate images;
- read product.md and manifest.yaml from GitHub;
- use manifest public_url links on assets.licat.xyz for binary documents and visual references;
- verify that at least one original document can be inspected;
- visually inspect at least one authoritative product image.

If any of those capabilities are unavailable, stop before the blueprint and tell me immediately.

If the preflight passes:
1. read and follow the DetailFlow Skill;
2. inspect the original documents relevant to exact claims;
3. inspect all authoritative real product images;
4. separate user-confirmed facts, authoritative-document facts, directly observed image facts, reasonable inference, and unknown/do-not-claim information;
5. do not invent unsupported technical or commercial claims;
6. create the English overseas-market 8-screen blueprint;
7. follow both DetailFlow approval gates strictly.
```

DetailFlow Skill:

`https://github.com/AJbeckliy/detail-flow`

Product repository:

`https://github.com/licat233/product-assets`

## 4. Short form

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.
Run the capability preflight before Gate 1. Use GitHub for product.md/manifest and assets.licat.xyz public_url links for binary evidence. If document/image inspection or image generation is unavailable, stop before the blueprint. Otherwise follow both DetailFlow approval gates strictly.
```

## 5. Correct reading order

```text
GitHub product directory
    ↓
product.md
    ↓
manifest.yaml
    ↓
manifest public_url
    ↓
assets.licat.xyz original binary evidence
    ↓
evidence classification
    ↓
DetailFlow Blueprint
```

`product.md` is a useful structured summary, but it is not a substitute for the original source document when an exact technical value matters.

## 6. Evidence classes

Every product claim should belong to one of these groups:

1. **User-confirmed correction or override** — highest priority when explicitly recorded.
2. **Authoritative-document fact** — supported by a manual, datasheet, drawing, test report, certification document, or other approved source.
3. **Directly observed image fact** — visible in an authoritative product image without inferring hidden technology.
4. **Reasonable creative inference** — may guide scene design or non-technical marketing language, but is not a verified specification.
5. **Unknown / do not claim** — missing evidence must remain missing.

## 7. DetailFlow workflow expectation

```text
Capability Preflight
    ↓
Source review
    ↓
Evidence classification
    ↓
Complete 8-screen Blueprint
    ↓
Approval Gate 1
    ↓
Text Master / Visual Master
    ↓
Generate Screen 01–02
    ↓
Continuity + product + copy audit
    ↓
Approval Gate 2
    ↓
Generate Screen 03–08
    ↓
Full concatenation + final audit
```

The eight screens should behave as sequential slices of one continuous ecommerce detail page, not eight unrelated posters.

## 8. Missing or inaccessible sources

If a manifest `public_url` returns 404, is inaccessible, or does not match the manifest entry, treat that evidence as unavailable.

A filename or manifest entry alone is not proof of a product claim.

If GitHub binary retrieval only returns base64 but the `assets.licat.xyz` `public_url` works, use the public URL instead of asking the user to re-upload the same source.

## 9. Sessions without image-generation capability

The repository cannot add image-generation capability to a ChatGPT session that does not have it.

Correct behavior is:

```text
preflight detects no image generation
→ stop immediately
→ do not build the blueprint
→ do not enter Gate 1
→ restart in a ChatGPT session with image generation available
```

Do not use text, placeholders, or scripts to pretend the DetailFlow image stages were completed.
