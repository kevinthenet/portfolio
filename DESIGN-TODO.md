# Design pass TODOs

Direction E ("Uplink // Terminal" — terminal x cyberpunk) has been applied
site-wide: design tokens, typography, nav chrome, hero, Selected Work
section, project scan-rows, testimonial decrypt-panels, and tech/skill
pill chips are all in place with light/dark themes and responsive layout.

## Resolved in this pass

- ~~Mobile layout is unaddressed~~ — `@media` queries added throughout
  (nav, hero, project grid, chip layout, decrypt panels, blog images). The
  `--default-width`/`--reader-width` vw-based columns now collapse to
  100vw under 800px.
- ~~Technologies/Skills lists have no defined overflow handling~~ —
  replaced with wrapping pill chips (`ProjectHighlight.astro`).
- ~~Project detail layout is a rigid 2-column grid~~ — now stacks on
  mobile (`.project-highlight` media query).
- ~~Slideshow interaction is still click-driven prev/next~~ — rebuilt
  `Slideshow.astro` on native CSS scroll-snap (`scroll-snap-type: x
mandatory`), so swipe/trackpad/arrow-key navigation work for free via
  the browser's own scroll handling. Prev/next buttons and breadcrumbs
  now call `scrollIntoView`, and an `IntersectionObserver` keeps the
  active breadcrumb in sync as the user scrolls or swipes.
- ~~Rowland.ai, PVcase, and DexCare had no `photos` at all~~ — sourced
  and cropped hero/product screenshots for all three, refreshed the
  stale Redox landing screenshot and added two new Redox product shots,
  and reorganized `public/` into one subfolder per project
  (`public/<project>/...`) with real alt text on every image.
- ~~Site-wide OG/Twitter social-card image was a placeholder~~ —
  `Head.astro` pointed `og:image`/`twitter:image` at
  `android-chrome-512x512.png` (the app icon). Designed a 1200x630 card
  in the "Uplink // Terminal" system (`public/og-image.png`): bracket
  corners, boot-log lines, the glitch headline treatment toned down to a
  legible static sliver, JetBrains Mono throughout. Also fixed
  `twitter:card` from `summary` to `summary_large_image` (it was
  mismatched with a 1200x630 image) and added `og:image:width/height/type`.

## Still open

- **Link-preview / share imagery for project pages.** Every project now
  has sourced `photos`, but there's still no per-project OG/social image
  or iframe embed strategy — every page currently shares the one
  site-wide `og-image.png` rather than a per-project card.
- **`chb-navigation.gif` (26MB) still needs re-encoding/compression** (or
  converting to `<video>`/webp) — no compression tooling (ffmpeg/gifsicle)
  was available in this environment to do it inline. Still a severe Core
  Web Vitals hit on the Castro Home Builders project page.
- **Migrate `<img>` tags to Astro's `<Image />`/`<Picture />`**
  (astro:assets) across `Slideshow.astro`, `Card.astro`, and
  recommendation photos for automatic resizing and AVIF/WebP output.
