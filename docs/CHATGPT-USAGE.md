# ChatGPT + Product Detail Designer Usage

[中文](./CHATGPT-USAGE.zh-CN.md)

This document explains how a new ChatGPT session should read Product Detail Designer, verify image-generation capability, and inspect product source materials.

## 1. Product Detail Designer is our own open-source Skill

Product Detail Designer is a brand-neutral skill for ecommerce product-detail image creation.

- Repository: https://github.com/licat233/product-detail-designer
- Pinned release: `v1.0.5`
- Only required file: https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.5/SKILL.md

A new session needs to read only this pinned `SKILL.md`. No additional reference files, local installation, or external toolchain are required.

**The user's production prompt is the task-specific source of truth.** It defines the page count, content structure, masters, approval gates, and deliverables. The Skill provides general product-identity, factual-accuracy, visual-consistency, image-generation, and quality-review rules; it must not add unrequested stages.

## 2. Stage 0 — image generation first

Before reading product evidence, verify that the current session has an actually invokable image-generation/editing capability for:

- Visual Master
- 1:3 continuity master when required
- first 2–3 slices
- remaining slices

If image generation/editing is unavailable, stop immediately. Do not read the remaining product evidence, do not produce the Blueprint, and do not enter Approval Gate 1.

Do not infer capability from the model name.

## 3. Stage 1 — Skill + product metadata

If Stage 0 passes:

1. read the pinned Product Detail Designer `SKILL.md` at `https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.5/SKILL.md`;
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

## Page first, slices second (mandatory)

**Design one complete vertical ecommerce page first, then divide it into separate image files. The page is the design unit; each image is only a delivery slice.** Never design independent canvases and try to stitch them together with matching backgrounds or typography.

- The complete page has one primary title / H1, shown only in the first image.
- Intermediate images must not restart with a product-introduction title, standalone hero, page masthead, or title bar.
- No image may contain a website footer, contact-information bar, repeated logo, repeated product-name bar, copyright strip, or decorative sign-off.
- If needed, one final CTA may appear only at the actual end of the complete page. Never repeat it at the bottom of each image.
- Content modules may cross image boundaries; a file boundary is not a content-section boundary.
- An intermediate image may enter partway through an ongoing scene or content module and leave before that module is complete. It does not need to be independently complete or self-contained.
- Generate later images sequentially as continuations of the previous image's content and visual state. Prefer image extension / outpainting from the previous bottom edge; if unsupported, use that bottom edge as the concrete reference for the next image's top. Do not restart from a blank canvas.
- Inspect the concatenated preview. Repeated titles/footers, repeated heroes, standalone-poster layouts, or a PowerPoint rhythm where every image starts over and ends independently are failures and must be repaired.

## Open-ended slice edges (mandatory)

The v1.0.4 page-first rule removed repeated titles and footers, but a slice can still look finished without either. **Every non-final slice must remain visually open at its bottom edge.** Only the final image may conclude the page.

- Slice 01: opening top, open bottom.
- Slices 02–07: continuation top, open bottom.
- Slice 08 (or whichever is the actual final slice): continuation top, closed bottom.
- Define `top_edge_mode`, `bottom_edge_mode`, `continuity_carrier`, and `next_slice_handoff` for every slice.
- In every non-final slice, keep the bottom 10–15% as a continuation zone. Keep all critical copy and specifications above it.
- At least one concrete non-text visual carrier (such as a shelf/track, cable, surface, perspective line, diagram path, light strip, or architectural plane) must reach or pass through the bottom edge and visibly continue into the next slice. Matching colors alone do not count.
- No visual ending at the bottom of an intermediate slice: no large blank margin, fade-to-blank, vignette, darkening, completed card/grid row, centered final composition, divider, decorative end band, summary, or CTA.
- Do not cut through important product geometry or text to fake continuity. Continue the surrounding scene or a secondary visual carrier.
- Generate **one image at a time**. Never batch-generate Slices 03–08. After each image, inspect its bottom edge; if it looks finished, regenerate it before using it as the reference for the next slice.
- Generate the next slice using both the actual previous image and the next slice's planned handoff. The next image must continue the previous carrier and scene.
- If the image tool cannot preserve an open edge, use a supported continuous-canvas/extension workflow or report the limitation. Do not pass a sequence of separately closed images as a continuous page.

## Production brief confirmation (required before the Blueprint)

After actually inspecting the product documents and images, but before creating the Blueprint, use Product Detail Designer v1.0.5 to confirm these four items:

1. **Output language** — the language shown in the final images. The recommended prompt in this document explicitly requests English, so do not ask again when that prompt is used unless the user changes it.
2. **Image dimensions / aspect ratio** — the pixel dimensions or ratio for each final image. If the user's production prompt already specifies 9:21 or another size / ratio, do not ask again; otherwise confirm it.
3. **Ecommerce platform / placement** — for example, Amazon product images, Amazon A+ Content, Shopify product-page media, or an Alibaba.com product detail page. Ask if missing.
4. **Sales region / target market** — a specific country or region, or an explicit global-market scope. “Overseas market” alone is not a specific country or region; ask if missing.

Combine all missing items into one concise message. If the platform placement is known but the image size is not, recommend a suitable size / ratio and ask for confirmation. If the user explicitly delegates a decision, choose and state the assumption. Do not present a design recommendation as an official platform requirement or invent platform specifications.

Proceed to the Blueprint only after all four items are supplied or explicitly delegated. This is a production-parameter checkpoint, not an additional visual approval gate.

## Mandatory separation of product evidence and visual design

**Content reference is not visual reference.** Product manuals, specification sheets, brochure PDFs, catalogs, and technical documents are factual sources by default, not ecommerce design templates.

Classify each source by role:

- **Product evidence:** extract verified specifications, functions, features, materials, applications, limitations, and approved claims.
- **Product visual assets:** real product photos, pack shots, close-ups, installation photos, and application photos establish the product's actual appearance.
- **Engineering drawings / diagrams:** use them to understand construction, dimensions, wiring, and operation. Redraw a clear explanatory diagram only when useful, preserving the engineering meaning and never inventing missing data.
- **Visual-design references:** only brand guidelines, moodboards, sample pages, or design files explicitly designated by the user as style references may guide the visual design.

Unless the user explicitly asks to reproduce, redesign, convert, or use a PDF as a layout/style template, do not:

- Trace, recreate, recolor, retype, translate, or rearrange the PDF's page UI or layout.
- Copy its page sequence, composition, title placement, text blocks, tables, icon grids, decorative elements, backgrounds, or information hierarchy.
- Use a complete PDF page or screenshot as an image-generation design reference by default.
- Convert each PDF page into a corresponding ecommerce detail screen.

You may extract and reorganize verified facts, approved copy, individual product images, and useful technical information. Re-plan the content and visual design around the target buyer, purchase decision, and confirmed platform. The final work must be an independently conceived ecommerce detail page, not a restyled version of the brochure.

If the only product photo is embedded in a PDF, use an individual extracted image only when its quality is sufficient. Never substitute a complete PDF page for a product photo. If the real product cannot be seen clearly, explain the limitation or request a proper image.

**Acceptance test:** if the final images look like the source PDF with different colors, fonts, or rearranged blocks, or follow its page-by-page structure, the design fails and must be independently redesigned.

## 5. Recommended full prompt

```text
Use Product Detail Designer and the task-specific production prompt to create an English overseas-market ecommerce product detail page for product:

<product-slug>

IMPORTANT:
Do not assume you already know this Skill; read the pinned SKILL.md first.

Product Detail Designer is our own open-source GitHub Skill, fixed at release v1.0.5:
https://github.com/licat233/product-detail-designer/tree/v1.0.5

Product source repository:
https://github.com/licat233/product-assets

BEFORE producing any Blueprint or reaching Approval Gate 1, run this capability preflight in order.

STAGE 0 — IMAGE GENERATION FIRST

Confirm that this ChatGPT session has an actually invokable image-generation/editing capability required to create:
- Visual Master
- 1:3 continuity master when required
- first 2–3 slices
- remaining slices

Do not infer this from the model name.

If image generation/editing is unavailable:
STOP IMMEDIATELY.
Do not read the remaining product evidence.
Do not produce the 8-slice Page Blueprint.
Do not enter Approval Gate 1.

STAGE 1 — PRODUCT DETAIL DESIGNER SKILL + PRODUCT METADATA

If Stage 0 passes:
1. Read the pinned `SKILL.md` at `https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.5/SKILL.md` completely.
2. Treat the user's production prompt as the task-specific source of truth; use the Skill for general safeguards.
3. Read from GitHub:
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
6. Follow the user's task-specific production prompt for stages and approval gates; use Product Detail Designer v1.0.5 for general safeguards.
7. Use English visible commercial copy by default.
8. Preserve the real product's geometry, proportions, ports, controls, markings, colors, and materials.
9. Treat all eight image slices as sequential sections of one continuous ecommerce long page, not eight unrelated posters.
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

## 7. Product Detail Designer workflow expectation

After the full preflight passes:

```text
Source review
    ↓
Evidence classification
    ↓
Complete 8-slice Page Blueprint
    ↓
Approval Gate 1
    ↓
Text Master / Visual Master
    ↓
1:3 continuity master when required
    ↓
Generate first 2–3 slices
    ↓
Two-screen concatenated preview + audit
    ↓
Approval Gate 2
    ↓
Generate remaining slices
    ↓
Full concatenation + final audit
```

The eight image slices should behave as one continuous ecommerce detail page, not eight unrelated posters.

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
