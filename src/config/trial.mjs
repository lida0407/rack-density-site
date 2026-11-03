// Self-serve trial (~/Sensaka/TRY-SIGNUP.md). TRIAL_LIVE flips on the planner's "Try live" notice: /try/ pages indexed,
// CTAs "Try it once", pricing and waitlist lines, the sign-up API open on production. Until then the pages exist only in
// preview builds (TRIAL_PAGE=1 npm run build) and the API only where TRIAL_ENABLED=1 (wrangler.toml [env.preview]).
export const TRIAL_LIVE = false;
const env = typeof process !== 'undefined' && process.env ? process.env : {};
export const TRIAL_PAGES = TRIAL_LIVE || env.TRIAL_PAGE === '1';
export const TRIAL = {
  minutes: 60,
  passDays: 7,
  app: { homelab: 'https://app.rack-density.com/homelabtwin/', dc: 'https://app.rack-density.com/dcsim/' },
};
