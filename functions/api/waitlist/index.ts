// POST /api/waitlist (marketing/WAITLIST.md §2). JSON from the page script, or form-encoded when the page posts natively.
// Turnstile is verified server-side, the e-mail stored once (INSERT OR IGNORE), at most 5 POSTs per IP hash per clock hour.
// Returns { ok, position, already } (position = people ahead of you) as JSON, or a small HTML page for form posts.
import { WAITLIST_START } from '../../../src/config/waitlist';
interface Env { DB?: any; TURNSTILE_SECRET?: string; IP_SALT?: string }
interface Ctx { request: Request; env: Env }

const EMAIL = /^[^\s@<>()",;:]{1,64}@[a-z0-9.-]{1,190}\.[a-z]{2,24}$/i;
const SCHEMA = [ // same as db/waitlist.sql (the planner created it on D1 2026-10-15)
  "CREATE TABLE IF NOT EXISTS waitlist (email TEXT PRIMARY KEY, edition TEXT NOT NULL DEFAULT 'homelab', note TEXT, src TEXT, ua TEXT, ip_hash TEXT, created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')))",
  'CREATE INDEX IF NOT EXISTS waitlist_created ON waitlist(created_at)',
  'CREATE TABLE IF NOT EXISTS ratelimit (ip_hash TEXT NOT NULL, hour TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (ip_hash, hour))',
];
let schemaReady = false;

const sha256 = async (s: string) =>
  [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))].map((b) => b.toString(16).padStart(2, '0')).join('');

const MSG: Record<string, string> = {
  email: 'That e-mail address does not look right.',
  turnstile: 'The anti-bot check did not pass. It needs JavaScript; reload the page and try again.',
  rate: 'Too many tries from this connection. Try again in an hour.',
  closed: 'The waitlist is not open yet. E-mail da@mustardseedmt.com and we add you by hand.',
};

function reply(form: boolean, status: number, body: { ok: boolean; position?: number; already?: boolean; error?: string }) {
  if (!form) return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
  const text = body.ok
    ? `${body.already ? "You're already on the list" : "You're on the list"} — ${body.position} ${body.position === 1 ? 'person' : 'people'} ahead of you.`
    : MSG[body.error ?? 'closed'] ?? MSG.closed;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark light"><meta name="robots" content="noindex"><title>Waitlist | RACKDENSITY</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font:16px/1.6 system-ui,sans-serif;background:Canvas;color:CanvasText}main{max-width:34em;padding:24px}b{font-family:ui-monospace,monospace;letter-spacing:.12em}p{margin:0 0 16px}a{color:#e57000}</style></head>
<body><!--email_off--><main><p><b>RACKDENSITY</b></p><h1 style="font-size:1.5rem">${body.ok ? 'Done' : 'Not added'}</h1><p>${text}</p><p><a href="/homelab/waitlist/">Back to the waitlist</a> · <a href="/homelab/">Homelab Twin</a></p></main><!--/email_off--></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}

export async function onRequestPost({ request, env }: Ctx): Promise<Response> {
  const type = request.headers.get('content-type') ?? '';
  const form = !type.includes('application/json');
  const data: Record<string, string> = form
    ? Object.fromEntries([...(await request.formData()).entries()].map(([k, v]) => [k, String(v)]))
    : await request.json().catch(() => ({}));
  if (!env.DB || !env.TURNSTILE_SECRET) return reply(form, 503, { ok: false, error: 'closed' });

  const email = String(data.email ?? '').trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) return reply(form, 400, { ok: false, error: 'email' });
  const edition = data.edition === 'dc' ? 'dc' : 'homelab';
  const note = String(data.note ?? '').replace(/\s+/g, ' ').trim().slice(0, 120) || null;
  const ref = new URL(request.headers.get('referer') ?? 'https://x/').searchParams.get('src');
  const src = (String(data.src || ref || 'site').toLowerCase().match(/^[a-z0-9_-]{1,24}$/) ?? ['site'])[0];
  const ip = request.headers.get('cf-connecting-ip') ?? '';
  const ipHash = await sha256(ip + (env.IP_SALT ?? env.TURNSTILE_SECRET));

  if (!schemaReady) { await env.DB.batch(SCHEMA.map((q) => env.DB.prepare(q))); schemaReady = true; }
  const hour = new Date().toISOString().slice(0, 13); // per clock hour, e.g. 2026-10-15T21
  const [rl] = await env.DB.batch([
    env.DB.prepare('INSERT INTO ratelimit (ip_hash, hour, n) VALUES (?, ?, 1) ON CONFLICT (ip_hash, hour) DO UPDATE SET n = n + 1 RETURNING n').bind(ipHash, hour),
    env.DB.prepare('DELETE FROM ratelimit WHERE hour < ?').bind(new Date(Date.now() - 86_400_000).toISOString().slice(0, 13)),
  ]);
  if (Number(rl.results?.[0]?.n ?? 0) > 5) return reply(form, 429, { ok: false, error: 'rate' });

  const token = String(data.turnstile ?? data['cf-turnstile-response'] ?? '');
  const check = new FormData();
  check.append('secret', env.TURNSTILE_SECRET); check.append('response', token); if (ip) check.append('remoteip', ip);
  const ts = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: check }).then((r) => r.json()).catch(() => ({ success: false })) as { success: boolean };
  if (!token || !ts.success) return reply(form, 403, { ok: false, error: 'turnstile' });

  const ins = await env.DB.prepare('INSERT OR IGNORE INTO waitlist (email, edition, note, src, ua, ip_hash) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(email, edition, note, src, (request.headers.get('user-agent') ?? '').slice(0, 200), ipHash).run();
  const row = await env.DB.prepare('SELECT (SELECT COUNT(*) FROM waitlist w2 WHERE w2.rowid < w.rowid) AS ahead FROM waitlist w WHERE email = ?').bind(email).first();
  return reply(form, 200, { ok: true, position: WAITLIST_START + Number(row?.ahead ?? 0), already: !ins.meta?.changes });
}

export const onRequestGet = () => new Response('POST only', { status: 405, headers: { Allow: 'POST' } });
