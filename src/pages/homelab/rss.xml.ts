// /homelab/rss.xml (was /homelab/changelog.xml; public/_redirects 301s the old name): Homelab Twin changelog and Learn guides.
import { abs } from '../../lib/url';
import { PRODUCT_NAME } from '../../config/brand';
import { homelabFeedItems, rssXml, rssResponse } from '../../lib/feed';
export async function GET() {
  return rssResponse(rssXml({
    title: `${PRODUCT_NAME}: changelog and guides`, link: abs('/homelab'), self: abs('/homelab/rss.xml'),
    description: `What shipped in ${PRODUCT_NAME} and new homelab guides from rack-density.com.`,
    items: (await homelabFeedItems()).slice(0, 50),
  }));
}
