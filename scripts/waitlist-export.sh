#!/bin/sh
# Admin export of the waitlist (WAITLIST.md §2): the REAL rows and the real count, next to the public number (which adds
# WAITLIST_START from src/config/waitlist.ts). Writes a CSV to ~/Sensaka/.secrets/ (never into git). Needs `wrangler login`.
set -eu
cd "$(dirname "$0")/.."
OUT="${1:-$HOME/Sensaka/.secrets/waitlist-$(date +%Y%m%d-%H%M).csv}"
START=$(sed -n 's/^export const WAITLIST_START = \([0-9]*\);.*/\1/p' src/config/waitlist.ts)
JSON=$(npx -y wrangler@4.143.1 d1 execute rack-density-waitlist --remote --json \
  --command "select email, edition, src, note, created_at from waitlist order by created_at")
printf '%s' "$JSON" | python3 -c '
import csv, json, sys
rows = json.load(sys.stdin)[0]["results"]
w = csv.writer(open(sys.argv[1], "w", newline="")); w.writerow(["email", "edition", "src", "note", "created_at"])
for r in rows: w.writerow([r["email"], r["edition"], r["src"], r["note"] or "", r["created_at"]])
print("real sign-ups: %d · shown publicly: %d (offset %s) · written to %s" % (len(rows), len(rows) + int(sys.argv[2]), sys.argv[2], sys.argv[1]))
' "$OUT" "$START"
chmod 600 "$OUT"
