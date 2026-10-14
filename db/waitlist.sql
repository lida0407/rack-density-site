-- D1 database "rack-density-waitlist" (id ba3c58a5-ee48-4cd6-a8be-c5080aad76db; marketing/WAITLIST.md §2), as created by
-- the planner on 2026-10-15. The function also creates these if missing.
CREATE TABLE IF NOT EXISTS waitlist (
  email      TEXT PRIMARY KEY,                     -- lower-cased, trimmed
  edition    TEXT NOT NULL DEFAULT 'homelab',      -- 'homelab' | 'dc'
  note       TEXT,                                 -- "what's in your rack", ≤ 120 chars
  src        TEXT,                                 -- ?src= (yt, reddit, site, …)
  ua         TEXT,                                 -- user agent, ≤ 200 chars
  ip_hash    TEXT,                                 -- SHA-256(ip + salt), for rate limiting only
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS waitlist_created ON waitlist(created_at);
-- POSTs per IP hash per clock hour (max 5); rows older than a day are pruned by the function.
CREATE TABLE IF NOT EXISTS ratelimit (ip_hash TEXT NOT NULL, hour TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (ip_hash, hour));
