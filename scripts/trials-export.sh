#!/bin/sh
# Admin export of trial sign-ups (~/Sensaka/TRY-SIGNUP.md §3): sign-ups, sessions started and imports used, from D1.
# Writes a CSV to ~/Sensaka/.secrets/ (never into git). Needs `wrangler login`.
set -eu
cd "$(dirname "$0")/.."
OUT="${1:-$HOME/Sensaka/.secrets/trials-$(date +%Y%m%d-%H%M).csv}"
JSON=$(npx -y wrangler@4.143.1 d1 execute rack-density-waitlist --remote --json \
  --command "select email, edition, note, updates, src, created_at, started_at, used_at from trials order by created_at")
printf '%s' "$JSON" | python3 -c '
import csv, json, sys
rows = json.load(sys.stdin)[0]["results"]
cols = ["email", "edition", "note", "updates", "src", "created_at", "started_at", "used_at"]
w = csv.writer(open(sys.argv[1], "w", newline="")); w.writerow(cols)
for r in rows: w.writerow(["" if r[c] is None else r[c] for c in cols])
print("sign-ups: %d · started: %d · used (imported): %d · written to %s" % (len(rows), sum(1 for r in rows if r["started_at"]), sum(1 for r in rows if r["used_at"]), sys.argv[1]))
' "$OUT"
chmod 600 "$OUT"
