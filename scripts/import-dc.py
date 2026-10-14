#!/usr/bin/env python3
"""One-off import of the DC Sim site (dcsim-site) into /dc of the merged repo, rewriting relative imports.
Usage: python3 scripts/import-dc.py <path to a clean export of dcsim-site>   (e.g. `git archive <commit> | tar -x -C dir`)
Kept for the record of the merge; the DC marketing agent edits src/**/dc/** directly from now on."""
import os, re, shutil, sys, pathlib
SRC = pathlib.Path(sys.argv[1]).resolve()
DST = pathlib.Path(__file__).resolve().parent.parent
moves = {}
def plan(old_rel, new_rel):
    o = SRC / old_rel; n = DST / new_rel
    if o.is_dir():
        for f in o.rglob('*'):
            if f.is_file(): moves[f] = n / f.relative_to(o)
    elif o.exists(): moves[o] = n
for f in (SRC / 'src/pages').rglob('*'):
    if not f.is_file(): continue
    rel = str(f.relative_to(SRC / 'src/pages'))
    if rel in ('404.astro', 'robots.txt.ts'): continue
    moves[f] = DST / ('src/pages/dc/_llms.ts' if rel == 'llms.txt.ts' else f'src/pages/dc/{rel}')
plan('src/content/pages', 'src/content/dc/pages'); plan('src/content/guides', 'src/content/dc/guides')
moves[SRC / 'src/content.config.ts'] = DST / 'src/content/dc/collections.ts'
plan('src/components', 'src/components/dc'); plan('src/layouts', 'src/layouts/dc'); plan('src/lib', 'src/lib/dc')
moves[SRC / 'src/config/product.ts'] = DST / 'src/config/dc/product.ts'
moves[SRC / 'src/styles/global.css'] = DST / 'src/styles/dc/global.css'
plan('src/assets', 'src/assets/dc'); plan('public', 'public/dc')
moves[SRC / 'scripts/check-copy.mjs'] = DST / 'scripts/check-copy-dc.mjs'
plan('scripts/convert_specs.py', 'scripts/dc/convert_specs.py')
RESOLVE_ONLY = {SRC / 'site.config.mjs': DST / 'site.config.mjs'}
table = {**moves, **RESOLVE_ONLY}
IMP = re.compile(r"""((?:from|import)\s*)(["'])(\.{1,2}/[^"']+)\2""")
n = 0
for old, new in moves.items():
    new.parent.mkdir(parents=True, exist_ok=True)
    if old.suffix not in ('.astro', '.ts', '.mjs', '.md', '.css'):
        shutil.copy2(old, new); continue
    s = old.read_text()
    def fix(m):
        target = (old.parent / m.group(3)).resolve()
        for c in [target] + [target.with_name(target.name + e) for e in ('.ts', '.astro', '.mjs', '.js')]:
            if c in table:
                nt = table[c]
                if c != target and nt.suffix == c.suffix: nt = nt.with_suffix('')
                rel = os.path.relpath(nt, new.parent)
                return f"{m.group(1)}{m.group(2)}{rel if rel.startswith('.') else './' + rel}{m.group(2)}"
        return m.group(0)
    new.write_text(IMP.sub(fix, s)); n += 1
print(f'imported {len(moves)} files ({n} rewritten)')
