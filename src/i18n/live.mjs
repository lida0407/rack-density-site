// Which locales are launched (I18N.md §3: every translated page gets a native-speaker read before launch).
// A locale that is not live still builds (so it can be read at /zh/…), but is noindex, has no hreflang, is left out of
// the switcher, the sitemap and llms.txt, and the language middleware does not send anyone to it.
// zh: launched 2026-10-15 after Dali's read ("zh ok", relayed by the planner).
export const LOCALE_LIVE = { de: true, zh: true };
