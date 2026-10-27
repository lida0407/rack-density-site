// DC Sim feed items (underscore file: not a route). One list for /dc/rss.xml and for the site-wide /rss.xml, which
// src/lib/feed.ts (homelab marketing) merges with the Homelab Twin items (README "Feeds and llms-full").
import { getCollection } from "astro:content";
import { abs } from "../../lib/dc/url";
import { sortFeed, type FeedItem } from "../../lib/feed";
import { CHANGELOG } from "../../data/dc/changelog";

// Guides published before `updated` existed went live with the site.
const LAUNCH = "2026-10-14";

/** The DC changelog (src/data/dc/changelog.ts) and the DC guides, newest first. guids are prefixed "dc-". */
export async function dcFeedItems(): Promise<FeedItem[]> {
  const changelog: FeedItem[] = CHANGELOG.map((e) => ({
    title: e.title,
    link: `${abs("resources/changelog/")}#${e.id}`,
    guid: `dc-changelog-${e.id}`,
    pubDate: new Date(`${e.date}T12:00:00Z`),
    description: e.items.join(" "),
    category: "DC Sim changelog",
  }));
  const guides: FeedItem[] = (await getCollection("guides")).map((g) => ({
    title: g.data.title,
    link: abs(`resources/guides/${g.id}/`),
    guid: `dc-guide-${g.id}`,
    pubDate: new Date(`${g.data.updated ?? LAUNCH}T12:00:00Z`),
    description: g.data.directAnswer,
    category: "DC Sim guide",
  }));
  return sortFeed([...changelog, ...guides]);
}
