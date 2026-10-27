// /dc/rss.xml: the DC Sim changelog and new DC guides, newest first (shared RSS writer in src/lib/feed.ts).
import { abs } from "../../lib/dc/url";
import { rssXml, rssResponse } from "../../lib/feed";
import { dcFeedItems } from "./_feed";
export async function GET() {
  return rssResponse(rssXml({
    title: "DC Sim: changelog and guides",
    link: abs(""),
    self: abs("rss.xml"),
    description: "What shipped in DC Sim, the browser-based data center simulator, and new data center guides from rack-density.com.",
    items: (await dcFeedItems()).slice(0, 50),
  }));
}
