# Local website validation — 2026-09-21

## Completed

- `npm run build`: passed. Static pages generated without network calls.
- `npm run check`: passed for all 12 ko/en/ja page routes.
- JavaScript syntax checks: build, preview server, and policy content passed.
- HTTP: all 12 routes, robots.txt, and sitemap.xml returned 200 locally.
- Unknown URL returned 404 with a noindex response page, not the homepage.
- Browser inspection: homepage and policy/deletion/support pages render; language
  links retain the page being read. Desktop and 390px mobile checked. Additional
  320px samples (Korean home, English deletion, Japanese privacy) had no horizontal
  overflow. Images loaded successfully. Japanese wrapping was improved.
- Skip-to-content link is keyboard accessible. No browser console warnings/errors
  were observed during the final checks.
- Metadata: titles/descriptions, canonical URLs, language alternates, favicon,
  robots and sitemap present. Normal public pages use index/follow.
- No login, tracking scripts, form submissions, or remote SDKs are in the website.
- Public email audit: only the official support mailbox appears. The private
  reviewer account and Firebase credentials are not included.
- All three languages show NOVA LAB's founding year as 2023.
- Deletion copy reflects the approved 30-day processing target after verification;
  this is email support guidance, not a claim of an automated deletion service.

## Existing app preserved

The separate Flutter app repository remained clean and its HEAD was unchanged.
The existing firebase.json, firestore.rules and storage.rules hashes matched
before/after this task. The copied brand illustration matches the original
byte-for-byte. No Flutter code or app asset was modified.

During the initial local build, no Firebase/Google Cloud mutation,
Hosting/Functions/Rules deployment, Auth/data operation, billing action,
DNS change, commit, or push was performed. No cloud
state audit was attempted; these checks do not certify the live app backend.

## Still requires approval / external validation

- Final legal/privacy and operational review before publishing (see README).
- Actual support-mailbox delivery/replies and manual deletion operations.
- Custom-domain ownership/DNS and HTTPS certificate checks.
- Google Play policy/Data safety review, including the app-side deletion path.
- No claim is made that memorytree-web.com is live or verified by this task.

Preview was served only at 127.0.0.1:4173. Use the README commands to start or
restart it; the local preview is not a public Google Play policy URL.

## GitHub Pages preparation

The owner approved a separate public website repository and push to GitHub.
The hosting target is GitHub Pages, not Firebase Hosting. Directory-index
routes, project-path-aware links, CNAME/.nojekyll, HTML CSP/referrer metadata,
and a commit-pinned official Actions workflow are prepared. All source/docs
must pass a publication audit as well as the generated-site check.

Preparation checks passed for both the custom-domain root and default GitHub
project path. All 12 project-path routes returned 200 after normal directory
redirects, and CSS/image links rendered correctly. The browser reported no
CSP warnings/errors. A pre-publication audit covered all 32 prospective source,
documentation, workflow, and output files: only the support mailbox appeared,
no credential-like values were found, and the local helper directory was excluded.
The commit author uses GitHub's no-reply address rather than a personal mailbox.

See GitHub Actions for the actual deployment status of each commit. Custom-domain
DNS remains a separately approved step; CNAME does not configure DNS or the
custom-domain setting when using Actions.
