// RSS 2.0 for /rss.xml (site-wide) and /homelab/rss.xml. Same item shape as DC marketing's src/pages/dc/_feed.ts
// (dcFeedItems), which the site-wide feed merges when that file exists (README "Feeds and llms-full").
import { getCollection } from 'astro:content';
import { abs } from './url';

export interface FeedItem { title: string; link: string; guid: string; pubDate: Date; description: string; category: string }

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

/** Homelab Twin changelog entries and Learn guides, newest first. */
export async function homelabFeedItems(): Promise<FeedItem[]> {
  const changelog = (await getCollection('changelog')).map((e) => ({
    title: e.data.title, link: `${abs('/homelab/changelog')}#${e.id}`, guid: `homelab-changelog-${e.id}`,
    pubDate: e.data.date, description: e.data.summary, category: 'Homelab Twin changelog',
  }));
  const guides = (await getCollection('learn')).map((g) => ({
    title: g.data.title, link: abs(`/homelab/learn/${g.data.slug}`), guid: `homelab-guide-${g.data.slug}`,
    pubDate: g.data.date, description: g.data.answer, category: 'Homelab Twin guide',
  }));
  return sortFeed([...changelog, ...guides]);
}

/** The DC Sim items from DC marketing's src/pages/dc/_feed.ts, or none until that file exists. */
export async function dcFeedItemsIfAny(): Promise<FeedItem[]> {
  const mod = Object.values(import.meta.glob<{ dcFeedItems?: () => Promise<FeedItem[]> }>('../pages/dc/_feed.ts', { eager: true }))[0];
  return mod?.dcFeedItems ? await mod.dcFeedItems() : [];
}

export const sortFeed = (items: FeedItem[]) => items.sort((a, b) => +b.pubDate - +a.pubDate || a.guid.localeCompare(b.guid));

export const rssXml = (o: { title: string; link: string; self: string; description: string; items: FeedItem[] }) => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>${esc(o.title)}</title><link>${o.link}</link><description>${esc(o.description)}</description><language>en</language>
<atom:link href="${o.self}" rel="self" type="application/rss+xml"/>
${o.items[0] ? `<lastBuildDate>${o.items[0].pubDate.toUTCString()}</lastBuildDate>\n` : ''}${o.items.map((i) => `<item><title>${esc(i.title)}</title><link>${i.link}</link><guid isPermaLink="false">${i.guid}</guid><pubDate>${i.pubDate.toUTCString()}</pubDate><category>${esc(i.category)}</category><description>${esc(i.description)}</description></item>`).join('\n')}
</channel></rss>`;

export const rssResponse = (xml: string) => new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
