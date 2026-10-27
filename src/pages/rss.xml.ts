// /rss.xml: the whole site — Homelab Twin and DC Sim changelogs and new guides, newest first. DC items come from DC
// marketing's src/pages/dc/_feed.ts (dcFeedItems) when it exists.
import { abs } from '../lib/url';
import { BRAND } from '../config/brand';
import { homelabFeedItems, dcFeedItemsIfAny, sortFeed, rssXml, rssResponse } from '../lib/feed';
export async function GET() {
  const items = sortFeed([...(await homelabFeedItems()), ...(await dcFeedItemsIfAny())]).slice(0, 80);
  return rssResponse(rssXml({
    title: `${BRAND}: changelogs and guides`, link: abs('/'), self: abs('/rss.xml'),
    description: 'What shipped in Homelab Twin and DC Sim, and new homelab and data center guides from rack-density.com.',
    items,
  }));
}
