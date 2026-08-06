// Plain .js (not .ts) on purpose: this is imported both by the Astro site
// (src/pages/index.astro) and by the standalone tools/og-cards/generate.mjs
// script, which runs under plain `node` with no TS loader — keeping this
// dependency-free JS lets both sides share one source of truth instead of
// hand-syncing "N years" in two places.

export const CAREER_START_YEAR = 2019;

export function getYearsOfExperience(referenceDate = new Date()) {
  return referenceDate.getFullYear() - CAREER_START_YEAR;
}
