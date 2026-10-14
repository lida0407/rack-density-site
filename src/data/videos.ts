// Videos on the homelab pages: VideoObject JSON-LD + the visible transcript (SEO-GEO-PLAN §3: transcripts = indexable text).
// The clips have no narration; the transcript is the burned-in captions plus what is on screen, in order.
import { abs } from '../lib/url';
import { PRODUCT_NAME } from '../config/brand';

export interface Video { id: string; name: string; description: string; contentUrl: string; thumbnail: string; duration: string; uploadDate: string; transcript: string[] }

export const VIDEOS: Record<'hero' | 'tour' | 'lightsOff', Video> = {
  hero: {
    id: 'hero', name: `${PRODUCT_NAME}: the demo lab in 30 seconds`, uploadDate: '2026-10-15', duration: 'PT29S',
    description: `A 29-second loop recorded from ${PRODUCT_NAME} with the demo lab (simulated data): overview, power and cost, a UPS failure, the network diagram, a cable trace, AI tokens per kWh and lights off.`,
    contentUrl: '/homelab/media/hero-homelab-dark.mp4', thumbnail: '/homelab/media/demo-tour.jpg',
    transcript: [
      'Overview — "Your homelab, in 3D": the Basement Lab, a 24U rack and a 10-inch rack on a cabinet, every device labelled.',
      'The View menu opens: Overview, Power, Heat, Network, Cables, Compute, AI.',
      'Power — "Watts, €/month and UPS runtime": power flows from the wall through the UPS and strips to each device; the panel shows 1.02 kW, about €162 a month and the UPS runtime.',
      'What if — "Fail the UPS and see what goes dark": the UPS is failed and the devices behind it are marked down.',
      'Network — "Diagram, PoE and link speeds": the network as a diagram, coloured by utilisation, with PoE and link speeds.',
      'Cables — "Trace a run through the patch panel": the cables at the rear of the rack, one run traced end to end.',
      'AI — "Tokens per second and per kWh": the two AI boxes with tokens per second, tokens per kWh and the electricity cost per million tokens.',
      'Lights off — "LEDs blink, the light bill drops": the room goes dark, the device LEDs keep blinking.',
    ],
  },
  tour: {
    id: 'tour', name: `${PRODUCT_NAME} tour: overview, power, network and a Fail what-if`, uploadDate: '2026-10-14', duration: 'PT28S',
    description: `A 28-second screen recording of the ${PRODUCT_NAME} demo lab (simulated data): the View menu, power in 3D and as a diagram, the network in 3D and as a diagram, then a Fail what-if on the aggregation switch.`,
    contentUrl: '/homelab/media/demo-tour.mp4', thumbnail: '/homelab/media/demo-tour.jpg',
    transcript: [
      'The demo lab in the Overview.', 'The View menu opens; Power is picked: power in 3D, then as a diagram from the wall to each device.',
      'Network in 3D, then as a diagram.', 'The aggregation switch is searched, opened and failed: the diagram shows everything that loses connectivity.',
    ],
  },
  lightsOff: {
    id: 'lights-off', name: `${PRODUCT_NAME}: lights off in the demo lab`, uploadDate: '2026-10-14', duration: 'PT8S',
    description: `An 8-second loop of the ${PRODUCT_NAME} demo lab with the room lights off: device LEDs blink and power and network flows run between the racks. In the demo lab, lights off saves an estimated 145 W, about €34 a month.`,
    contentUrl: '/homelab/media/lights-off-loop.mp4', thumbnail: '/homelab/media/lights-off-loop.jpg',
    transcript: ['The demo lab with the room lights off.', 'Device LEDs blink; power and network flows run between the two racks.'],
  },
};

export const videoLd = (v: Video, pagePath: string) => ({
  '@context': 'https://schema.org', '@type': 'VideoObject', '@id': `${abs(pagePath)}#video-${v.id}`,
  name: v.name, description: v.description, uploadDate: v.uploadDate, duration: v.duration,
  thumbnailUrl: abs(v.thumbnail), contentUrl: abs(v.contentUrl), transcript: v.transcript.join(' '),
  publisher: { '@id': `${abs('/')}#org` }, isFamilyFriendly: true,
});
