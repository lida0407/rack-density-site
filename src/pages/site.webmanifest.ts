// /site.webmanifest: name, icons and colours. Theme and background = --bg-000 from src/styles/tokens.css (the dark base,
// same as <meta name="theme-color">). Icons from scripts/icons.mjs.
import { readFileSync } from 'node:fs';
import { BRAND } from '../config/brand';
import { ENTITY } from '../config/entity';
import { u } from '../lib/url';
export function GET() {
  const bg = readFileSync('src/styles/tokens.css', 'utf8').match(/--bg-000:\s*(#[0-9a-f]{6})/i)?.[1] ?? '#0b0a09';
  const manifest = {
    name: BRAND, short_name: BRAND, description: ENTITY.rackdensity, lang: 'en', dir: 'ltr',
    start_url: u('/'), scope: u('/'), display: 'browser', background_color: bg, theme_color: bg,
    icons: [
      { src: u('/icon-192.png'), sizes: '192x192', type: 'image/png' },
      { src: u('/icon-512.png'), sizes: '512x512', type: 'image/png' },
      { src: u('/apple-touch-icon.png'), sizes: '180x180', type: 'image/png' },
    ],
  };
  return new Response(JSON.stringify(manifest, null, 2) + '\n', { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } });
}
