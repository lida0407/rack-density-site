#!/usr/bin/env python3
"""Prove a refactor leaves the English DC pages unchanged.

  python3 scripts/dc/snapshot.py snap dist/dc /tmp/before.json     # before the change (after npm run build)
  python3 scripts/dc/snapshot.py diff /tmp/before.json /tmp/after.json

`snap` stores, per HTML file: visible text, JSON-LD blocks, href/src/content values and alt/aria-label/title values.
`diff` prints every difference except the expected locale additions (hreflang/og:locale/switcher links to /de/ and /zh/
and self-referencing alternates), and exits 1 if anything else changed.
"""
import html, json, pathlib, re, sys, difflib

def snap(root: str, out: str) -> None:
    base = pathlib.Path(root); data = {}
    for p in sorted(base.rglob("*.html")):
        raw = p.read_text()
        ld = re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', raw, re.S)
        body = re.sub(r"<script[\s\S]*?</script>|<style[\s\S]*?</style>", " ", raw)
        data[str(p.relative_to(base))] = {
            "text": html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", body))).strip(),
            "ld": ld,
            "hrefs": re.findall(r'(?:href|src|content)="([^"]*)"', body),
            "alts": re.findall(r'(?:alt|aria-label|title)="([^"]*)"', body),
        }
    json.dump(data, open(out, "w"), ensure_ascii=False)
    print(f"{len(data)} pages → {out}")

EXPECTED = re.compile(r"^(https://[^/]+)?/(de|zh)(/|$)|^(en_US|de_DE|zh_CN)$")

def diff(before: str, after: str) -> int:
    a, b = json.load(open(before)), json.load(open(after))
    print(f"pages {len(a)} → {len(b)}; missing {sorted(set(a) - set(b))[:5]}; new {sorted(set(b) - set(a))[:5]}")
    n = 0
    for k in sorted(set(a) & set(b)):
        for f in ("text", "ld", "hrefs", "alts"):
            x, y = a[k][f], b[k][f]
            if f == "hrefs":
                x = [h for h in x if not EXPECTED.match(h)]
                y = [h for h in y if not EXPECTED.match(h)]
                # self-referencing alternates (hreflang en / x-default) appear when a page gets a translation
                y = [h for h in y if not (h.startswith("https://") and h.rstrip("/").endswith(k.replace("index.html", "").rstrip("/")) and h not in x)]
            if x == y:
                continue
            n += 1
            if f == "text":
                sm = difflib.SequenceMatcher(None, x, y, autojunk=False)
                for op, i1, i2, j1, j2 in sm.get_opcodes():
                    if op != "equal":
                        print(f"{k} TEXT {op}: …{x[max(0, i1 - 50):i2 + 30]}… ⇒ …{y[max(0, j1 - 50):j2 + 30]}…")
            else:
                for d in difflib.unified_diff([str(v)[:300] for v in x], [str(v)[:300] for v in y], lineterm="", n=0):
                    if d[:3] not in ("---", "+++", "@@ "):
                        print(f"{k} {f.upper()} {d}")
    print(f"differing fields: {n}")
    return 1 if n else 0

if __name__ == "__main__":
    if len(sys.argv) == 4 and sys.argv[1] == "snap":
        snap(sys.argv[2], sys.argv[3])
    elif len(sys.argv) == 4 and sys.argv[1] == "diff":
        sys.exit(diff(sys.argv[2], sys.argv[3]))
    else:
        print(__doc__); sys.exit(2)
