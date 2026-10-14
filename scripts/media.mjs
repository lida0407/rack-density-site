// Copy the dev agents' hero recordings into the site (marketing/SITE-THEME-VIDEO.md §2).
//   node scripts/media.mjs [srcDir]   (default ~/Sensaka/share/shots/video)
// hero-<edition>-<dark|bright>.webm/.mp4 → public/<edition>/media/, .jpg poster → src/assets/video/ (optimised by Astro).
// Interactive hero (HERO-INTERACTIVE.md): state-<edition>-<view>-<on|off>.* and state-<edition>-power-fail-<on|off>.*, same routing.
// Checks the spec limits (hero WebM ≤ 8 MB / MP4 ≤ 12 MB; state WebM ≤ 1.5 MB / MP4 ≤ 2.5 MB; no audio track) and strips audio if present. Homelab only by default;
// pass --all to copy DC files too (DC marketing owns /dc/).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const all = args.includes('--all');
const src = args.find((a) => !a.startsWith('--')) ?? path.join(os.homedir(), 'Sensaka/share/shots/video');
const editions = all ? ['homelab', 'dc'] : ['homelab'];
const LIMIT = { webm: 8e6, mp4: 12e6 }, STATE = { webm: 1.5e6, mp4: 2.5e6, jpg: 150e3 };
const probe = (f, q) => { try { return execFileSync('ffprobe', ['-v', 'error', ...q, '-of', 'csv=p=0', f]).toString().trim(); } catch { return ''; } };
let n = 0, bad = 0;
const bases = editions.flatMap((ed) => [
  ...['dark', 'bright'].map((m) => [ed, `hero-${ed}-${m}`, LIMIT, [20, 35]]),
  ...[...new Set((fs.existsSync(src) ? fs.readdirSync(src) : []).filter((f) => f.startsWith(`state-${ed}-`)).map((f) => f.replace(/\.[a-z0-9]+$/, '')))]
    .map((b) => [ed, b, STATE, [5.5, 9]]),
]);
for (const [ed, base, lim, [dmin, dmax]] of bases) {
  for (const ext of ['webm', 'mp4', 'jpg']) {
    const from = path.join(src, `${base}.${ext}`);
    if (!fs.existsSync(from)) continue;
    const to = ext === 'jpg' ? path.join('src/assets/video', `${base}.jpg`) : path.join('public', ed, 'media', `${base}.${ext}`);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    const size = fs.statSync(from).size;
    if (ext === 'jpg' && lim.jpg && size > lim.jpg) console.warn(`! ${base}.jpg is ${(size / 1e3).toFixed(0)} KB (spec ≤ ${lim.jpg / 1e3} KB; Astro re-encodes it anyway)`);
    if (ext !== 'jpg') {
      if (size > lim[ext]) { console.error(`✗ ${base}.${ext} is ${(size / 1e6).toFixed(2)} MB (limit ${lim[ext] / 1e6} MB) — ask the dev agent for a smaller encode`); bad++; continue; }
      if (probe(from, ['-select_streams', 'a', '-show_entries', 'stream=index'])) {
        execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', from, '-an', '-c', 'copy', to]);
        console.log(`✓ ${to} (audio stripped)`); n++; continue;
      }
      const dur = Number(probe(from, ['-show_entries', 'format=duration']));
      if (dur && (dur < dmin || dur > dmax)) console.warn(`! ${base}.${ext} is ${dur.toFixed(1)} s (expected ${dmin}–${dmax} s)`);
    }
    fs.copyFileSync(from, to);
    console.log(`✓ ${to} (${(size / 1e6).toFixed(2)} MB)`); n++;
  }
}
console.log(n ? `${n} file(s) copied from ${src}` : `No hero recordings in ${src} yet — the hero keeps its stills.`);
process.exit(bad ? 1 : 0);
