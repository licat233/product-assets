# Product Detail Designer Session Bootstrap

Use this prompt when starting a new ChatGPT conversation for a product-detail-page task.

## What Product Detail Designer is

**Do not assume the current ChatGPT session already knows this Skill. Read the pinned SKILL.md first.**

Product Detail Designer is our own brand-neutral, open-source Skill. For ChatGPT product-detail-page work, use only our own Product Detail Designer Skill at the pinned release below:

**Pinned Skill release (immutable):**
- Repository: `https://github.com/licat233/product-detail-designer`
- Version: `v1.0.6`
- `SKILL.md`: https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.6/SKILL.md

Read this exact `SKILL.md` before production. It is the only required Skill file; no additional reference files or local dependencies are required.

Its job is to plan, generate, review, and iterate an image-led ecommerce product detail page as **8 sequential image slices** that behave like one continuous long ecommerce page.

Before starting, read the pinned `SKILL.md` above. No other Skill reference files or dependencies are required.

The user's task-specific prompt controls page structure, approval gates, image ratio, and deliverables. Product Detail Designer v1.0.6 supplies general product-identity, factual-accuracy, visual-consistency, image-generation, and quality-review rules; it must not add unrequested stages.

The task-specific production prompt defines the approval gates. Do not add any gates beyond those it explicitly requests.

```text
input / evidence analysis
        ↓
Production Brief Confirmation
        ↓
complete 8-slice Page Blueprint
        ↓
Approval Gate 1
        ↓
Text Master + Visual Master
        ↓
1:3 continuity master when appropriate
        ↓
first 2–3 slices
        ↓
2–3-screen concatenated preview + audit
        ↓
Approval Gate 2
        ↓
remaining slices
        ↓
full concatenation + final audit
```

The task-specific production prompt controls page structure, approval gates, and deliverables; Product Detail Designer v1.0.6 supplies general execution and quality rules.

## Product source repository

Product repository:

`https://github.com/licat233/product-assets`

For the requested product slug, the product package is under:

`products/<slug>/`

## Mandatory capability preflight — run BEFORE the Blueprint and Approval Gate 1

The preflight is intentionally lightweight: verify image-generation capability, then read the Skill and required product evidence.

### Stage 0 — image-generation capability first

Before reading product evidence, confirm that the current ChatGPT session has an **actually invokable image-generation/editing capability** for:

- Visual Master
- 1:3 continuity master when required
- first 2–3 slices
- remaining slices

Do not infer this from the model name or from general ChatGPT capabilities.

If image generation/editing is unavailable, **STOP immediately**. Do not read the remaining product sources, do not produce the 8-slice Page Blueprint, and do not enter Approval Gate 1.

### Stage 1 — Product Detail Designer Skill and product metadata

If Stage 0 passes:

1. Read the pinned `SKILL.md` at `https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.6/SKILL.md` completely.
2. Read `products/<slug>/product.md` from GitHub.
3. Read `products/<slug>/manifest.yaml` from GitHub.

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
5. Treat inaccessible, 404, mismatched, undecoded, or uninspectable source files as unavailable evidence. Never guess their contents.
5. Never invent exact technical parameters, certification status, awards, test results, discounts, medical/regulated claims, or brand partnerships.

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

## Product Identity Lock — P0 hard gate

**Product appearance integrity is a non-negotiable P0 acceptance gate.** A visually attractive image that changes the real product is a failed result.

Before the Blueprint, establish an internal identity record from the original evidence (do not ask the user to fill in a form):

- Exact product/model/variant.
- `identity_anchor_assets`: filenames or asset IDs of original, unedited product photographs and, only when explicitly confirmed as current and exact, approved original CAD/product renders.
- `identity_markers`: silhouette, proportions, component count and arrangement, distinctive geometry, ports/connectors, fasteners, labels/markings/logo, color, material/finish, and assembly relationships.
- `unknown_or_unseen`: angles, hidden structures, parts, and details not established by the evidence.
- `forbidden_changes`: all identity markers that must not be added, removed, duplicated, reshaped, recolored, relocated, or replaced.

Use user-confirmed corrections and designated authoritative original product assets as the source of truth. Original product photos establish visible appearance; genuine close-ups clarify details; engineering drawings establish only the geometry and relationships they actually document. Never infer an unseen side, hidden component, or missing detail. If model/variant identity is ambiguous or sources conflict, ask one concise question rather than combining them.

Keep reference roles separate:

1. **Original product identity anchors** establish the real product's appearance and must be used for every slice that depicts the product. Original photos are preferred; a CAD/product render is an anchor only when the user confirms it is current and exact.
2. **The previous accepted slice** establishes page continuity only (background, scene, lighting, perspective, composition, and content handoff). It is never a substitute for the original product photo and must not override product geometry, color, construction, markings, or component count.
3. **Visual Master / 1:3 continuity master / style references** guide page-level visual design only. A generated product depiction inside any of these is not an authoritative product reference.

If the image tool accepts only one image reference, prioritize the original product identity anchor and carry page continuity through a written handoff. Product identity outranks page continuity.

For each product-bearing slice, select an internal depiction mode:

- `original-photo`: safest default; use the actual product photograph, with only non-destructive crop and uniform scaling.
- `source-photo-composite`: use the original product photo/cutout as the foreground and design the surrounding scene separately. Claim pixel preservation only if the actual tool supports masking/layers and the original product pixels remain intact in the inspected output.
- `constrained-edit`: only edit from a genuine source photo when the same evidenced view and critical geometry can be preserved; reference-based redraw is not automatically accurate.
- `evidence-based-diagram`: explain documented construction from an authoritative drawing without pretending it is a photorealistic product photo.
- `no-product-depiction`: use copy, typography, or application context when the supplied evidence cannot support an accurate product image.

Prefer the original photo whenever it communicates the point. Do not freely redraw, redesign, recolor, reshape, warp, stretch, or invent the product. Do not request a new camera angle or close-up unless a genuine reference for that view exists. If reliable compositing or product preservation is unavailable, use the original photo directly or explain which real photo is missing; never present an AI-redrawn approximation as the actual product.

### P0 appearance verification and recovery

Compare every generated product depiction side by side with its original identity anchor(s), not just with the previous generated slice. Check the actual identity markers. A model's own statement that it preserved the product is not proof.

P0 result must be `PASS / FAIL / UNVERIFIED`:

- **Critical — automatic fail:** wrong model/variant, changed functional structure, missing/extra/duplicated/merged component, changed connector/port/assembly, or invented/removed identity-defining part.
- **Major — fail:** visibly changed silhouette, proportions, component placement/spacing, color, material/finish, logo, label, or model marking.
- **Minor — review:** background, props, lighting outside the product, or composition issues that do not alter or conceal an identity marker. If a critical feature cannot be checked, it is UNVERIFIED—not a pass.

Any Critical or Major mismatch, or any unverified critical marker, rejects the image. No visual-design score can override a P0 failure.

When an image fails, replace the product depiction with the original photo or a verified source-photo composite. If reliable repair is unavailable, revert to `original-photo` or `no-product-depiction`; do not keep asking the model to redraw the same inaccurate geometry. Never pass a failed or unverified product depiction forward as the next slice's continuity reference. Continue only from the last accepted slice. If the evidence itself is insufficient, request the specific missing real photo or drawing.

## Page first, slices second (mandatory)

**Design one complete vertical ecommerce page first, then divide it into separate image files. The page is the design unit; each image is only a delivery slice.** Never design independent canvases and try to stitch them together with matching backgrounds or typography.

- The complete page has one primary title / H1, shown only in the first image.
- Intermediate images must not restart with a product-introduction title, standalone hero, page masthead, or title bar.
- No image may contain a website footer, contact-information bar, repeated logo, repeated product-name bar, copyright strip, or decorative sign-off.
- If needed, one final CTA may appear only at the actual end of the complete page. Never repeat it at the bottom of each image.
- Content modules may cross image boundaries; a file boundary is not a content-section boundary.
- An intermediate image may enter partway through an ongoing scene or content module and leave before that module is complete. It does not need to be independently complete or self-contained.
- Generate later images sequentially as continuations of the previous image's content and visual state. Select canvas extension, reference continuation, or tonal continuity according to the image tool's actual capability and the page scene. Do not assume reference support means canvas extension is available, and do not restart from a blank canvas.
- Inspect the concatenated preview. Repeated titles/footers, repeated heroes, standalone-poster layouts, or a PowerPoint rhythm where every image starts over and ends independently are failures and must be repaired.

## Slice continuity — capability-aware (mandatory)

Every image must continue the same ecommerce page rather than read as a separately completed poster or slide. A file boundary is a delivery boundary, not a reason to restart or conclude the page.

For each slice, define internally:

- `slice_entry_state` and `slice_exit_state`.
- `top_edge_anchor` and `bottom_edge_anchor`: observable scene, background, surface, object position, lighting, perspective, and content state.
- `continuity_intent`: how the next slice should continue the page, or why a natural scene transition is appropriate.
- `next_slice_handoff`: the concrete visual and content state the next slice should pick up.
- `top_edge_mode`: `opening` for Slice 01; `continuation` for later slices.
- `bottom_edge_mode`: `open` for non-final slices; `closed` only for the final slice.
- `continuity_strategy`: `canvas-extension`, `reference-continuation`, or `tonal-continuity`.

Do not force every non-final image to contain a physical object crossing its bottom edge. Do not reserve a mandatory 10–15% strip, add artificial cables/rails/surfaces, or distort a useful composition merely to satisfy a mechanical seam rule. A visual carrier may help when it naturally belongs to the scene, but it is optional.

Choose the continuity strategy according to the image tool's actual capability:

1. **Canvas extension:** use only when the tool explicitly supports extending the existing canvas/outpainting while preserving the original area. Do not infer this capability from ordinary image-reference support.
2. **Reference continuation:** use when the tool can reference the previous accepted image but has no verified canvas-extension operation. Describe the actual handoff and preserve the scene as closely as the tool allows. This does not guarantee pixel-perfect joins.
3. **Tonal continuity:** use when the page naturally moves to a different scene or forcing the prior scene to continue would look artificial. Preserve a coherent palette, lighting, material language, depth, and buyer journey; do not create an unrelated poster.

If the user explicitly requires pixel-level continuity and the available tool cannot reliably provide it, explain the limitation before proceeding. Never describe reference continuation as pixel-preserving outpainting or guarantee a seamless join without verification. Do not use tonal continuity to excuse unrelated slides.

Generate one slice at a time. Inspect the actual result before using it as the reference for the next slice. If the bottom edge reads as a page ending or the handoff is inconsistent, repair it before continuing. Do not batch-generate the remaining slices.

## Production brief confirmation (required before the Blueprint)

After actually inspecting the product documents and images, but before creating the Blueprint, use Product Detail Designer v1.0.6 to confirm these four items:

1. **Output language** — the language shown in the final images. The recommended prompt in this document explicitly requests English, so do not ask again when that prompt is used unless the user changes it.
2. **Image dimensions / aspect ratio** — the pixel dimensions or ratio for each final image. If the user's production prompt already specifies 9:21 or another size / ratio, do not ask again; otherwise confirm it.
3. **Ecommerce platform / placement** — for example, Amazon product images, Amazon A+ Content, Shopify product-page media, or an Alibaba.com product detail page. Ask if missing.
4. **Sales region / target market** — a specific country or region, or an explicit global-market scope. “Overseas market” alone is not a specific country or region; ask if missing.

Combine all missing items into one concise message. If the platform placement is known but the image size is not, recommend a suitable size / ratio and ask for confirmation. If the user explicitly delegates a decision, choose and state the assumption. Do not present a design recommendation as an official platform requirement or invent platform specifications.

Proceed to the Blueprint only after all four items are supplied or explicitly delegated. This is a production-parameter checkpoint, not an additional visual approval gate.

## Product Detail Designer execution rules

Once the source review is complete, follow Product Detail Designer v1.0.6 for general safeguards; keep the user's prompt authoritative for task-specific stages and approvals.

Important expectations include:

- Produce the complete 8-slice Page Blueprint before final image generation.
- Stop at Approval Gate 1 and wait for user approval.
- Establish the Text Master and Visual Master after Gate 1.
- Use the 1:3 master as a continuity/hierarchy reference when the workflow calls for it; it is not a crop source or final deliverable.
- Generate first 2–3 slices first.
- Concatenate and inspect the first 2–3 slices before Gate 2.
- Stop at Approval Gate 2 and wait for user approval.
- Generate remaining slices only after Gate 2.
- Run a final concatenated-page audit.
- Enforce the P0 Product Identity Lock: original product photos are the identity anchors for every product-bearing slice; previous slices guide page continuity only. Any Critical/Major drift or unverified critical feature blocks delivery.
- Treat all eight image slices as sequential parts of one long ecommerce detail page, not eight unrelated posters.
- Use English visible commercial copy by default for overseas-market outputs unless the user says otherwise.

## Recommended full prompt

```text
Use Product Detail Designer and the task-specific production prompt to create an English overseas-market ecommerce product detail page for product:

<product-slug>

IMPORTANT:
Do not assume you already know this Skill; read the pinned SKILL.md.

Product Detail Designer is our own open-source GitHub Skill, fixed at release v1.0.6:
https://github.com/licat233/product-detail-designer/tree/v1.0.6

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
1. Read the pinned `SKILL.md` at `https://raw.githubusercontent.com/licat233/product-detail-designer/v1.0.6/SKILL.md` completely.
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
2. Inspect all authoritative original product reference images.
3. Establish the internal Product Identity Lock: map original identity-anchor assets, critical visible markers, forbidden changes, and unknown/unseen details before creating product-bearing visuals.
4. Separate information into:
   - user-confirmed corrections / overrides
   - authoritative-document facts
   - directly observed image facts
   - reasonable creative inference
   - unknown / do-not-claim information
5. Verify exact technical values against original source evidence rather than relying only on product.md.
6. Never invent unsupported specifications, certifications, test results, awards, discounts, partnerships, or regulated claims.
7. Follow the user's task-specific prompt for workflow stages and approval gates; use Product Detail Designer v1.0.6 for general product-identity, factual-accuracy, and image-quality safeguards.
8. Use English visible commercial copy by default.
9. Preserve the real product's geometry, proportions, ports, controls, markings, colors, and materials. Apply the P0 appearance gate to every product-bearing slice.
10. Treat all eight image slices as sequential sections of one continuous ecommerce long page, not eight unrelated posters.
```

## Short prompt

Use this only when you are confident the current ChatGPT session will actually open the linked Skill rather than relying on prior knowledge:

```text
Use Product Detail Designer for `<product-slug>` from `licat233/product-assets`.

Before anything else, verify that this session can actually invoke image generation/editing. If not, stop immediately before reading product evidence or producing the Blueprint.

If image generation is available, read the pinned Product Detail Designer `SKILL.md` at release `v1.0.6`, then read product.md and manifest.yaml. For binary evidence use: manifest public_url → manifest source_url → complete connector base64 decoded back to the original file only when the restored file can actually be inspected. Base64 alone is not evidence review.

Do not produce the Blueprint unless at least one authoritative source document and one authoritative real product image have actually been inspected. Establish the Product Identity Lock from original product photos before planning product-bearing slices. Every product-bearing slice must use its original identity anchor; the previous slice is only a page-continuity reference. If the tool cannot preserve the product accurately, use the original photo or explain the limitation rather than presenting a drifted redraw as the real product. Then follow the user's 8-slice page-first production prompt and its approval gates; use Product Detail Designer v1.0.6 for general image-generation and quality rules.
```
