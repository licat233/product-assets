# ChatGPT + DetailFlow Usage

[中文](./CHATGPT-USAGE.zh-CN.md)

This document explains how a new ChatGPT session should verify that it can actually complete DetailFlow before reaching Approval Gate 1.

## 1. DetailFlow is an external Skill

Do not assume a new ChatGPT session already knows what "DetailFlow" means.

DetailFlow lives at:

`https://github.com/AJbeckliy/detail-flow`

The session must read the current `SKILL.md` and any referenced files required for the ecommerce 8-screen workflow. The current repository contract takes precedence over prior memory, a generic ecommerce workflow, or an invented interpretation of DetailFlow.

## 2. Stage 0 — image generation first

Before reading product evidence, verify that the current session has an actually invokable image-generation/editing capability for:

- Visual Master
- 1:3 continuity master when required
- Screen 01–02
- Screen 03–08

If image generation/editing is unavailable, stop immediately. Do not read the remaining product evidence, do not produce the Blueprint, and do not enter Approval Gate 1.

Do not infer capability from the model name.

## 3. Stage 1 — Skill + product metadata

If Stage 0 passes:

1. read the current DetailFlow `SKILL.md` and required referenced ecommerce workflow files;
2. read `products/<product-slug>/product.md` from GitHub;
3. read `products/<product-slug>/manifest.yaml` from GitHub.

## 4. Stage 2 — binary evidence fallbacks

For PDFs, images, videos, drawings, brochures, and other binary evidence, use this order:

1. manifest `public_url` on `assets.licat.xyz`;
2. if that cannot actually be opened, manifest `source_url` on `raw.githubusercontent.com` as a direct HTTP source;
3. if both direct URL routes fail and the GitHub connector provides the **complete** binary as base64, decode it back into the original file only when the current session can then actually inspect the restored PDF/image/video.

Base64 by itself is not evidence inspection.

The binary preflight only passes after the session can:

- inspect at least one authoritative original source document; and
- visually inspect at least one authoritative real product image.

A filename, manifest record, binary size, or undecoded base64 payload is not evidence of a claim.

## 5. Recommended full prompt

```text
Use the DetailFlow workflow to create an English overseas-market ecommerce product detail page for product:

<product-slug>

IMPORTANT:
Do not assume you already know what "DetailFlow" means.

DetailFlow is an external GitHub Skill/workflow stored at:
https://github.com/AJbeckliy/detail-flow

Product source repository:
https://github.com/licat233/product-assets

BEFORE producing any Blueprint or reaching Approval Gate 1, run this capability preflight in order.

STAGE 0 — IMAGE GENERATION FIRST

Confirm that this ChatGPT session has an actually invokable image-generation/editing capability required to create:
- Visual Master
- 1:3 continuity master when required
- Screen 01–02
- Screen 03–08

Do not infer this from the model name.

If image generation/editing is unavailable:
STOP IMMEDIATELY.
Do not read the remaining product evidence.
Do not produce the 8-screen Blueprint.
Do not enter Approval Gate 1.

STAGE 1 — DETAILFLOW CONTRACT + PRODUCT METADATA

If Stage 0 passes:
1. Open the DetailFlow repository and read the current SKILL.md completely.
2. Read the files referenced by SKILL.md that are required for the ecommerce 8-screen workflow.
3. Treat the actual current repository rules as the execution contract. Do not substitute prior memory, a generic ecommerce workflow, or your own interpretation.
4. Read from GitHub:
   - products/<product-slug>/product.md
   - products/<product-slug>/manifest.yaml

STAGE 2 — BINARY EVIDENCE

For every PDF, image, video, drawing, brochure, or other binary source:

1. First try the manifest public_url on assets.licat.xyz.
2. If that cannot actually be opened, try the manifest source_url on raw.githubusercontent.com as a direct HTTP source.
3. If both direct URL routes fail, and the GitHub connector provides the COMPLETE binary as base64 and the current session can decode it into the original file, you may decode it and restore the file.
4. Base64 alone does NOT count as evidence inspection. The restored PDF/image/video must actually be opened and inspected.

The binary preflight only passes when you have:
- successfully opened and inspected at least one authoritative original document; and
- successfully opened and visually inspected at least one authoritative real product image.

If any required capability still fails after these allowed fallbacks:
STOP BEFORE THE BLUEPRINT.
Tell me exactly what failed.
Do not simulate image generation, do not create placeholders, and do not promote product.md summaries into verified source facts.

IF THE PREFLIGHT PASSES:

1. Read the authoritative original source documents relevant to every exact claim.
2. Inspect all authoritative real product reference images.
3. Separate information into:
   - user-confirmed corrections / overrides
   - authoritative-document facts
   - directly observed image facts
   - reasonable creative inference
   - unknown / do-not-claim information
4. Verify exact technical values against original source evidence rather than relying only on product.md.
5. Never invent unsupported specifications, certifications, test results, awards, discounts, partnerships, or regulated claims.
6. Follow the CURRENT DetailFlow SKILL.md workflow strictly, including both approval gates.
7. Use English visible commercial copy by default.
8. Preserve the real product's geometry, proportions, ports, controls, markings, colors, and materials.
9. Treat all eight screens as sequential sections of one continuous ecommerce long page, not eight unrelated posters.
```

Canonical prompt:

[`prompts/detailflow-session-bootstrap.md`](../prompts/detailflow-session-bootstrap.md)

## 6. Evidence classes

Every product claim should belong to one of these groups:

1. **User-confirmed correction or override**
2. **Authoritative-document fact**
3. **Directly observed image fact**
4. **Reasonable creative inference**
5. **Unknown / do not claim**

Exact technical values should be verified against the original manual, datasheet, drawing, or other authoritative source.

## 7. DetailFlow workflow expectation

After the full preflight passes:

```text
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
1:3 continuity master when required
    ↓
Generate Screen 01–02
    ↓
Two-screen concatenated preview + audit
    ↓
Approval Gate 2
    ↓
Generate Screen 03–08
    ↓
Full concatenation + final audit
```

The eight screens should behave as sequential slices of one continuous ecommerce detail page, not eight unrelated posters.

## 8. When binary evidence still cannot be inspected

Only mark binary evidence unavailable after all allowed routes fail:

```text
assets.licat.xyz public_url
        ↓ fail
raw.githubusercontent.com source_url
        ↓ fail
complete connector base64 → decode → inspect restored file
        ↓ fail
binary evidence unavailable
```

Do not ask the user to re-upload sources merely because the first URL fails.

If the execution environment still cannot move remote binary evidence into its PDF/vision inspection path after these fallbacks, treat that as a current ChatGPT runtime limitation rather than repeatedly redesigning Cloudflare, GitHub, or storage infrastructure.
