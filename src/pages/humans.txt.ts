// /humans.txt (humanstxt.org): who runs the site and what it is built with. Last update = build date.
import { COMPANY, CONTACT_EMAIL } from '../config/brand';
export function GET() {
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
  const body = `/* TEAM */
Company: ${COMPANY.name}
Site: ${COMPANY.url}
Contact: ${CONTACT_EMAIL}
From: Malta

/* SITE */
Last update: ${day}
Language: English, German, Chinese
Doctype: HTML5
Standards: HTML5, CSS3, RSS 2.0, Sitemaps 0.9, llms.txt, security.txt, Web App Manifest
Components: Astro, MDX, three.js, sharp
Hosting: Cloudflare Pages, Pages Functions, D1, Turnstile, Web Analytics
Fonts: Inter, IBM Plex Mono
Software: TypeScript, Node.js
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
