# <Product Name>

## Product identity

- Product slug: `<product-slug>`
- Product name: <Product Name>
- Product type:
- Category:
- Target market: International B2B
- Canonical product page:

## Source register

List the authoritative sources used to establish product facts.

Binary source files are staged locally in `docs/` and `images/`, uploaded to Cloudflare R2, and then referenced by URL in `manifest.yaml`. They are not committed to Git.

Examples:

- `docs/user-manual.pdf` — authoritative user manual; see manifest URL
- `docs/datasheet.pdf` — authoritative datasheet; see manifest URL
- `images/hero-01.jpg` — authoritative product photo; see manifest URL

Remove entries that do not exist and add other source documents as needed.

## User-confirmed corrections or overrides

Use this section only for facts explicitly confirmed by the user that clarify or override another source. Record provenance and date when practical.

- None.

## Confirmed specifications from authoritative documents

For every technical claim, cite the source filename or section/page when practical.

| Specification | Value | Source |
| --- | --- | --- |
|  |  |  |

## Directly observed facts from product images

Only record what can be seen directly. Do not infer hidden technology from appearance alone.

- 

## Supported functions and operating behavior

Only include functions supported by the manual, datasheet, or explicit user confirmation.

- 

## Supported applications

- 

## Reasonable creative inferences — review before commercial use

These may guide scene design or non-technical marketing language, but must not be presented as verified technical facts.

- 

## Unknown / do not claim without evidence

- 

## DetailFlow claim-seed candidates

Choose 2–4 broad but provable seeds that later screens can expand.

1. 
2. 
3. 
4. 

## Visible-copy language

Default: English.

## Notes

`product.md` is a structured summary for LLM use. Original source binaries stored in R2 remain the authoritative evidence layer when they are listed as authoritative in the manifest.
