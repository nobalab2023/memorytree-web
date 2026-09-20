// configure-pages supplies the actual URL for both project Pages and a custom domain.
const requestedUrl = process.env.SITE_URL || 'https://memorytree-web.com';
const parsed = new URL(requestedUrl);
if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash) {
  throw new Error('SITE_URL must be a public HTTPS origin with an optional path.');
}
export const basePath = parsed.pathname.replace(/\/$/, '');
if (!/^(\/[a-zA-Z0-9_-]+)*$/.test(basePath)) throw new Error('Unsupported SITE_URL path');
export const siteUrl = parsed.origin + basePath;
export const route = (lang, name = '') => {
  const segments = [lang === 'ko' ? '' : lang, name].filter(Boolean);
  return segments.length ? `/${segments.join('/')}/` : '/';
};
export function localUrl(path) {
  // Static source policy links use clean paths, while assets retain file extensions.
  const directoryPath = path.endsWith('/') || /\.[a-z0-9]+$/i.test(path) ? path : path + '/';
  return basePath + directoryPath;
}
