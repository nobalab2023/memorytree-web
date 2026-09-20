# Memory Tree official website

NOVA LAB · Established 2023. Public support: `memorytree.support@gmail.com`.

Standalone static website, separate from the Flutter app and Firebase backend.
Repository: https://github.com/nobalab2023/memorytree-web
Default Pages URL: https://nobalab2023.github.io/memorytree-web/
Planned domain: https://memorytree-web.com (DNS connection is a separate step).

No login, analytics, tracking cookies, form submission, backend connection, or
browser JavaScript. No packages need installation; Node.js 20+ runs local tooling.
Never put review accounts, passwords, client configs, or credentials in this repo.

## Files

```text
.github/workflows/deploy-pages.yml  # Build/check/deploy ONLY dist
src/content.mjs                    # ko/en/ja home and shared labels
src/pages.mjs                      # ko/en/ja privacy, deletion, support
scripts/build.mjs                  # Static generation, no network
scripts/site-config.mjs            # Root-domain and project-path URLs
scripts/check.mjs                  # Routes, assets, metadata, content checks
scripts/serve.mjs                  # Local directory-index preview
dist/
  index.html
  privacy/index.html
  delete-account/index.html
  support/index.html
  en/index.html                   # Equivalent en/*/index.html policy pages
  ja/index.html                   # Equivalent ja/*/index.html policy pages
  assets/site.css
  assets/memory-tree.png
  404.html
  robots.txt
  sitemap.xml
  CNAME
  .nojekyll
firebase.json                     # Optional/inactive; NOT used by GitHub Pages
```

Directory indexes preserve direct /privacy, /delete-account, and /support access.
GitHub redirects them to trailing-slash paths and serves the requested document,
not a JavaScript SPA fallback. Fonts use the system; tree artwork is an unchanged
existing Memory Tree brand illustration, not a current app screenshot.

## Local preview

```powershell
cd C:\memory_tree\memory_tree_web
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4173/ and stop with Ctrl+C. Rebuild/refresh after source edits.
`dist/assets` is authored content; do not delete dist as a cleanup step.

To check the default GitHub project path before domain connection:

```powershell
$env:SITE_URL = 'https://nobalab2023.github.io/memorytree-web'
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4173/memorytree-web/. After stopping, restore root output:

```powershell
Remove-Item Env:SITE_URL -ErrorAction SilentlyContinue
npm run build
npm run check
```

## GitHub Pages configuration

1. In this website repository, open **Settings → Pages**.
2. Select **Build and deployment → Source → GitHub Actions**.
3. Push to this website's main branch or run **Actions → Deploy Memory Tree
   website → Run workflow**. This is NOT the Flutter repository's main branch.
4. The workflow reads configure-pages' actual base_url: links use /memorytree-web/
   on the default domain, and root paths after a custom domain is configured.
5. Wait for the deploy job and verify the published URL. Only dist is published
   to Pages; source/docs remain visible in the public GitHub repository.

Official Actions are commit-pinned. Build permissions are contents:read; the
deploy job alone gets pages:write and id-token:write. No PAT, Firebase credential,
or Firebase command is used by the workflow.

dist/CNAME contains memorytree-web.com and .nojekyll is prepared. **GitHub ignores
CNAME for domain configuration when using custom Actions deployments.** Set the
domain in Settings → Pages when ready. Pushing CNAME does not change DNS.

## Custom domain / DNS — instructions, not executed

Confirm ownership and preserve unrelated MX/TXT records used for email.

1. Recommended: GitHub account **Settings → Pages → Add a domain** lets you verify
   memorytree-web.com using GitHub's exact TXT record. Do not guess that value.
   Keep the verification record after verification.
2. Repository **Settings → Pages → Custom domain**: enter memorytree-web.com
   before pointing DNS to Pages.
3. When the owner approves DNS changes, set the apex records:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Alternatively use ALIAS/ANAME to nobalab2023.github.io if supported at the apex.
Do not use a normal apex CNAME that conflicts with mail. Optional www CNAME points
to nobalab2023.github.io, without a URL scheme or repository path. Check conflicting
old web A/AAAA records; do not change unrelated records or create wildcard records.

4. Rerun the Pages workflow after setting the domain to rebuild root links and SEO.
5. Wait for successful DNS validation and GitHub-managed certificate issuance.
   Enable **Enforce HTTPS** under Pages when available (can take up to 24 hours).
6. Verify HTTPS and direct policy routes from a private window and another network.
   Then use https://memorytree-web.com/privacy/ and
   https://memorytree-web.com/delete-account/ in Google Play Console.

Until these checks succeed, custom-domain URLs are planned, not verified live.
Saving the custom domain can redirect the github.io URL to it; it is intentionally
left unset until the DNS transition is ready.

## Privacy and security notes

- Review policy text against launch countries, the final shipped app, Data safety
  answers, and actual retention operations. This is not legal advice or a guarantee
  of Play approval. Add confirmed legal/operator/transfer details where required.
- Owner-approved email deletion processing target: 30 days after verification,
  with delay notices when necessary. It is an operational commitment, not a claim
  that an automatic deletion job meets that target. Confirm support can deliver it.
- Confirm the support mailbox is monitored and ko/en/ja requests can be handled.
- Original photo EXIF may remain in backup; display/thumb metadata is distinguished.
  Optional diagnostics are not described as universally anonymous.
- Policy update: 2026-09-21; NOVA LAB establishment: 2023.
- HTML includes CSP/referrer metadata. Pages does NOT apply firebase.json headers.
  Header-only controls such as X-Frame-Options, frame-ancestors, and
  Permissions-Policy are not enabled by this file on Pages. This site has no
  authenticated or state-changing web actions. HTTPS is controlled by Pages.
- firebase.json remains an unused optional static Hosting config. No backend
  configuration, deployment, DNS, or user data operations run from this repo.

## Official references

- [Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Domains / DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Google Play account deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en)
- [Firebase privacy](https://firebase.google.com/support/privacy)
