-- Trial sign-ups (TRY-SIGNUP.md §3). The Pages Function functions/api/try/signup.ts also creates it if missing.
CREATE TABLE IF NOT EXISTS trials (
  email TEXT PRIMARY KEY,
  edition TEXT NOT NULL,                 -- homelab | dc
  note TEXT,
  updates INTEGER NOT NULL DEFAULT 0,    -- 1 = "E-mail me when accounts open" ticked (marketing consent)
  src TEXT,
  ip_hash TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  pass_id TEXT NOT NULL UNIQUE,
  started_at TEXT,                       -- set by POST /api/try/used {event: started}
  used_at TEXT                           -- set by POST /api/try/used {event: used} (first import)
);
CREATE INDEX IF NOT EXISTS trials_created ON trials(created_at);
