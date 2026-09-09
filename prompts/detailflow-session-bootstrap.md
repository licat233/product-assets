# DetailFlow Session Bootstrap

Use this prompt when starting a new ChatGPT conversation for a product-detail-page task.

## What DetailFlow is

**Do not assume the current ChatGPT session already knows what DetailFlow means.**

DetailFlow is an external workflow / Skill stored in this GitHub repository:

`https://github.com/AJbeckliy/detail-flow`

Its job is to plan, generate, review, and iterate an image-led ecommerce product detail page as **8 sequential screens** that behave like one continuous long ecommerce page.

Before using the word "DetailFlow" as an instruction, the session must first open the repository and read its actual Skill definition.

At minimum, read:

- `SKILL.md`

Also read any files referenced by `SKILL.md` that are required for the ecommerce 8-screen workflow. Do not substitute prior memory, a generic ecommerce workflow, or an invented interpretation of DetailFlow for the repository's actual rules.

The standard DetailFlow image-led ecommerce workflow includes two normal approval gates:

```text
input / evidence analysis
        ↓
complete 8-screen Blueprint
        ↓
Approval Gate 1
        ↓
Text Master + Visual Master
        ↓
1:3 continuity master when appropriate
        ↓
Screen 01–02
        ↓
2-screen concatenated preview + audit
        ↓
Approval Gate 2
        ↓
Screen 03–08
        ↓
full concatenation + final audit
```

The exact execution contract in the current DetailFlow `SKILL.md` takes precedence over this summary.

## Product source repository

Product repository:

`https://github.com/licat233/product-assets`

For the requested product slug, the product package is under:

`products/<slug>/`

## Mandatory capability preflight — run BEFORE the Blueprint and Approval Gate 1

Before doing any DetailFlow planning, verify that the current ChatGPT session can actually complete the workflow.

1. **DetailFlow Skill access** — successfully open `https://github.com/AJbeckliy/detail-flow`, read `SKILL.md`, and understand the ecommerce 8-screen execution contract and both approval gates.
2. **Image-generation capability** — confirm the current session can actually generate/edit images required for the Visual Master and final slices. Do not infer this from the model name; verify that the capability is available in the current session.
3. **Product metadata access** — read `products/<slug>/product.md` from GitHub.
4. **Manifest access** — read `products/<slug>/manifest.yaml` from GitHub.
5. **Original-document inspection** — for PDFs and other binary source documents, do not rely on GitHub connector/base64 when a manifest `public_url` exists. Open at least one authoritative source document through its `https://assets.licat.xyz/...` `public_url` and confirm the original document can actually be inspected.
6. **Authoritative-image inspection** — open and visually inspect at least one real product image through its `https://assets.licat.xyz/...` `public_url`.

If **any** preflight item fails, STOP before producing the 8-screen Blueprint. Report exactly which capability is unavailable. Do not continue to Gate 1 and do not create a substitute workflow.

The purpose of this preflight is to avoid wasting the user's time in a session that can plan the page but cannot verify evidence or generate the final images.

## Evidence and source-reading rules

After the preflight passes:

1. Read `products/<slug>/product.md`.
2. Read `products/<slug>/manifest.yaml`.
3. Use GitHub primarily for text metadata such as `product.md` and `manifest.yaml`.
4. For PDFs, images, videos, drawings, brochures, and other binary evidence, prefer the manifest `public_url` values under `assets.licat.xyz` whenever available.
5. Read the authoritative original documents relevant to every exact specification or technical claim used in the page.
6. Inspect all authoritative real product images before locking the Visual Master.
7. Separate evidence into:
   - user-confirmed corrections / overrides
   - authoritative-document facts
   - directly observed image facts
   - reasonable creative inference
   - unknown / do-not-claim information
8. Treat inaccessible, 404, or mismatched source files as unavailable evidence. Never guess their contents.
9. Never invent exact technical parameters, certification status, awards, test results, discounts, medical/regulated claims, or brand partnerships.

## DetailFlow execution rules

Once the source review is complete, follow the **actual current `SKILL.md`** strictly.

Important expectations include:

- Produce the complete 8-screen Blueprint before final image generation.
- Stop at Approval Gate 1 and wait for user approval.
- Establish the Text Master and Visual Master after Gate 1.
- Use the 1:3 master as a continuity/hierarchy reference when the workflow calls for it; it is not a crop source or final deliverable.
- Generate Screen 01–02 first.
- Concatenate and inspect the first two screens before Gate 2.
- Stop at Approval Gate 2 and wait for user approval.
- Generate Screen 03–08 only after Gate 2.
- Run a final concatenated-page audit.
- Keep the product geometry, controls, ports, markings, colors, materials, and proportions consistent.
- Treat all eight screens as sequential parts of one long ecommerce detail page, not eight unrelated posters.
- Use English visible commercial copy by default for overseas-market outputs unless the user says otherwise.

## Recommended full prompt

```text
Use the DetailFlow workflow to create an English overseas-market ecommerce product detail page for product `<product-slug>`.

IMPORTANT: Do not assume you already know what "DetailFlow" means.
DetailFlow is an external GitHub Skill/workflow at:
https://github.com/AJbeckliy/detail-flow

Product source repository:
https://github.com/licat233/product-assets

Before producing any Blueprint or reaching Approval Gate 1, run this capability preflight:

1. Open the DetailFlow repository and read its current `SKILL.md` completely. Read any referenced files needed for the ecommerce 8-screen workflow. Use those actual repository rules as the execution contract; do not substitute a generic ecommerce workflow or prior memory.
2. Confirm this ChatGPT session can actually generate/edit images required for the Visual Master and final detail-page slices.
3. Read `products/<product-slug>/product.md` from GitHub.
4. Read `products/<product-slug>/manifest.yaml` from GitHub.
5. For PDFs, images, videos and other binary evidence, do not rely on GitHub connector/base64 when a manifest `public_url` exists. Use the `assets.licat.xyz` public_url values from the manifest.
6. Successfully open and inspect at least one authoritative original source document.
7. Successfully open and visually inspect at least one authoritative real product image.

If ANY preflight item is unavailable, STOP before producing the 8-screen Blueprint. Tell me exactly which capability or source access is unavailable. Do not continue to Gate 1, do not invent a substitute workflow, and do not simulate image generation with text, code, or placeholders.

If the preflight passes:

1. Read the original manuals, datasheets, drawings, brochures and other authoritative sources relevant to the product claims and exact specifications.
2. Inspect all authoritative real product reference images listed in the manifest.
3. Separate all information into:
   - user-confirmed corrections / overrides
   - authoritative-document facts
   - directly observed image facts
   - reasonable creative inference
   - unknown / do-not-claim information
4. Verify every exact technical value against the original source document rather than relying only on product.md.
5. Do not invent technical specifications, certification status, test results, awards, discounts, brand partnerships, medical/regulated claims, or unsupported commercial claims.
6. Then follow the CURRENT DetailFlow `SKILL.md` image-led ecommerce workflow strictly, including its complete 8-screen Blueprint, Approval Gate 1, Text/Visual Master stage, first-two-screen visual sample package, Approval Gate 2, Screens 03–08, and final concatenation audit.
7. Use English visible commercial copy by default.
8. Preserve product identity and treat all eight screens as sequential segments of one continuous long ecommerce detail page, not unrelated posters.
```

## Short prompt

Use this only when you are confident the current ChatGPT session will actually open the linked Skill rather than relying on prior knowledge:

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.

First open `https://github.com/AJbeckliy/detail-flow` and read its current `SKILL.md`; do not assume you already know DetailFlow. Run the full capability preflight before the Blueprint/Gate 1: verify image generation, GitHub product.md/manifest access, at least one original document through manifest `assets.licat.xyz` public_url, and at least one authoritative real product image through public_url. If anything fails, stop before the Blueprint. If all checks pass, follow the current DetailFlow 8-screen workflow and both approval gates strictly.
```
