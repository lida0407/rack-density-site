// Copy the dev agents' hero recordings into the site (marketing/SITE-THEME-VIDEO.md §2).
//   node scripts/media.mjs [srcDir]   (default ~/Sensaka/share/shots/video)
// hero-<edition>-<dark|bright>.webm/.mp4 → public/<edition>/media/, .jpg poster → src/assets/video/ (optimised by Astro).
// Checks the spec limits (WebM ≤ 8 MB, MP4 ≤ 12 MB, no audio track) and strips audio if present. Homelab only by default;
// pass --all to copy DC files too (DC marketing owns /dc/).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const all = args.includes('--all');
const src = args.find((a) => !a.startsWith('--')) ?? path.join(os.homedir(), 'Sensaka/share/shots/video');
const editions = all ? ['homelab', 'dc'] : ['homelab'];
const LIMIT = { webm: 8e6, mp4: 12e6 };
const probe = (f, q) => { try { return execFileSync('ffprobe', ['-v', 'error', ...q, '-of', 'csv=p=0', f]).toString().trim(); } catch { return ''; } };
let n = 0, bad = 0;
for (const ed of editions) for (const mode of ['dark', 'bright']) {
  const base = `hero-${ed}-${mode}`;
  for (const ext of ['webm', 'mp4', 'jpg']) {
    const from = path.join(src, `${base}.${ext}`);
    if (!fs.existsSync(from)) continue;
    const to = ext === 'jpg' ? path.join('src/assets/video', `${base}.jpg`) : path.join('public', ed, 'media', `${base}.${ext}`);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    const size = fs.statSync(from).size;
    if (ext !== 'jpg') {
      if (size > LIMIT[ext]) { console.error(`✗ ${base}.${ext} is ${(size / 1e6).toFixed(1)} MB (limit ${LIMIT[ext] / 1e6} MB) — ask the dev agent for a smaller encode`); bad++; continue; }
      if (probe(from, ['-select_streams', 'a', '-show_entries', 'stream=index'])) {
        execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', from, '-an', '-c', 'copy', to]);
        console.log(`✓ ${to} (audio stripped)`); n++; continue;
      }
      const dur = Number(probe(from, ['-show_entries', 'format=duration']));
      if (dur && (dur < 6 || dur > 35)) console.warn(`! ${base}.${ext} is ${dur.toFixed(1)} s (spec: 20–30 s loop)`);
    }
    fs.copyFileSync(from, to);
    console.log(`✓ ${to} (${(size / 1e6).toFixed(2)} MB)`); n++;
  }
}
console.log(n ? `${n} file(s) copied from ${src}` : `No hero recordings in ${src} yet — the hero keeps its stills.`);
process.exit(bad ? 1 : 0);
