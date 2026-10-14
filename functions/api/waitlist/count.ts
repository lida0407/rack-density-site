// GET /api/waitlist/count → { count } (marketing/WAITLIST.md §2), cached 60 s at the edge.
interface Ctx { request: Request; env: { DB?: any }; waitUntil: (p: Promise<unknown>) => void }

export async function onRequestGet({ request, env, waitUntil }: Ctx): Promise<Response> {
  const cache = (caches as any).default as Cache;
  const hit = await cache.match(request);
  if (hit) return hit;
  let count = 0;
  try { count = Number((await env.DB?.prepare('SELECT COUNT(*) AS c FROM waitlist').first())?.c ?? 0); } catch { /* table not created yet */ }
  const res = Response.json({ count }, { headers: { 'Cache-Control': 'public, max-age=60' } });
  waitUntil(cache.put(request, res.clone()));
  return res;
}
