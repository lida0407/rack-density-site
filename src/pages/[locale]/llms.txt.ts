// /de/llms.txt and /zh/llms.txt (I18N.md §1): the summary in that language and links to its pages; scripts/llms-index.mjs
// appends every page of that locale from the sitemap. DC marketing can add its part by exporting dcLlmsLocale(locale)
// from src/pages/dc/_llms.ts (picked up when present).
import { PRODUCT_NAME as P, BRAND, PRICES, CONTACT_EMAIL, SITE_URL } from '../../config/brand';
import { lp, localePaths, isLive, type Locale } from '../../i18n';
export const getStaticPaths = () => localePaths('/').filter((p) => isLive(p.params.locale));
const dc = Object.values(import.meta.glob<{ dcLlmsLocale?: (l: Locale) => Promise<string> }>('../dc/_llms.ts', { eager: true }))[0];
const A = PRICES.account, R = PRICES.pro;
const url = (path: string, l: Locale) => SITE_URL.replace(/\/$/, '') + lp(path, l);
const TEXT: Record<'de' | 'zh', (l: Locale) => string> = {
  de: (l) => `# ${BRAND} (Deutsch)

> Kostenlose Rack- und Rechenzentrumswerkzeuge und zwei 3D-Zwillinge im Browser von Mustard Seed Solutions: ${P} für Racks zu Hause und DC Sim für Rechenzentren. Alles läuft im Browser aus einer Excel/CSV-Datei; nichts wird hochgeladen. Kontakt: ${CONTACT_EMAIL}.

Mustard Seed Solutions (mustardseedmt.com, Malta) betreibt rack-density.com; ${BRAND} ist ein Angebot des Unternehmens. Diese Datei listet die deutschen Seiten; alle Seiten auf Englisch: ${SITE_URL.replace(/\/$/, '')}/llms.txt

## Kostenlose Rechner
- [Rack-Rechner](${url('/calculator', l)}): Geräte pro Rack nach Platz (HE), Strom und Kühlung; kW pro Rack; Stromkosten pro Monat

## ${P} (Homelab)

> ${P} macht aus einer Tabelle Ihrer Geräte ein 3D-Modell Ihres Racks: Watt und Kosten pro Gerät, was wo steckt, USV-Laufzeit, was bei einem Ausfall dunkel wird, und Tokens pro kWh für lokale KI-Rechner. Noch keine öffentliche Demo: Clips, Vorführungen und eine Warteliste. Account (${A.month} $/Monat oder ${A.year} $/Jahr) und Pro (${R.month} $/Monat oder ${R.year} $/Jahr) starten bald. Die App ist derzeit auf Englisch.

- [${P}](${url('/homelab', l)}): Überblick
- [${P} ansehen](${url('/homelab/try', l)}): Clips und Standbilder des Demo-Labs, Vorführung anfragen, die Importvorlage
- [Preise](${url('/homelab/pricing', l)}): was jeder Tarif enthält; geplante Funktionen sind markiert
- [Warteliste](${url('/homelab/waitlist', l)}): eine E-Mail, wenn Try zum Selbsttesten öffnet
- [Änderungen](${url('/homelab/changelog', l)}): was ausgeliefert wurde (Einträge auf Englisch)

Fakten: Das Blatt „Devices“ der Vorlage ist Pflicht (Rack, HE, Modell); Cables, Racks, Power, Networks und Readings sind optional. Strom-, Wärme- und Kostenwerte sind Schätzungen aus der typischen Leistungsaufnahme jedes Modells, angepasst durch Messwerte, die der Nutzer ergänzt. Tokens pro kWh = Tokens pro Sekunde ÷ Watt × 3.600.000.
`,
  zh: (l) => `# ${BRAND}（中文）

> Mustard Seed Solutions 出品的免费机柜与数据中心工具，以及两个在浏览器中运行的 3D 孪生：${P} 面向家里的机柜（homelab），DC Sim 面向数据中心机房。一切都在浏览器中用 Excel/CSV 文件完成，不上传任何数据。联系方式：${CONTACT_EMAIL}。

Mustard Seed Solutions（mustardseedmt.com，马耳他）运营 rack-density.com；${BRAND} 是其旗下品牌。本文件列出中文页面；全部英文页面见：${SITE_URL.replace(/\/$/, '')}/llms.txt

## 免费计算器
- [机柜功率密度计算器](${url('/calculator', l)})：按空间（U）、供电和制冷计算每柜设备数；单机柜功率（kW）；每月电费

## ${P}（homelab）

> ${P} 把设备清单表格变成机柜的 3D 模型：每台设备的功耗和电费、线插在哪里、UPS 续航、一处故障会让哪些设备断电，以及本地 AI 主机的每千瓦时 token 数。尚无公开演示：提供视频、演示讲解和候补名单。Account（每月 ${A.month} 美元或每年 ${A.year} 美元）和 Pro（每月 ${R.month} 美元或每年 ${R.year} 美元）即将推出。应用界面目前为英文。

- [${P}](${url('/homelab', l)})：概览
- [${P} 演示](${url('/homelab/try', l)})：演示实验室的视频和截图、预约讲解、导入模板
- [价格](${url('/homelab/pricing', l)})：各版本包含的功能；规划中的功能已标注
- [候补名单](${url('/homelab/waitlist', l)})：自助试用 Try 开放时发一封邮件
- [更新日志](${url('/homelab/changelog', l)})：已发布的内容（条目为英文）

事实：模板中的 Devices 表为必填（机柜、U 位、型号）；Cables、Racks、Power、Networks 和 Readings 为选填。功耗、散热和电费数字是估算值，依据每个型号的典型功耗，并结合用户补充的读数。每千瓦时 token 数 = 每秒 token 数 ÷ 瓦数 × 3,600,000。
`,
};
export async function GET({ params }: { params: { locale: Locale } }) {
  const l = params.locale as 'de' | 'zh';
  const extra = dc?.dcLlmsLocale ? `\n${await dc.dcLlmsLocale(l)}` : '';
  return new Response(TEXT[l](l) + extra, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
