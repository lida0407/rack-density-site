// POST /api/try/used (~/Sensaka/TRY-SIGNUP.md §3), called by the app host: body {id, event: "started"|"used", ts}, header
// X-RD-Signature = base64url(HMAC-SHA256(TRIAL_SIGNING_SECRET, raw body)). ts = epoch seconds, epoch ms or ISO 8601,
// within 5 minutes of now (no replays). Sets trials.started_at / used_at once (the first value wins); "used" also fills
// started_at if the "started" call was lost. 200 {ok:true} · 401 bad signature · 400 bad body/stale · 404 unknown pass.
import { TRIAL_LIVE } from '../../../src/config/trial.mjs';
import { verifyBody } from '../../../src/lib/trialPass';
interface Env { DB?: any; TRIAL_SIGNING_SECRET?: string; TRIAL_ENABLED?: string }

const out = (status: number, body: object) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
  if (!(TRIAL_LIVE || env.TRIAL_ENABLED === '1')) return out(404, { ok: false, reason: 'closed' });
  if (!env.DB || !env.TRIAL_SIGNING_SECRET) return out(503, { ok: false, reason: 'closed' });
  const raw = await request.text();
  if (raw.length > 2048 || !(await verifyBody(env.TRIAL_SIGNING_SECRET, raw, request.headers.get('x-rd-signature') ?? ''))) return out(401, { ok: false, reason: 'signature' });
  let b: { id?: unknown; event?: unknown; ts?: unknown };
  try { b = JSON.parse(raw); } catch { return out(400, { ok: false, reason: 'json' }); }
  const id = typeof b.id === 'string' && /^[A-Za-z0-9_-]{8,64}$/.test(b.id) ? b.id : null;
  const event = b.event === 'started' || b.event === 'used' ? b.event : null;
  const t = typeof b.ts === 'number' ? new Date(b.ts < 1e12 ? b.ts * 1000 : b.ts) : typeof b.ts === 'string' ? new Date(b.ts) : new Date(NaN);
  if (!id || !event || Number.isNaN(+t)) return out(400, { ok: false, reason: 'body' });
  if (Math.abs(Date.now() - +t) > 300_000) return out(400, { ok: false, reason: 'stale' });
  const iso = t.toISOString();
  const sql = event === 'started'
    ? 'UPDATE trials SET started_at = COALESCE(started_at, ?1) WHERE pass_id = ?2'
    : 'UPDATE trials SET used_at = COALESCE(used_at, ?1), started_at = COALESCE(started_at, ?1) WHERE pass_id = ?2';
  const r = await env.DB.prepare(sql).bind(iso, id).run();
  return r.meta?.changes ? out(200, { ok: true }) : out(404, { ok: false, reason: 'unknown' });
}

export const onRequestGet = () => new Response('POST only', { status: 405, headers: { Allow: 'POST' } });
