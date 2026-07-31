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

## Still open

- **Slideshow interaction is still click-driven prev/next.** Pills fixed
  the tag-list clunkiness, but `Slideshow.astro` itself doesn't support
  swipe or arrow-key navigation yet — still worth a pass if the photo
  count per project grows.
- **Link-preview / share imagery for project pages.** No per-project
  OG/social image or iframe embed strategy yet. Rowland.ai, PVcase, and
  DexCare still have no `photos` at all — needs sourcing before this can
  be wired up.
- **Site-wide OG/Twitter social-card image is a placeholder** —
  `Head.astro` points `og:image`/`twitter:image` at
  `android-chrome-512x512.png` (the app icon). Needs a real 1200x630 card
  designed in the new visual system.
- **`chb-navigation.gif` (26MB) still needs re-encoding/compression** (or
  converting to `<video>`/webp) — no compression tooling (ffmpeg/gifsicle)
  was available in this environment to do it inline. Still a severe Core
  Web Vitals hit on the Castro Home Builders project page.
- **Migrate `<img>` tags to Astro's `<Image />`/`<Picture />`**
  (astro:assets) across `Slideshow.astro`, `Card.astro`, and
  recommendation photos for automatic resizing and AVIF/WebP output.
