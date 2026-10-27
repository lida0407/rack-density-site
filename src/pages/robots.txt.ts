// robots.txt — everything allowed. AI crawlers listed by name (Dali's decision 2026-10-15, SEO-GEO-PLAN §8.3) so the
// intent is explicit; Cloudflare's "Block AI bots", crawler protection and managed robots.txt are off for the zone.
import { abs } from '../lib/url';
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot', 'Bytespider'];
export function GET() {
  const body = [
    'User-agent: *', 'Allow: /', '',
    '# AI crawlers: allowed', ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
    `Sitemap: ${abs('/sitemap.xml').replace(/\/$/, '')}`, `# llms.txt: ${abs('/llms.txt').replace(/\/$/, '')}`, `# llms-full.txt: ${abs('/llms-full.txt').replace(/\/$/, '')}`, `# RSS: ${abs('/rss.xml').replace(/\/$/, '')}`, '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
