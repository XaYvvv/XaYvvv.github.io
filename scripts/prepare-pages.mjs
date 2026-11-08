import { readdir, readFile, writeFile, stat, unlink } from 'node:fs/promises';
import path from 'node:path';

const siteOrigin = 'https://xiangyv.me';

function decodeHtml(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (entity, code) => {
    if (code.startsWith('#')) {
      const hex = code[1].toLowerCase() === 'x';
      return String.fromCodePoint(Number.parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10));
    }
    return { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' }[code.toLowerCase()] ?? entity;
  });
}

function* attributes(html) {
  // Next's exported HTML uses quoted attributes. Inspect tags, not serialized JS.
  for (const tag of html.matchAll(/<[^>]+>/g)) {
    for (const match of tag[0].matchAll(/\s([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
      yield [match[1].toLowerCase(), decodeHtml(match[2] ?? match[3])];
    }
  }
}

function* srcsetUrls(value) {
  let position = 0;
  while (position < value.length) {
    while (/[\s,]/.test(value[position] ?? '') && position < value.length) position++;
    const start = position;
    while (position < value.length && !/\s/.test(value[position])) position++;
    const url = value.slice(start, position);
    if (!url) break;
    yield url.replace(/,+$/, '');
    if (url.endsWith(',')) continue;
    // Commas inside data URLs belong to the URL; skip candidate descriptors here.
    let parentheses = 0;
    while (position < value.length) {
      const character = value[position++];
      if (character === '(') parentheses++;
      if (character === ')') parentheses--;
      if (character === ',' && parentheses === 0) break;
    }
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async entry => {
    const file = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Unexpected symlink: ${file}`);
    return entry.isDirectory() ? walk(file) : [file];
  }))).flat();
}

export async function preparePages(root) {
  const output = path.resolve(root, 'out');
  const publicRoot = path.resolve(root, 'public');
  const files = await walk(output);
  const htmlFiles = files.filter(file => file.endsWith('.html'));
  if (!htmlFiles.includes(path.join(output, 'index.html'))) throw new Error('Missing exported homepage');
  const publicFiles = await walk(publicRoot);
  const publicByUrl = new Map(publicFiles.map(file => ['/' + path.relative(publicRoot, file).split(path.sep).join('/'), file]));
  const used = new Set();
  const missing = new Set();
  const htmlAttributes = new Map();
  const anchors = new Map();
  for (const file of htmlFiles) {
    const entries = [...attributes(await readFile(file, 'utf8'))];
    htmlAttributes.set(file, entries);
    anchors.set(file, new Set(entries.filter(([name]) => name === 'id').map(([, value]) => value)));
  }

  async function checkLink(value, origin, source, checkFragment = false) {
    if (!value) return;
    const url = new URL(value, origin);
    if (url.origin !== siteOrigin) return;
    const pathname = decodeURIComponent(url.pathname);
    if (publicByUrl.has(pathname)) used.add(pathname);
    const target = path.resolve(output, '.' + pathname);
    if (!target.startsWith(output + path.sep) && target !== output) throw new Error('Path outside export');
    const candidates = [target, path.join(target, 'index.html'), target + '.html'];
    for (const candidate of candidates) {
      if (await stat(candidate).then(s => s.isFile()).catch(() => false)) {
        const fragment = decodeURIComponent(url.hash.slice(1).split(':~:')[0]);
        if (checkFragment && fragment && anchors.has(candidate) && !anchors.get(candidate).has(fragment)) {
          missing.add(`${source} -> ${pathname}#${fragment}`);
        }
        return;
      }
    }
    missing.add(`${source} -> ${pathname}`);
  }

  for (const file of htmlFiles) {
    const relative = path.relative(output, file).split(path.sep).join('/');
    const origin = siteOrigin + '/' + relative.replace(/index\.html$/, '');
    for (const [name, value] of htmlAttributes.get(file)) {
      if (['data-src', 'src', 'href', 'poster'].includes(name)) {
        await checkLink(value, origin, relative, name === 'href');
      } else if (name === 'srcset') {
        for (const url of srcsetUrls(value)) await checkLink(url, origin, relative);
      }
    }
  }
  for (const file of files.filter(file => file.endsWith('.css'))) {
    const css = await readFile(file, 'utf8');
    const relative = path.relative(output, file).split(path.sep).join('/');
    const origin = siteOrigin + '/' + relative;
    for (const match of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) await checkLink(match[1], origin, relative);
  }
  if (missing.size) throw new Error(`Broken internal links: ${[...missing].join(', ')}`);

  // Font redistribution must include the original copyright and OFL notices.
  if ([...used].some(url => url.startsWith('/fonts/'))) {
    await checkLink('/fonts/LICENSES.txt', siteOrigin, 'font license');
    if (missing.size) throw new Error('Missing font license notices');
  }

  const unused = new Set([...publicByUrl.keys()].filter(url => !used.has(url))
    .map(url => path.resolve(output, '.' + url)));
  // Fail closed if a private document, credential file or source map would ship.
  // This is checked after selecting used assets but before mutating the export.
  const publishable = files.filter(file => !unused.has(file));
  const forbidden = /(?:^|\/)(?:\.git|\.env[^/]*|\.vscode|node_modules|docs|work|tmp)(?:\/|$)|\.(?:map|pdf|pptx?|docx?|xlsx?|zip|7z|tar|gz|pem|key|p12|sqlite|db|bak|log)$/i;
  for (const file of publishable) {
    const relative = path.relative(output, file).split(path.sep).join('/');
    if (forbidden.test(relative)) throw new Error(`Private or source file in export: ${relative}`);
    if (/\.(?:html|js|css|json|txt|svg)$/.test(file)) {
      const content = await readFile(file, 'utf8');
      const sensitive = /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{60,})|AKIA[0-9A-Z]{16}|(?:\/Users\/|\/home\/)[A-Za-z0-9_.-]+\//;
      if (sensitive.test(content)) throw new Error(`Credential or local path in export: ${relative}`);
    }
  }
  const sizes = await Promise.all(publishable
    .map(async file => ({ file, size: (await stat(file)).size })));
  const oversized = sizes.filter(item => item.size >= 100 * 1024 ** 2);
  if (oversized.length) throw new Error(`Assets exceed GitHub's 100 MiB file limit: ${oversized.map(x => x.file).join(', ')}`);
  const total = sizes.reduce((sum, item) => sum + item.size, 0);
  if (total >= 1024 ** 3) throw new Error('Export exceeds GitHub Pages 1 GiB limit');

  // Remove only generated copies of unused local assets, never source files.
  // This keeps withdrawn posts, certificates and duplicate PPT extractions offline.
  for (const [url] of publicByUrl) {
    if (!used.has(url)) {
      const target = path.resolve(output, '.' + url);
      if (!target.startsWith(output + path.sep)) throw new Error('Unsafe generated asset path');
      await unlink(target).catch(error => { if (error.code !== 'ENOENT') throw error; });
    }
  }
  await writeFile(path.join(output, '.nojekyll'), '');
  await writeFile(path.join(output, 'CNAME'), 'xiangyv.me\n');
  await writeFile(path.join(root, '.pages-assets.json'), JSON.stringify([...used].sort(), null, 2) + '\n');
  // Only referenced public assets are eligible for a normal Git commit.
  // Rebuilding after adding an image refreshes this generated allowlist.
  const escapePattern = value => value.replace(/([\\*?\[\] ])/g, '\\$1');
  await writeFile(path.join(publicRoot, '.gitignore'), [
    '# Generated by pnpm build:pages. Unused source materials stay local.',
    '*', '!*/', '!.gitignore',
    ...[...used].sort().map(url => '!' + escapePattern(url)), '',
  ].join('\n'));

  console.log(`Pages ready: ${htmlFiles.length} HTML pages, ${used.size} referenced assets, ${(total / 1024 ** 2).toFixed(1)} MiB.`);
  console.log('Unused source assets remain local. The uploadable website is out/.');
}
