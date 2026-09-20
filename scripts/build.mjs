import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { content } from '../src/content.mjs';
import { pages } from '../src/pages.mjs';
import { route, siteUrl, localUrl } from './site-config.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = resolve(root, 'dist');
const origin = siteUrl;
const email = 'memorytree.support@gmail.com';
const locales = ['ko', 'en', 'ja'];
const routeNames = ['', 'privacy', 'delete-account', 'support'];
const esc = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const favicon = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="10" fill="#264c3b"/><path d="M9 20C7 10 17 7 24 8C25 18 17 25 9 20Z" fill="#e1eebd"/><path d="M9 25L20 13" stroke="#e1eebd" stroke-width="2"/></svg>');

function shell(lang, name, title, description, body) {
  const t = content[lang];
  const current = route(lang, name);
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${esc(description)}">
  <meta name="theme-color" content="#264c3b">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self' data:; style-src 'self'; font-src 'self'; connect-src 'none'; script-src 'none'; base-uri 'none'; form-action 'none'">
  <meta name="robots" content="index, follow">
  <title>${esc(title)}</title>
  <link rel="canonical" href="${origin}${current}">
  ${locales.map(l => `<link rel="alternate" hreflang="${l}" href="${origin}${route(l, name)}">`).join('\n  ')}
  <link rel="alternate" hreflang="x-default" href="${origin}${route('en', name)}">
  <link rel="icon" type="image/svg+xml" href="${favicon}">
  <link rel="stylesheet" href="/assets/site.css">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Memory Tree">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${origin}${current}">
</head>
<body>
  <a class="skip-link" href="#main">${t.skip}</a>
  <header class="site-header wrap">
    <a class="brand" href="${route(lang)}"><span class="brand-mark" aria-hidden="true">m.</span>Memory Tree</a>
    <nav class="main-nav" aria-label="${t.home}">${routeNames.map((n, i) => `<a href="${route(lang, n)}"${n === name ? ' aria-current="page"' : ''}>${t.nav[i]}</a>`).join('')}</nav>
    <nav class="languages" aria-label="${t.language}">${locales.map(l => `<a lang="${l}" hreflang="${l}" href="${route(l, name)}"${l === lang ? ' aria-current="true"' : ''}>${({ ko: '한국어', en: 'EN', ja: '日本語' })[l]}</a>`).join('')}</nav>
  </header>
  ${body.replace('id="main"', 'id="main" tabindex="-1"')}
  <footer class="site-footer wrap">
    <div><a class="footer-brand" href="${route(lang)}">Memory Tree</a><p>${t.footer}</p><small>${t.company}<br>© 2026 NOVA LAB</small></div>
    <div class="footer-links">${routeNames.slice(1).map((n, i) => `<a href="${route(lang, n)}">${t.nav[i + 1]}</a>`).join('')}</div>
    <div class="footer-contact"><span>${t.contactLabel}</span><a href="mailto:${email}">${email}</a></div>
  </footer>
</body>
</html>\n`.replace(/(href|src)="(\/[^\"]*)"/g, (_, attribute, path) => `${attribute}="${localUrl(path)}"`);
}

function home(lang) {
  const t = content[lang];
  return shell(lang, '', t.title, t.description, `<main id="main">
    <section class="hero wrap">
      <div class="hero-copy"><p class="eyebrow">${t.eyebrow}</p><h1>${t.headline}</h1><p class="intro">${t.intro}</p><p class="launch">${t.launch}</p><div class="hero-actions"><a class="button" href="#about">${t.learn}<span aria-hidden="true">↓</span></a><a class="text-link" href="${route(lang, 'support')}">${t.help}</a></div></div>
      <figure class="hero-art"><div class="art-backdrop"><img src="/assets/memory-tree.png" width="1254" height="1254" alt="${t.illustration}" fetchpriority="high"></div><figcaption>${t.illustration}</figcaption></figure>
    </section>
    <section class="about wrap" id="about"><p class="eyebrow">MEMORY TREE</p><h2>${t.detailsTitle}</h2><div class="features">${t.details.map(([title, copy], i) => `<article><span class="feature-number">0${i + 1}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></section>
    <div class="quiet-band"><p>${t.quiet}</p></div>
  </main>`);
}

await mkdir(out, { recursive: true });
for (const lang of locales) {
  const homeDirectory = resolve(out, route(lang).slice(1));
  await mkdir(homeDirectory, { recursive: true });
  await writeFile(resolve(homeDirectory, 'index.html'), home(lang));
  const t = content[lang];
  for (const [name, page] of Object.entries(pages[lang])) {
    const directory = resolve(out, route(lang, name).slice(1));
    await mkdir(directory, { recursive: true });
    const sections = page.sections.map(([heading, html], i) => `<section id="section-${i + 1}"><h2>${heading}</h2>${html}</section>`).join('\n');
    const body = `<main id="main" class="document wrap"><div class="document-heading"><p class="eyebrow">${t.legalIntro}</p><h1>${page.title}</h1><p class="document-lead">${page.intro}</p><p class="updated">${t.updated}</p></div><div class="document-body">${page.callout ?? ''}${sections}<a class="back-link" href="${route(lang)}">← ${t.back}</a></div></main>`;
    await writeFile(resolve(directory, 'index.html'), shell(lang, name, `${page.title} | Memory Tree`, page.description, body));
  }
}
await writeFile(resolve(out, '404.html'), shell('en', '', 'Page not found | Memory Tree', 'Return to the Memory Tree homepage.', `<main class="document wrap" id="main"><h1>${content.en.notFound}</h1><p>${content.en.notFoundText}</p><a class="button" href="/en">${content.en.back}</a></main>`).replace('content="index, follow"', 'content="noindex, follow"'));
await writeFile(resolve(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(resolve(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locales.flatMap(lang => routeNames.map(name => `  <url><loc>${origin}${route(lang, name)}</loc></url>`)).join('\n')}\n</urlset>\n`);
await writeFile(resolve(out, '.nojekyll'), '');
// Kept as a portable declaration. Actions deployments use the Pages setting instead.
await writeFile(resolve(out, 'CNAME'), 'memorytree-web.com\n');
console.log('Static pages generated in dist/ (no network calls).');
