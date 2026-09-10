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

The preflight is intentionally ordered to stop as early as possible when a session cannot complete DetailFlow.

### Stage 0 — image-generation capability first

Before reading product evidence, confirm that the current ChatGPT session has an **actually invokable image-generation/editing capability** for:

- Visual Master
- 1:3 continuity master when required
- Screen 01–02
- Screen 03–08

Do not infer this from the model name or from general ChatGPT capabilities.

If image generation/editing is unavailable, **STOP immediately**. Do not read the remaining product sources, do not produce the 8-screen Blueprint, and do not enter Approval Gate 1.

### Stage 1 — DetailFlow contract and product metadata

If Stage 0 passes:

1. Open `https://github.com/AJbeckliy/detail-flow` and read the current `SKILL.md` completely.
2. Read any files referenced by `SKILL.md` that are required for the ecommerce 8-screen workflow.
3. Read `products/<slug>/product.md` from GitHub.
4. Read `products/<slug>/manifest.yaml` from GitHub.

### Stage 2 — binary evidence inspection with fallbacks

For PDFs, images, videos, drawings, brochures, and other binary evidence, use this order:

1. **First choice:** open the manifest `public_url` under `https://assets.licat.xyz/...`.
2. **Second choice:** if `public_url` cannot actually be opened, try the manifest `source_url` under `https://raw.githubusercontent.com/...` as a direct HTTP source.
3. **Third choice:** if the GitHub connector returns complete binary content encoded as base64 and the current session can decode it into the original file, it may decode and restore the file **only if it then actually inspects the restored PDF/image/video**.

Base64 by itself is **not** successful evidence inspection. A filename, manifest entry, binary byte count, or undecoded base64 payload is not proof of a claim.

The binary preflight passes only after the session can:

- actually inspect at least one authoritative original document; and
- actually visually inspect at least one authoritative real product image.

If both direct URL routes fail and the connector payload cannot be restored and inspected, mark binary evidence access as unavailable and stop before the Blueprint.

## Evidence and source-reading rules

After the full preflight passes:

1. Read the authoritative original documents relevant to every exact specification or technical claim used in the page.
2. Inspect all authoritative real product images before locking the Visual Master.
3. Separate evidence into:
   - user-confirmed corrections / overrides
   - authoritative-document facts
   - directly observed image facts
   - reasonable creative inference
   - unknown / do-not-claim information
4. Treat inaccessible, 404, mismatched, undecoded, or uninspectable source files as unavailable evidence. Never guess their contents.
5. Never invent exact technical parameters, certification status, awards, test results, discounts, medical/regulated claims, or brand partnerships.

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

## Short prompt

Use this only when you are confident the current ChatGPT session will actually open the linked Skill rather than relying on prior knowledge:

```text
Use DetailFlow for `<product-slug>` from `licat233/product-assets`.

Before anything else, verify that this session can actually invoke image generation/editing. If not, stop immediately before reading product evidence or producing the Blueprint.

If image generation is available, read the current DetailFlow SKILL.md, then read product.md and manifest.yaml. For binary evidence use: manifest public_url → manifest source_url → complete connector base64 decoded back to the original file only when the restored file can actually be inspected. Base64 alone is not evidence review.

Do not produce the Blueprint unless at least one authoritative source document and one authoritative real product image have actually been inspected. Then follow the current DetailFlow 8-screen workflow and both approval gates strictly.
```
