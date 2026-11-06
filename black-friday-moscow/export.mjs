import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const project = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(project, 'dist');
const mime = { '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
async function dataUrl(relative) {
  const data = await readFile(path.join(dist, relative));
  return `data:${mime[path.extname(relative)]};base64,${data.toString('base64')}`;
}
let html = await readFile(path.join(dist, 'index.html'), 'utf8');
html = html.replace(/\s*<link rel="preload"[^>]+>/g, '');
for (const name of ['brand.css', 'styles.css', 'campaign.css']) {
  let css = await readFile(path.join(dist, name), 'utf8');
  for (const match of [...css.matchAll(/url\('([^']+)'\)/g)]) css = css.replace(match[0], `url('${await dataUrl(match[1])}')`);
  html = html.replace(`<link rel="stylesheet" href="${name}">`, `<style>\n${css}\n</style>`);
}
html = html.replace('<script src="app.js" defer></script>', '');
html = html.replace('</body>', `<script>\n${await readFile(path.join(dist, 'app.js'), 'utf8')}\n</script>\n</body>`);
for (const match of [...html.matchAll(/(?:src|href)="(assets\/[^"<>]+)"/g)]) html = html.replaceAll(match[1], await dataUrl(match[1]));
const output = path.join(project, 'gorbilet-black-friday-moscow.html');
await writeFile(output, html, 'utf8');
await writeFile(path.join(dist, 'landing.html'), html, 'utf8');
await writeFile(path.join(project, '..', 'landing.html'), html, 'utf8');
const pages = path.join(project, '..', 'docs');
await mkdir(pages, { recursive: true });
await writeFile(path.join(pages, 'index.html'), html, 'utf8');
console.log(output);
