import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const productsRoot = path.join(repoRoot, 'products');
const distRoot = path.join(repoRoot, 'dist');

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif']);
const videoExtensions = new Set(['.mp4', '.webm', '.mov']);

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function stripYamlScalar(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function readProductName(productDir, slug) {
  const manifestPath = path.join(productDir, 'manifest.yaml');
  if (!fs.existsSync(manifestPath)) return slug;

  const manifest = fs.readFileSync(manifestPath, 'utf8');
  const match = manifest.match(/^product_name:\s*(.+?)\s*$/m);
  if (!match) return slug;

  const value = stripYamlScalar(match[1]);
  if (!value || /^<.*>$/.test(value)) return slug;
  return value;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unit = units[0];
  for (let i = 1; i < units.length && value >= 1024; i += 1) {
    value /= 1024;
    unit = units[i];
  }
  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${unit}`;
}

function encodePathSegment(value) {
  return encodeURIComponent(value).replaceAll('%2F', '/');
}

function publicUrl(slug, folder, filename) {
  return `/products/${encodePathSegment(slug)}/${folder}/${encodePathSegment(filename)}`;
}

function collectFiles(slug, productDir, folder) {
  const dir = path.join(productDir, folder);
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name !== '.gitkeep' && entry.name !== '.DS_Store')
    .map((entry) => {
      const extension = path.extname(entry.name).toLowerCase();
      const sourcePath = path.join(dir, entry.name);
      const stat = fs.statSync(sourcePath);
      const type = imageExtensions.has(extension)
        ? 'image'
        : videoExtensions.has(extension)
          ? 'video'
          : 'document';
      return {
        name: entry.name,
        extension,
        type,
        folder,
        size: stat.size,
        url: publicUrl(slug, folder, entry.name),
        sourcePath,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}

function preferredCover(media) {
  const images = media.filter((item) => item.type === 'image');
  return images.find((item) => /(^|[-_])(hero|main)([-_.]|$)/i.test(item.name))
    ?? images.find((item) => item.name.includes('主图'))
    ?? images[0]
    ?? null;
}

function renderFileCard(item) {
  const name = escapeHtml(item.name);
  const url = escapeHtml(item.url);
  const extension = escapeHtml((item.extension || '').slice(1).toUpperCase() || 'FILE');
  const size = escapeHtml(formatBytes(item.size));

  let preview;
  if (item.type === 'image') {
    preview = `<img src="${url}" alt="${name}" loading="lazy" />`;
  } else if (item.type === 'video') {
    preview = `<video src="${url}" controls preload="metadata"></video>`;
  } else {
    preview = `<div class="document-preview"><strong>${extension}</strong><span>Source document</span></div>`;
  }

  return `
        <article class="file-card">
          <a class="preview" href="${url}" target="_blank" rel="noopener">${preview}</a>
          <div class="file-meta">
            <div class="file-name" title="${name}">${name}</div>
            <div class="file-details"><span>${extension}</span><span>${size}</span></div>
            <a class="open-link" href="${url}" target="_blank" rel="noopener">Open file ↗</a>
          </div>
        </article>`;
}

function renderSection(title, note, items) {
  const cards = items.length > 0
    ? items.map(renderFileCard).join('\n')
    : '<div class="empty-state">No files are available in this section yet.</div>';

  return `
    <section class="asset-section">
      <div class="section-heading">
        <div>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(note)}</p>
        </div>
        <span>${items.length} ${items.length === 1 ? 'file' : 'files'}</span>
      </div>
      <div class="file-grid">${cards}
      </div>
    </section>`;
}

function renderProductPage(product) {
  const title = escapeHtml(product.name);
  const slug = escapeHtml(product.slug);
  const githubUrl = `https://github.com/licat233/product-assets/tree/main/products/${encodePathSegment(product.slug)}`;
  const total = product.documents.length + product.media.length;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <title>${title} · Product Assets</title>
  <link rel="stylesheet" href="/browser.css" />
</head>
<body>
  <header class="topbar">
    <a class="brand" href="/">Product Assets</a>
    <a class="repo-link" href="${githubUrl}" target="_blank" rel="noopener">Source package on GitHub ↗</a>
  </header>
  <main class="shell">
    <nav class="breadcrumb"><a href="/">Products</a><span>/</span><span>${slug}</span></nav>
    <section class="page-heading">
      <div>
        <p class="eyebrow">Product</p>
        <h1>${title}</h1>
        <p class="slug">${slug}</p>
      </div>
      <div class="count-badge">${total} public ${total === 1 ? 'file' : 'files'}</div>
    </section>
    <p class="scope-note">This browser exposes original source documents from <code>docs/</code> and authoritative visual references from <code>images/</code> so ChatGPT and other approved tools can retrieve binary evidence directly. Product metadata files remain available from GitHub only.</p>
    ${renderSection('Source documents', 'Manuals, datasheets, drawings and other original evidence.', product.documents)}
    ${renderSection('Visual references', 'Authoritative product images and reference videos.', product.media)}
  </main>
</body>
</html>`;
}

function renderProductCard(product) {
  const title = escapeHtml(product.name);
  const slug = escapeHtml(product.slug);
  const href = `/products/${encodePathSegment(product.slug)}/`;
  const cover = preferredCover(product.media);
  const total = product.documents.length + product.media.length;
  const preview = cover
    ? `<img src="${escapeHtml(cover.url)}" alt="${title}" loading="lazy" />`
    : '<div class="folder-icon" aria-hidden="true">▱</div>';

  return `
      <a class="product-card" href="${href}" data-search="${escapeHtml(`${product.name} ${product.slug}`.toLowerCase())}">
        <div class="product-preview">${preview}</div>
        <div class="product-info">
          <h2>${title}</h2>
          <p>${slug}</p>
          <span>${product.documents.length} docs · ${product.media.length} media · ${total} total</span>
        </div>
      </a>`;
}

function renderIndex(products) {
  const productCards = products.length > 0
    ? products.map(renderProductCard).join('\n')
    : '<div class="empty-state">No products have been published yet.</div>';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <title>Product Assets</title>
  <link rel="stylesheet" href="/browser.css" />
</head>
<body>
  <header class="topbar">
    <div class="brand">Product Assets</div>
    <a class="repo-link" href="https://github.com/licat233/product-assets" target="_blank" rel="noopener">GitHub repository ↗</a>
  </header>
  <main class="shell">
    <section class="page-heading home-heading">
      <div>
        <p class="eyebrow">Asset browser</p>
        <h1>Products</h1>
        <p class="intro">Browse source documents and authoritative visual references published from the product source repository.</p>
      </div>
      <div class="count-badge">${products.length} ${products.length === 1 ? 'product' : 'products'}</div>
    </section>
    <div class="toolbar">
      <label class="search-box">
        <span>Search</span>
        <input id="product-search" type="search" placeholder="Product name or slug" autocomplete="off" />
      </label>
    </div>
    <section id="product-grid" class="product-grid">${productCards}
    </section>
    <p id="search-empty" class="empty-state hidden">No matching products.</p>
  </main>
  <script>
    const input = document.getElementById('product-search');
    const cards = [...document.querySelectorAll('.product-card')];
    const empty = document.getElementById('search-empty');
    input?.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      let visible = 0;
      for (const card of cards) {
        const match = !query || card.dataset.search.includes(query);
        card.hidden = !match;
        if (match) visible += 1;
      }
      empty?.classList.toggle('hidden', visible !== 0 || !query);
    });
  </script>
</body>
</html>`;
}

fs.mkdirSync(path.join(distRoot, 'products'), { recursive: true });

const products = fs.existsSync(productsRoot)
  ? fs.readdirSync(productsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => {
        const productDir = path.join(productsRoot, entry.name);
        return {
          slug: entry.name,
          name: readProductName(productDir, entry.name),
          productDir,
          documents: collectFiles(entry.name, productDir, 'docs'),
          media: collectFiles(entry.name, productDir, 'images'),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'en'))
  : [];

for (const product of products) {
  const productDist = path.join(distRoot, 'products', product.slug);
  fs.mkdirSync(productDist, { recursive: true });

  for (const folder of ['docs', 'images']) {
    const items = folder === 'docs' ? product.documents : product.media;
    const targetDir = path.join(productDist, folder);
    fs.mkdirSync(targetDir, { recursive: true });
    for (const item of items) {
      fs.copyFileSync(item.sourcePath, path.join(targetDir, item.name));
    }
  }

  fs.writeFileSync(path.join(productDist, 'index.html'), renderProductPage(product), 'utf8');
}

fs.writeFileSync(path.join(distRoot, 'index.html'), renderIndex(products), 'utf8');
fs.writeFileSync(
  path.join(distRoot, 'catalog.json'),
  JSON.stringify({
    products: products.map((product) => ({
      slug: product.slug,
      name: product.name,
      url: `/products/${encodePathSegment(product.slug)}/`,
      documents: product.documents.map((item) => ({
        name: item.name,
        type: item.type,
        size: item.size,
        url: item.url,
      })),
      media: product.media.map((item) => ({
        name: item.name,
        type: item.type,
        size: item.size,
        url: item.url,
      })),
    })),
  }, null, 2),
  'utf8',
);

console.log(`Generated asset browser for ${products.length} product(s).`);
