// POST /api/try/signup (~/Sensaka/TRY-SIGNUP.md §3): Turnstile → e-mail syntax + MX → 5 sign-ups/hour per IP hash →
// D1 `trials` (one per e-mail; the same pass_id again while the trial was never started) + the waitlist row → a signed pass
// (src/lib/trialPass.ts) as cookie rd_pass on .rack-density.com and 303 to the app. JSON in, JSON out for the page script
// ({ok, to} | {ok:false, reason}); a native form post gets the redirect or a small HTML page.
// Open on production when TRIAL_LIVE (src/config/trial.mjs); elsewhere only with TRIAL_ENABLED=1 (wrangler.toml [env.preview]).
// TRIAL_DRY=1 (preview) returns the pass as JSON instead of the cookie + redirect, so the app side can be tested.
import { TRIAL_LIVE, TRIAL } from '../../../src/config/trial.mjs';
import { signPass, newPassId } from '../../../src/lib/trialPass';
interface Env { DB?: any; TURNSTILE_SECRET?: string; IP_SALT?: string; TRIAL_SIGNING_SECRET?: string; TRIAL_ENABLED?: string; TRIAL_DRY?: string }
interface Ctx { request: Request; env: Env }
type Lang = 'en' | 'de' | 'zh';

const EMAIL = /^[^\s@<>()",;:]{1,64}@[a-z0-9.-]{1,190}\.[a-z]{2,24}$/i;
const SCHEMA = [
  "CREATE TABLE IF NOT EXISTS waitlist (email TEXT PRIMARY KEY, edition TEXT NOT NULL DEFAULT 'homelab', note TEXT, src TEXT, ua TEXT, ip_hash TEXT, created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')))",
  'CREATE TABLE IF NOT EXISTS ratelimit (ip_hash TEXT NOT NULL, hour TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (ip_hash, hour))',
  "CREATE TABLE IF NOT EXISTS trials (email TEXT PRIMARY KEY, edition TEXT NOT NULL, note TEXT, updates INTEGER NOT NULL DEFAULT 0, src TEXT, ip_hash TEXT, created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')), pass_id TEXT NOT NULL UNIQUE, started_at TEXT, used_at TEXT)",
  'CREATE INDEX IF NOT EXISTS trials_created ON trials(created_at)',
];
let schemaReady = false;

const sha256 = async (s: string) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))].map((b) => b.toString(16).padStart(2, '0')).join('');

// Only for native form posts (no JavaScript); the page script shows its own translated messages.
const HTML: Record<Lang, Record<string, string>> = {
  en: { title: 'Trial', back: 'Back to the trial page', used: 'This e-mail address has already used its trial. Accounts are coming: join the waitlist, or write to da@mustardseedmt.com.', email: 'That e-mail address does not look right.', mx: 'We could not find a mail server for that domain. Check the address.', turnstile: 'The anti-bot check did not pass. It needs JavaScript; reload the page and try again.', rate: 'Too many tries from this connection. Try again in an hour.', closed: 'The trial is not open yet.' },
  de: { title: 'Testzugang', back: 'Zurück zur Testseite', used: 'Mit dieser E-Mail-Adresse wurde der Test bereits genutzt. Konten kommen bald: Tragen Sie sich in die Warteliste ein oder schreiben Sie an da@mustardseedmt.com.', email: 'Diese E-Mail-Adresse sieht nicht richtig aus.', mx: 'Für diese Domain wurde kein Mailserver gefunden. Bitte prüfen Sie die Adresse.', turnstile: 'Die Bot-Prüfung ist fehlgeschlagen. Sie braucht JavaScript; laden Sie die Seite neu und versuchen Sie es erneut.', rate: 'Zu viele Versuche von dieser Verbindung. Bitte in einer Stunde erneut versuchen.', closed: 'Der Testzugang ist noch nicht geöffnet.' },
  zh: { title: '免费试用', back: '返回试用页面', used: '该邮箱已使用过免费试用。账户功能即将推出：请加入候补名单，或发送邮件至 da@mustardseedmt.com。', email: '邮箱地址格式不正确。', mx: '未找到该域名的邮件服务器，请检查邮箱地址。', turnstile: '人机验证未通过。验证需要启用 JavaScript，请刷新页面后重试。', rate: '当前网络提交次数过多，请一小时后重试。', closed: '免费试用尚未开放。' },
};
const page = (lang: Lang, status: number, key: string) => {
  const t = HTML[lang], prefix = lang === 'en' ? '' : `/${lang}`;
  return new Response(`<!doctype html><html lang="${lang === 'zh' ? 'zh-CN' : lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark light"><meta name="robots" content="noindex"><title>${t.title} | RACKDENSITY</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font:16px/1.6 system-ui,sans-serif;background:Canvas;color:CanvasText}main{max-width:34em;padding:24px}b{font-family:ui-monospace,monospace;letter-spacing:.12em}a{color:#e57000}</style></head>
<body><!--email_off--><main><p><b>RACKDENSITY</b></p><p>${t[key] ?? t.closed}</p><p><a href="${prefix}/try/">${t.back}</a></p></main><!--/email_off--></body></html>`, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
};

/** MX lookup over DNS-over-HTTPS. A domain with no MX (or a null MX, RFC 7505) fails; a resolver error lets it through. */
async function hasMx(domain: string): Promise<boolean> {
  try {
    const r = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`, { headers: { accept: 'application/dns-json' }, signal: AbortSignal.timeout(3000) });
    const j = (await r.json()) as { Status: number; Answer?: { type: number; data: string }[] };
    const mx = (j.Answer ?? []).filter((a) => a.type === 15);
    return j.Status === 0 && mx.length > 0 && !mx.every((a) => /^0 \.?$/.test(a.data.trim()));
  } catch { return true; }
}

export async function onRequestPost({ request, env }: Ctx): Promise<Response> {
  const type = request.headers.get('content-type') ?? '';
  const json = type.includes('application/json');
  const data: Record<string, unknown> = json ? await request.json().catch(() => ({})) : Object.fromEntries([...(await request.formData()).entries()].map(([k, v]) => [k, String(v)]));
  const lang: Lang = data.lang === 'de' || data.lang === 'zh' ? data.lang : 'en';
  const fail = (status: number, reason: string) => (json ? Response.json({ ok: false, reason }, { status, headers: { 'Cache-Control': 'no-store' } }) : page(lang, status, reason));
  if (!(TRIAL_LIVE || env.TRIAL_ENABLED === '1')) return fail(404, 'closed');
  if (!env.DB || !env.TURNSTILE_SECRET || !env.TRIAL_SIGNING_SECRET) return fail(503, 'closed');

  const email = String(data.email ?? '').trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) return fail(400, 'email');
  const edition: 'homelab' | 'dc' = data.edition === 'dc' ? 'dc' : 'homelab';
  const note = String(data.note ?? '').replace(/\s+/g, ' ').trim().slice(0, 120) || null;
  const updates = data.updates === true || data.updates === 'on' || data.updates === '1' ? 1 : 0;
  const ref = new URL(request.headers.get('referer') ?? 'https://x/').searchParams.get('src');
  const base = (String(data.src || ref || 'try').toLowerCase().match(/^[a-z0-9_-]{1,21}$/) ?? ['try'])[0];
  const src = lang === 'en' ? base : `${base}-${lang}`;
  const ip = request.headers.get('cf-connecting-ip') ?? '';
  const ipHash = await sha256(ip + (env.IP_SALT ?? env.TURNSTILE_SECRET));

  if (!schemaReady) { await env.DB.batch(SCHEMA.map((q) => env.DB.prepare(q))); schemaReady = true; }
  const hour = new Date().toISOString().slice(0, 13);
  const [rl] = await env.DB.batch([
    env.DB.prepare('INSERT INTO ratelimit (ip_hash, hour, n) VALUES (?, ?, 1) ON CONFLICT (ip_hash, hour) DO UPDATE SET n = n + 1 RETURNING n').bind(`t:${ipHash}`, hour),
    env.DB.prepare('DELETE FROM ratelimit WHERE hour < ?').bind(new Date(Date.now() - 86_400_000).toISOString().slice(0, 13)),
  ]);
  if (Number(rl.results?.[0]?.n ?? 0) > 5) return fail(429, 'rate');

  const token = String(data.turnstile ?? data['cf-turnstile-response'] ?? '');
  const check = new FormData();
  check.append('secret', env.TURNSTILE_SECRET); check.append('response', token); if (ip) check.append('remoteip', ip);
  const ts = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: check }).then((r) => r.json()).catch(() => ({ success: false })) as { success: boolean };
  if (!token || !ts.success) return fail(403, 'turnstile');
  if (!(await hasMx(email.split('@')[1]))) return fail(400, 'mx');

  let row = await env.DB.prepare('SELECT pass_id, started_at FROM trials WHERE email = ?').bind(email).first();
  if (row?.started_at) return json ? Response.json({ ok: false, reason: 'used' }, { headers: { 'Cache-Control': 'no-store' } }) : page(lang, 200, 'used');
  const ua = (request.headers.get('user-agent') ?? '').slice(0, 200);
  if (row) {
    await env.DB.prepare('UPDATE trials SET edition = ?, note = COALESCE(?, note), updates = MAX(updates, ?) WHERE email = ? AND started_at IS NULL').bind(edition, note, updates, email).run();
  } else {
    await env.DB.prepare('INSERT OR IGNORE INTO trials (email, edition, note, updates, src, ip_hash, pass_id) VALUES (?, ?, ?, ?, ?, ?, ?)').bind(email, edition, note, updates, src, ipHash, newPassId()).run();
    row = await env.DB.prepare('SELECT pass_id, started_at FROM trials WHERE email = ?').bind(email).first();
  }
  await env.DB.prepare('INSERT OR IGNORE INTO waitlist (email, edition, note, src, ua, ip_hash) VALUES (?, ?, ?, ?, ?, ?)').bind(email, edition, note, src, ua, ipHash).run();

  const iat = Math.floor(Date.now() / 1000);
  const payload = { id: String(row.pass_id), ed: edition, iat, exp: iat + TRIAL.passDays * 86400 };
  const pass = await signPass(env.TRIAL_SIGNING_SECRET, payload);
  const to = TRIAL.app[edition];
  if (env.TRIAL_DRY === '1') return Response.json({ ok: true, dry: true, to, pass, payload }, { headers: { 'Cache-Control': 'no-store' } });
  const cookie = `rd_pass=${pass}; Domain=.rack-density.com; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${TRIAL.passDays * 86400}`;
  if (json) return Response.json({ ok: true, to }, { headers: { 'Set-Cookie': cookie, 'Cache-Control': 'no-store' } });
  return new Response(null, { status: 303, headers: { Location: to, 'Set-Cookie': cookie, 'Cache-Control': 'no-store' } });
}

export const onRequestGet = () => new Response('POST only', { status: 405, headers: { Allow: 'POST' } });
