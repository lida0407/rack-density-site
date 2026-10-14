-- D1 database "rack-density-waitlist" (marketing/WAITLIST.md §2). The function also creates these if missing.
CREATE TABLE IF NOT EXISTS waitlist (
  email      TEXT PRIMARY KEY,               -- lower-cased, trimmed
  edition    TEXT NOT NULL,                  -- 'homelab' | 'dc'
  note       TEXT,                           -- "what's in your rack", ≤ 120 chars
  src        TEXT,                           -- ?src= (yt, reddit, site, …)
  ua         TEXT,                           -- user agent, ≤ 200 chars
  ip_hash    TEXT,                           -- SHA-256(ip + salt), for rate limiting only
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE TABLE IF NOT EXISTS waitlist_attempts (ip_hash TEXT NOT NULL, at INTEGER NOT NULL);  -- POSTs per IP hash, pruned after a day
CREATE INDEX IF NOT EXISTS waitlist_attempts_ip ON waitlist_attempts (ip_hash, at);
