// Language by visitor location (marketing/I18N.md §1, Dali 2026-10-15). On the first visit to an unprefixed page, visitors
// from DE/AT/CH/LI go to /de/<same path> and from CN to /zh/<same path>, with a 302 that also sets the `lang` cookie, so
// the switcher (which sets `lang` too) wins from then on. Accept-Language decides only when the country is unknown.
// Never redirected: known crawlers, anyone with a `lang` cookie, non-GET requests, /api/, assets, /de/ and /zh/ URLs, and
// paths that have no page in that language (checked against the built site). public/_routes.json keeps assets off this function.
import { LOCALE_LIVE } from '../src/i18n/live.mjs';
interface Ctx { request: Request; env: { ASSETS: { fetch: (r: Request | string) => Promise<Response> } }; next: () => Promise<Response> }

const COUNTRY: Record<string, 'de' | 'zh'> = { DE: 'de', AT: 'de', CH: 'de', LI: 'de', CN: 'zh' };
const BOTS = /bot\b|bot\/|crawl|spider|slurp|googlebot|google-|bingbot|bingpreview|gptbot|chatgpt|oai-searchbot|claudebot|claude-|anthropic|perplexity|ccbot|bytespider|applebot|amazonbot|duckduck|yandex|baidu|petalbot|sogou|semrush|ahrefs|mj12|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|telegrambot|whatsapp|embedly|lighthouse|headless|curl|wget|python-|go-http/i;
const ONE_YEAR = 60 * 60 * 24 * 365;

const vary = (res: Response) => {
  const r = new Response(res.body, res);
  const v = r.headers.get('Vary');
  if (!v || !/\bcookie\b/i.test(v)) r.headers.set('Vary', v ? `${v}, Cookie` : 'Cookie');
  return r;
};

function wanted(request: Request): 'de' | 'zh' | null {
  // cf-ipcountry is set by Cloudflare at the edge (a client value is overwritten); request.cf is the fallback. Locally the
  // header can be passed by hand to test (wrangler pages dev reports the developer's own country in request.cf).
  const cc = (request.headers.get('cf-ipcountry') ?? (request as any).cf?.country ?? '').toUpperCase();
  if (cc && cc !== 'XX' && cc !== 'T1') return COUNTRY[cc] ?? null;
  // Country unknown: the first language in Accept-Language decides.
  const first = (request.headers.get('accept-language') ?? '').split(',')[0].trim().toLowerCase();
  return first.startsWith('de') ? 'de' : /^zh(-cn|-hans|$)/.test(first) ? 'zh' : null;
}

export async function onRequest({ request, env, next }: Ctx): Promise<Response> {
  const url = new URL(request.url);
  const p = url.pathname;
  if (request.method !== 'GET' && request.method !== 'HEAD') return next();
  if (/^\/(api|de|zh)(\/|$)/.test(p) || /\.[a-z0-9]{1,5}$/i.test(p)) return next();
  const cookie = request.headers.get('cookie') ?? '';
  const ua = request.headers.get('user-agent') ?? '';
  if (/(?:^|;\s*)lang=/.test(cookie) || !ua || BOTS.test(ua) || !(request.headers.get('accept') ?? '').includes('text/html')) return vary(await next());
  const lang = wanted(request);
  if (!lang || !LOCALE_LIVE[lang]) return vary(await next()); // a locale under review gets no visitors sent to it
  const target = `/${lang}${p === '/' ? '/' : p.endsWith('/') ? p : `${p}/`}`;
  const page = await env.ASSETS.fetch(new URL(target, url).toString()).catch(() => null);
  if (!page || !page.ok) return vary(await next()); // no page in that language yet: stay in English, ask again next time
  return new Response(null, {
    status: 302,
    headers: {
      Location: target + url.search,
      'Set-Cookie': `lang=${lang}; Max-Age=${ONE_YEAR}; Path=/; SameSite=Lax; Secure`,
      Vary: 'Cookie',
      'Cache-Control': 'private, no-store',
    },
  });
}
