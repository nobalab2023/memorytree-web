import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { basePath } from './site-config.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8' };
const server = createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    const requestUrl = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(requestUrl.pathname);
    if (pathname.includes('\0') || pathname.split(/[\\/]/).some(p => p.startsWith('.'))) { res.writeHead(400); res.end(); return; }
    if (basePath && pathname !== basePath && !pathname.startsWith(basePath + '/')) { res.writeHead(404); res.end('Not found'); return; }
    const localPath = pathname.slice(basePath.length) || '/';
    const relative = localPath.slice(1);
    let file = resolve(root, relative);
    const safeRoot = root.endsWith(sep) ? root : root + sep;
    if (file !== resolve(root) && !file.startsWith(safeRoot)) { res.writeHead(403); res.end(); return; }
    if (!extname(relative)) {
      let isDirectory = false;
      try { isDirectory = (await stat(file)).isDirectory(); } catch {}
      if (isDirectory && !pathname.endsWith('/')) {
        res.writeHead(301, { Location: encodeURI(pathname) + '/' + requestUrl.search }); res.end(); return;
      }
      file = resolve(file, 'index.html');
    }
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(403); res.end(); return; }
    let status = 200;
    try { if (!(await stat(file)).isFile()) throw new Error('Not a file'); }
    catch { file = resolve(root, '404.html'); status = 404; }
    const body = await readFile(file);
    res.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(400); res.end('Bad request'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Memory Tree local preview: http://127.0.0.1:${port}${basePath}/`));
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
