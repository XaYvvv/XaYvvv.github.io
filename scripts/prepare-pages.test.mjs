import assert from 'node:assert/strict';
import { mkdir, mkdtemp, open, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { preparePages } from './prepare-pages.mjs';

async function fixture(t, { html = '<h1 id="top">Home</h1>', assets = {}, pages = {} } = {}) {
  const base = path.resolve('work', 'pages-tests');
  await mkdir(base, { recursive: true });
  const root = await mkdtemp(path.join(base, 'export-'));
  t.after(async () => {
    if (!root.startsWith(base + path.sep)) throw new Error('Unsafe fixture cleanup path');
    await rm(root, { recursive: true, force: true });
  });
  const put = async (relative, content) => {
    const file = path.join(root, relative);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, content);
  };
  await mkdir(path.join(root, 'public'), { recursive: true });
  await put('out/index.html', html);
  for (const [name, content] of Object.entries(pages)) await put('out/' + name, content);
  for (const [name, content] of Object.entries(assets)) {
    await put('public/' + name, content);
    await put('out/' + name, content);
  }
  return { root, put, read: relative => readFile(path.join(root, relative), 'utf8') };
}

test('keeps deferred media and font licenses while pruning only unused export copies', async t => {
  const { root, read } = await fixture(t, {
    html: '<link href="/style.css" rel="stylesheet"><video data-src="/clip.mp4" poster="/poster.webp"></video>',
    assets: {
      'style.css': '@font-face{src:url("/fonts/body.woff2")}',
      'fonts/body.woff2': 'font', 'fonts/LICENSES.txt': 'license',
      'clip.mp4': 'video', 'poster.webp': 'poster', 'withdrawn.png': 'private source',
    },
  });
  await preparePages(root);
  assert.deepEqual(JSON.parse(await read('.pages-assets.json')), [
    '/clip.mp4', '/fonts/LICENSES.txt', '/fonts/body.woff2', '/poster.webp', '/style.css',
  ]);
  await assert.rejects(stat(path.join(root, 'out/withdrawn.png')), { code: 'ENOENT' });
  assert.equal(await read('public/withdrawn.png'), 'private source');
  assert.equal(await read('out/CNAME'), 'xiangyv.me\n');
});

test('retains same-origin absolute and protocol-relative assets', async t => {
  const { root, read } = await fixture(t, {
    html: '<img src="https://xiangyv.me/photo.webp?v=1"><video data-src="//xiangyv.me/clip.mp4"></video>',
    assets: { 'photo.webp': 'photo', 'clip.mp4': 'video' },
  });
  await preparePages(root);
  assert.deepEqual(JSON.parse(await read('.pages-assets.json')), ['/clip.mp4', '/photo.webp']);
  assert.equal(await read('out/photo.webp'), 'photo');
});

test('rejects missing same-origin absolute links', async t => {
  const { root } = await fixture(t, { html: '<a href="https://xiangyv.me/missing/">Missing</a>' });
  await assert.rejects(preparePages(root), /Broken internal links.*missing/s);
});

test('accepts existing local and cross-page anchors, queries, and encoded identifiers', async t => {
  const { root } = await fixture(t, {
    html: '<h1 id="intro">Home</h1><a href="#intro">Intro</a><a href="/project/?a=1&amp;b=2#%E6%9C%BA%E6%9E%84">Project</a>',
    pages: { 'project/index.html': '<section id="机构">Mechanism</section><a href="/#intro">Back</a>' },
  });
  await preparePages(root);
});

test('rejects missing in-page anchors with their source page', async t => {
  const { root } = await fixture(t, { html: '<a href="#removed-section">Section</a>' });
  await assert.rejects(preparePages(root), /index\.html.*removed-section/s);
});

test('rejects missing cross-page anchors', async t => {
  const { root } = await fixture(t, {
    html: '<a href="/project/#removed-section">Project</a>',
    pages: { 'project/index.html': '<h1 id="overview">Project</h1>' },
  });
  await assert.rejects(preparePages(root), /project\/.*removed-section/s);
});

test('retains every srcset candidate and decodes HTML entities in filenames', async t => {
  const { root, read } = await fixture(t, {
    html: '<img src="/small.webp" srcset="/small.webp 1x, /large.webp 2x"><img src="/a&amp;b.webp">',
    assets: { 'small.webp': 'small', 'large.webp': 'large', 'a&b.webp': 'ampersand' },
  });
  await preparePages(root);
  assert.deepEqual(JSON.parse(await read('.pages-assets.json')), ['/a&b.webp', '/large.webp', '/small.webp']);
});

test('ignores external links, mail, inline images, and text-fragment navigation', async t => {
  const { root } = await fixture(t, {
    html: '<a href="https://example.com/missing/#missing">External</a><a href="mailto:me@example.com">Email</a><img src="data:image/png;base64,AAAA"><a href="#:~:text=Home">Find</a><a href="#">Top</a>',
  });
  await preparePages(root);
});

test('checks CSS references relative to the stylesheet and reports missing resources', async t => {
  const { root } = await fixture(t, {
    html: '<link href="/css/style.css" rel="stylesheet">',
    assets: { 'css/style.css': 'body{background:url(../missing.webp)}' },
  });
  await assert.rejects(preparePages(root), /Broken internal links.*missing\.webp/s);
});

test('failed validation leaves source allowlists and exported assets unchanged', async t => {
  const { root, put, read } = await fixture(t, {
    html: '<img src="/missing.webp">', assets: { 'withdrawn.webp': 'source' },
  });
  await put('public/.gitignore', 'existing allowlist\n');
  await put('.pages-assets.json', '["/previous.webp"]\n');
  await assert.rejects(preparePages(root), /Broken internal links/);
  assert.equal(await read('public/.gitignore'), 'existing allowlist\n');
  assert.equal(await read('.pages-assets.json'), '["/previous.webp"]\n');
  assert.equal(await read('out/withdrawn.webp'), 'source');
});

test('size validation fails before pruning or changing source allowlists', async t => {
  const { root, put, read } = await fixture(t, { assets: { 'withdrawn.webp': 'source' } });
  await put('public/.gitignore', 'existing allowlist\n');
  const large = await open(path.join(root, 'out/oversized.bin'), 'w');
  try { await large.truncate(100 * 1024 ** 2); } finally { await large.close(); }
  await assert.rejects(preparePages(root), /100 MiB/);
  assert.equal(await read('public/.gitignore'), 'existing allowlist\n');
  assert.equal(await read('out/withdrawn.webp'), 'source');
});


test('blocks referenced private documents before updating the allowlist', async t => {
  const { root, put, read } = await fixture(t, {
    html: '<a href="/private.pdf">File</a>', assets: { 'private.pdf': 'private source' },
  });
  await put('public/.gitignore', 'existing allowlist\n');
  await assert.rejects(preparePages(root), /Private or source file in export/);
  assert.equal(await read('public/.gitignore'), 'existing allowlist\n');
});

test('blocks source maps and embedded local paths', async t => {
  const first = await fixture(t);
  await first.put('out/_next/static/app.js.map', '{}');
  await assert.rejects(preparePages(first.root), /Private or source file in export/);
  const second = await fixture(t, { html: '<p>/Users/example/private/report</p>' });
  await assert.rejects(preparePages(second.root), /Credential or local path in export/);
});
