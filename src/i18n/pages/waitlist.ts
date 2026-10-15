// /homelab/waitlist/ copy in en, de, zh, including the messages the form script shows (passed as data-t JSON).
import { PRODUCT_NAME as P } from '../../config/brand';
import type { Deep } from '../config';

export const en = {
  title: `Join the ${P} Waitlist | RACKDENSITY`,
  description: `Get in first when the self-serve ${P} Try opens: one e-mail, no spam, nothing else stored.`,
  crumb: 'Waitlist',
  eyebrow: 'Waitlist · self-serve Try', h1: 'Get in first when Try opens',
  lead: 'The self-serve Try opens to the waitlist first. One e-mail when it does, no spam, nothing else stored.',
  email: 'E-mail', rack: "What's in your rack?", optional: 'optional, 120 characters', placeholder: 'e.g. 3 mini PCs, a NAS, a UDM-Pro, 10-inch rack',
  for: 'For', submit: 'Join the waitlist',
  keep: "We keep your e-mail, the product you picked, your note, where you came from ({src}) and your browser's user-agent, plus a one-way hash of your IP address against spam.",
  analyticsOn: 'No tracking cookies: the only scripts from elsewhere are Cloudflare’s bot check and its cookieless visit counter.',
  analyticsOff: 'No tracking, no third-party scripts besides the Cloudflare bot check.',
  privacy: 'Privacy',
  closed: 'The waitlist form opens in a moment. Until then, e-mail us and we add you by hand.', closedButton: 'E-mail me when Try opens',
  /** html: {clips} = link to the See it page */
  prefer: 'Prefer to see it now? {clips} or request a walkthrough from the See it page.', clips: 'Watch the clips',
  js: {
    sending: 'Sending…', one: '{n} person is on the list.', many: '{n} people are on the list.',
    asked: 'Your sign-up also counts as a request for {x}: connectors are built in the order people ask for them.', librenms: 'the LibreNMS connector',
    on: "You're on the list", already: "You're already on the list", ahead: '{msg} — {n} {who} ahead of you.', person: 'person', people: 'people',
    email: 'That e-mail address does not look right.', turnstile: 'The anti-bot check did not pass. Try again.',
    rate: 'Too many tries from this connection. Try again in an hour.', down: 'The waitlist is not reachable right now. E-mail us instead.',
  },
};

export const de: Deep<typeof en> = {
  title: `${P} Warteliste: früher Zugang | RACKDENSITY`,
  description: `Seien Sie zuerst dabei, wenn ${P} Try zum Selbsttesten öffnet: eine E-Mail, kein Spam, sonst wird nichts gespeichert.`,
  crumb: 'Warteliste',
  eyebrow: 'Warteliste · Try zum Selbsttesten', h1: 'Zuerst dabei, wenn Try öffnet',
  lead: 'Try zum Selbsttesten öffnet zuerst für die Warteliste. Eine E-Mail, wenn es so weit ist, kein Spam, sonst wird nichts gespeichert.',
  email: 'E-Mail', rack: 'Was steckt in Ihrem Rack?', optional: 'optional, 120 Zeichen', placeholder: 'z. B. 3 Mini-PCs, ein NAS, eine UDM-Pro, 10-Zoll-Rack',
  for: 'Für', submit: 'Auf die Warteliste',
  keep: 'Wir speichern Ihre E-Mail-Adresse, das gewählte Produkt, Ihre Notiz, woher Sie kamen ({src}) und die User-Agent-Kennung Ihres Browsers, dazu einen Hash Ihrer IP-Adresse gegen Spam.',
  analyticsOn: 'Keine Tracking-Cookies: Die einzigen fremden Skripte sind die Bot-Prüfung von Cloudflare und sein cookieloser Besuchszähler.',
  analyticsOff: 'Kein Tracking, keine fremden Skripte außer der Bot-Prüfung von Cloudflare.',
  privacy: 'Datenschutz',
  closed: 'Das Formular der Warteliste öffnet in Kürze. Bis dahin schreiben Sie uns eine E-Mail, und wir tragen Sie von Hand ein.', closedButton: 'Benachrichtigen, wenn Try öffnet',
  prefer: 'Lieber gleich ansehen? {clips} oder auf der Seite „Ansehen“ eine Vorführung anfragen.', clips: 'Clips ansehen',
  js: {
    sending: 'Wird gesendet …', one: '{n} Person steht auf der Liste.', many: '{n} Personen stehen auf der Liste.',
    asked: 'Ihre Anmeldung zählt auch als Wunsch nach {x}: Konnektoren entstehen in der Reihenfolge, in der sie gewünscht werden.', librenms: 'dem LibreNMS-Konnektor',
    on: 'Sie stehen auf der Liste', already: 'Sie stehen bereits auf der Liste', ahead: '{msg} – {n} {who} vor Ihnen.', person: 'Person', people: 'Personen',
    email: 'Diese E-Mail-Adresse sieht nicht richtig aus.', turnstile: 'Die Bot-Prüfung ist fehlgeschlagen. Bitte versuchen Sie es erneut.',
    rate: 'Zu viele Versuche von dieser Verbindung. Bitte in einer Stunde erneut versuchen.', down: 'Die Warteliste ist gerade nicht erreichbar. Schreiben Sie uns stattdessen eine E-Mail.',
  },
};

export const zh: Deep<typeof en> = {
  title: `${P} 抢先体验：加入候补名单 | RACKDENSITY`,
  description: `${P} 自助试用 Try 开放时第一时间获得通知：只发一封邮件，不发广告，不存储其他信息。`,
  crumb: '候补名单',
  eyebrow: '候补名单 · 自助试用 Try', h1: 'Try 开放时抢先体验',
  lead: '自助试用 Try 将优先向候补名单开放。开放时只发一封邮件，不发广告，不存储其他信息。',
  email: '邮箱', rack: '您的机柜里有什么？', optional: '选填，120 字以内', placeholder: '例如：3 台迷你主机、一台 NAS、一台 UDM-Pro、10 英寸机柜',
  for: '产品', submit: '加入候补名单',
  keep: '我们保存您的邮箱、选择的产品、您的备注、来源（{src}）和浏览器的 User-Agent，以及用于防垃圾提交的 IP 地址单向哈希值。',
  analyticsOn: '不使用跟踪 Cookie：唯一的外部脚本是 Cloudflare 的人机验证和它不使用 Cookie 的访问计数。',
  analyticsOff: '不做跟踪，除 Cloudflare 人机验证外不加载第三方脚本。',
  privacy: '隐私政策',
  closed: '候补名单表单即将开放。在此之前，请给我们发邮件，我们会手动为您登记。', closedButton: 'Try 开放时邮件通知我',
  prefer: '想现在就看看？{clips}，或在"观看演示"页面预约讲解。', clips: '观看视频',
  js: {
    sending: '正在提交…', one: '已有 {n} 人加入候补名单。', many: '已有 {n} 人加入候补名单。',
    asked: '您的登记也会计为对{x}的需求：连接器按需求的先后顺序开发。', librenms: ' LibreNMS 连接器',
    on: '您已加入候补名单', already: '您已经在候补名单中', ahead: '{msg}，前面还有 {n} {who}。', person: '人', people: '人',
    email: '这个邮箱地址看起来不对。', turnstile: '人机验证未通过，请重试。',
    rate: '此网络连接尝试次数过多，请一小时后再试。', down: '候补名单暂时无法访问，请改为给我们发邮件。',
  },
};
