// /de/llms-full.txt, /zh/llms-full.txt: the translated pages in full (src/lib/llmsFull.ts). Guides are English-only and
// live in /llms-full.txt. DC marketing can add its translated pages by exporting dcLlmsFullLocale(locale) from
// src/pages/dc/_llms.ts (picked up when present).
import { BRAND, CONTACT_EMAIL, SITE_URL } from '../../config/brand';
import { localePaths, isLive, type Locale } from '../../i18n';
import { siteFull } from '../../lib/llmsFull';
export const getStaticPaths = () => localePaths('/').filter((p) => isLive(p.params.locale));
const dc = Object.values(import.meta.glob<{ dcLlmsFullLocale?: (l: Locale) => Promise<string> }>('../dc/_llms.ts', { eager: true }))[0];
const HEAD: Record<'de' | 'zh', (root: string) => string> = {
  de: (root) => `# ${BRAND} (Deutsch) — Volltext\n\n> Kostenlose Rack- und Rechenzentrumswerkzeuge und zwei 3D-Zwillinge im Browser von Mustard Seed Solutions. Kontakt: ${CONTACT_EMAIL}.\n\nDiese Datei enthält den vollständigen Text der deutschen Seiten; Kurzfassung: ${root}/de/llms.txt. Die Leitfäden gibt es auf Englisch: ${root}/llms-full.txt`,
  zh: (root) => `# ${BRAND}（中文）— 全文\n\n> Mustard Seed Solutions 出品的免费机柜与数据中心工具，以及两款在浏览器中运行的 3D 数字孪生。联系方式：${CONTACT_EMAIL}。\n\n本文件收录中文页面全文；摘要见 ${root}/zh/llms.txt。技术指南为英文：${root}/llms-full.txt`,
};
export async function GET({ params }: { params: { locale: Locale } }) {
  const l = params.locale as 'de' | 'zh', root = SITE_URL.replace(/\/$/, '');
  const extra = dc?.dcLlmsFullLocale ? `\n\n${await dc.dcLlmsFullLocale(l)}` : '';
  return new Response(`${HEAD[l](root)}\n\n${siteFull(l)}${extra}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
