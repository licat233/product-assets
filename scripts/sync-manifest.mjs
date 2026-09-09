import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const productsRoot = path.join(repoRoot, 'products');
const assetOrigin = 'https://assets.licat.xyz';
const githubRawBase = 'https://raw.githubusercontent.com/licat233/product-assets/main';

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif']);
const videoExtensions = new Set(['.mp4', '.webm', '.mov']);

function yamlString(value) {
  return JSON.stringify(String(value));
}

function encodeRepoPath(value) {
  return value.split('/').map(encodeURIComponent).join('/');
}

function readText(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function cleanMarkdownValue(value = '') {
  return value.trim().replace(/^`|`$/g, '').trim();
}

function readProductIdentity(productDir, slug) {
  const text = readText(path.join(productDir, 'product.md'));

  const bullet = (label) => {
    const match = text.match(new RegExp(`^- ${label}:[ \\t]*(.*?)[ \\t]*$`, 'mi'));
    return match ? cleanMarkdownValue(match[1]) : '';
  };

  const heading = text.match(/^#\s+(.+?)\s*$/m)?.[1]?.trim() ?? '';

  return {
    name: bullet('Product name') || heading || slug,
    category: bullet('Category'),
    market: bullet('Target market') || 'International B2B',
    canonical: bullet('Canonical product page'),
  };
}

function listFiles(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name !== '.gitkeep' && entry.name !== '.DS_Store')
    .map((entry) => ({
      name: entry.name,
      extension: path.extname(entry.name).toLowerCase(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}

function imageRole(file) {
  if (videoExtensions.has(file.extension)) return 'product_reference_video';

  if (
    /(^|[-_])(hero|main)([-_.]|$)/i.test(file.name)
    || file.name.includes('主图')
  ) {
    return 'primary_product_reference';
  }

  return 'product_reference';
}

function publicAssetUrl(slug, folder, filename) {
  return `${assetOrigin}/products/${encodeURIComponent(slug)}/${folder}/${encodeURIComponent(filename)}`;
}

function renderManifest(slug, productDir) {
  const identity = readProductIdentity(productDir, slug);
  const documents = listFiles(path.join(productDir, 'docs'));
  const images = listFiles(path.join(productDir, 'images'));

  const lines = [
    '# AUTO-GENERATED FILE — DO NOT EDIT MANUALLY.',
    `# Run: bash scripts/sync-manifest.sh ${slug}`,
    '',
    'schema_version: 4',
    '',
    `product_id: ${yamlString(slug)}`,
    `product_name: ${yamlString(identity.name)}`,
  ];

  if (identity.category) lines.push(`category: ${yamlString(identity.category)}`);
  lines.push('language: en');
  lines.push(`market: ${yamlString(identity.market)}`);
  if (identity.canonical) lines.push(`canonical_product_url: ${yamlString(identity.canonical)}`);

  lines.push(
    '',
    'summary_file: product.md',
    `public_product_base_url: ${yamlString(`${assetOrigin}/products/${encodeURIComponent(slug)}`)}`,
    `documents_base_url: ${yamlString(`${assetOrigin}/products/${encodeURIComponent(slug)}/docs`)}`,
    `assets_base_url: ${yamlString(`${assetOrigin}/products/${encodeURIComponent(slug)}/images`)}`,
    '',
  );

  if (documents.length === 0) {
    lines.push('documents: []');
  } else {
    lines.push('documents:');
    for (const file of documents) {
      const relativePath = `docs/${file.name}`;
      lines.push(`  - path: ${yamlString(relativePath)}`);
      lines.push(`    file_type: ${yamlString(file.extension ? file.extension.slice(1) : 'file')}`);
      lines.push('    authority: authoritative');
      lines.push(`    source_url: ${yamlString(`${githubRawBase}/products/${encodeRepoPath(slug)}/${encodeRepoPath(relativePath)}`)}`);
      lines.push(`    public_url: ${yamlString(publicAssetUrl(slug, 'docs', file.name))}`);
    }
  }

  lines.push('');

  if (images.length === 0) {
    lines.push('images: []');
  } else {
    lines.push('images:');
    for (const file of images) {
      const relativePath = `images/${file.name}`;
      const mediaType = imageExtensions.has(file.extension)
        ? 'image'
        : videoExtensions.has(file.extension)
          ? 'video'
          : 'file';

      lines.push(`  - path: ${yamlString(relativePath)}`);
      lines.push(`    media_type: ${yamlString(mediaType)}`);
      lines.push(`    role: ${yamlString(imageRole(file))}`);
      lines.push(`    source_url: ${yamlString(`${githubRawBase}/products/${encodeRepoPath(slug)}/${encodeRepoPath(relativePath)}`)}`);
      lines.push(`    public_url: ${yamlString(publicAssetUrl(slug, 'images', file.name))}`);
    }
  }

  lines.push(
    '',
    'evidence_priority:',
    '  - user_confirmed_override',
    '  - authoritative_document',
    '  - directly_observed_image_fact',
    '  - derived_product_summary',
    '  - reasonable_creative_inference',
    '',
    'claims_policy:',
    '  allow_reasonable_creative_inference: true',
    '  require_source_for_exact_spec: true',
    '  invent_exact_specs: false',
    '  invent_certifications: false',
    '  invent_awards: false',
    '  invent_test_results: false',
    '  invent_brand_partnerships: false',
    '  invent_regulated_claims: false',
    '',
    'detailflow:',
    '  screens: 8',
    '  final_slice_ratio: "9:21"',
    '  visible_copy_language: en',
    '  approval_gates: 2',
    '  require_capability_preflight: true',
    '  require_input_analysis: true',
    '  require_source_document_review: true',
    '  require_blueprint_before_generation: true',
    '  require_early_two_slice_preview: true',
    '  require_final_concat_audit: true',
    '',
  );

  return lines.join('\n');
}

function syncProduct(slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid product slug: ${slug}`);
  }

  const productDir = path.join(productsRoot, slug);
  if (!fs.existsSync(productDir) || !fs.statSync(productDir).isDirectory()) {
    throw new Error(`Product not found: products/${slug}`);
  }

  const target = path.join(productDir, 'manifest.yaml');
  const next = renderManifest(slug, productDir);
  const previous = readText(target);

  if (previous === next) {
    console.log(`Up to date: products/${slug}/manifest.yaml`);
    return false;
  }

  fs.writeFileSync(target, next, 'utf8');
  console.log(`Synced: products/${slug}/manifest.yaml`);
  return true;
}

const requestedSlugs = process.argv.slice(2);
const slugs = requestedSlugs.length > 0
  ? requestedSlugs
  : fs.existsSync(productsRoot)
    ? fs.readdirSync(productsRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort()
    : [];

if (slugs.length === 0) {
  console.log('No product directories found.');
  process.exit(0);
}

let changed = 0;
for (const slug of slugs) {
  if (syncProduct(slug)) changed += 1;
}

console.log(`Manifest sync complete: ${slugs.length} product(s), ${changed} updated.`);
