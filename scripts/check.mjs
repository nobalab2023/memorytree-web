import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { content } from '../src/content.mjs';
import { pages } from '../src/pages.mjs';
import { route, siteUrl, basePath } from './site-config.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = resolve(root, 'dist');
const domain = siteUrl;
const config = JSON.parse(await readFile(resolve(root, 'firebase.json'), 'utf8'));
assert.deepEqual(Object.keys(config), ['hosting'], 'Configuration must be Hosting only');
assert.equal(config.hosting.public, 'dist');
assert.equal(config.hosting.cleanUrls, true);
assert.equal(config.hosting.rewrites, undefined, 'No SPA fallback hiding missing policy routes');
const expectedSections = { privacy: 8, 'delete-account': 5, support: 3 };
const paths = [];
for (const lang of ['ko', 'en', 'ja']) {
  assert.equal(content[lang].nav.length, 4);
  assert.ok(content[lang].company.includes('2023'));
  assert.deepEqual(Object.keys(pages[lang]), Object.keys(expectedSections));
  for (const [name, count] of Object.entries(expectedSections)) assert.equal(pages[lang][name].sections.length, count, `${lang}/${name}: section parity`);
  for (const name of ['', 'privacy', 'delete-account', 'support']) {
    const path = route(lang, name);
    paths.push(path);
    const file = resolve(dist, path.slice(1), 'index.html');
    const html = await readFile(file, 'utf8');
    assert.ok(html.startsWith('<!doctype html>'));
    assert.ok(html.includes(`<html lang="${lang}">`));
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="${domain}${path}"`));
    assert.equal((html.match(/hreflang="x-default"/g) || []).length, 1);
    assert.ok(html.includes('content="index, follow"'));
    assert.ok(html.includes('name="description"'));
    assert.ok(html.includes('rel="icon"'));
    assert.ok(html.includes('http-equiv="Content-Security-Policy"'));
    assert.ok(html.includes('mailto:memorytree.support@gmail.com'));
    assert.ok(!/<script|<form|<iframe/i.test(html), `${path}: public static page must not include form, tracker or backend`);
    assert.ok(!/TODO|lorem ipsum|YOUR_/i.test(html), `${path}: no placeholders in public content`);
    for (const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
      const url = match[1];
      if (url.startsWith('/')) {
        assert.ok(url.startsWith(basePath + '/'), `Missing project base path: ${url}`);
        const stripped = url.slice(basePath.length + 1);
        const local = extname(stripped) ? stripped : stripped + 'index.html';
        assert.ok((await stat(resolve(dist, local))).isFile(), `Missing asset/link: ${url}`);
      } else {
        assert.ok(url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('data:image/svg+xml,'), `Unexpected URL ${url}`);
      }
    }
    for (const match of html.matchAll(/href="mailto:([^"]+)"/g)) {
      const mail = new URL('mailto:' + match[1].replaceAll('&amp;', '&'));
      assert.equal(mail.pathname, 'memorytree.support@gmail.com');
      if (mail.search) assert.ok(mail.searchParams.get('subject'));
    }
  }
}
// Only the support mailbox may occur anywhere in the public website.
async function audit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await audit(path);
    else if (['.html', '.css', '.txt', '.xml'].includes(extname(path))) {
      const text = await readFile(path, 'utf8');
      const addresses = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
      assert.ok(addresses.every(value => value === 'memorytree.support@gmail.com'), 'Non-public email found (value suppressed)');
      assert.ok(!/AIza[\w-]{20,}|-----BEGIN .*PRIVATE KEY|firebaseConfig|client_secret|access_token|refresh_token|serviceAccountKey/i.test(text), 'Sensitive configuration found (value suppressed)');
    }
  }
}
await audit(dist);
await stat(resolve(dist, '.nojekyll'));
assert.equal(await readFile(resolve(dist, 'CNAME'), 'utf8'), 'memorytree-web.com\n');
for (const obsolete of ['privacy.html', 'delete-account.html', 'support.html', 'en.html', 'ja.html']) {
  await assert.rejects(stat(resolve(dist, obsolete)), { code: 'ENOENT' });
}
const robots = await readFile(resolve(dist, 'robots.txt'), 'utf8');
assert.ok(robots.includes('Allow: /'));
assert.ok(!robots.includes('Disallow: /'));
const sitemap = await readFile(resolve(dist, 'sitemap.xml'), 'utf8');
for (const path of paths) assert.ok(sitemap.includes(`<loc>${domain}${path}</loc>`));
console.log(`PASS: ${paths.length} directory-index routes at ${siteUrl}; links/assets; language parity; SEO/CSP; public-email audit; CNAME/.nojekyll.`);
