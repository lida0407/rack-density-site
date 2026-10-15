// /homelab/changelog/ shell copy in en, de, zh. The entries themselves stay English (src/content/changelog), with a note.
import { PRODUCT_NAME as P } from '../../config/brand';
import type { Deep } from '../config';

export const en = {
  title: `${P} Changelog: What's New`,
  description: `What's new in ${P}, newest first: features shipped, fixes and what's coming to your 3D homelab rack.`,
  crumb: 'Changelog', h1: 'Changelog',
  /** html: {rss} = the feed link */
  lead: `What's new in ${P}, newest first. Subscribe with {rss}.`,
  entriesNote: '', dateLocale: 'en-GB',
};

export const de: Deep<typeof en> = {
  title: `${P} Änderungen: Was ist neu`,
  description: `Was es Neues in ${P} gibt, das Neueste zuerst: ausgelieferte Funktionen, Korrekturen und was als Nächstes für Ihr 3D-Homelab-Rack kommt.`,
  crumb: 'Änderungen', h1: 'Änderungen',
  lead: `Was es Neues in ${P} gibt, das Neueste zuerst. Per {rss} abonnieren.`,
  entriesNote: 'Die einzelnen Einträge erscheinen auf Englisch.', dateLocale: 'de-DE',
};

export const zh: Deep<typeof en> = {
  title: `${P} 更新日志`,
  description: `${P} 的最新更新，按时间倒序排列：已发布的功能、问题修复及后续计划。`,
  crumb: '更新日志', h1: '更新日志',
  lead: `${P} 的最新更新，按时间倒序排列。可通过 {rss} 订阅。`,
  entriesNote: '更新条目以英文发布。', dateLocale: 'zh-CN',
};
