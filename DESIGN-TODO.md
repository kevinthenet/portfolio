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
- ~~`<img>` tags weren't running through Astro's `<Image />`~~ — moved
  every project/recommendation photo from `public/` into `src/assets/`,
  switched the `photos`/`profileImage` content-collection schemas to the
  `image()` helper, and rewired `Slideshow.astro` and `Card.astro` onto
  `<Image />` with `widths`/`sizes` for a responsive srcset. Sharp wasn't
  actually installed (only present transitively in the lockfile), so
  builds silently had no optimized-image service; added it as an explicit
  devDependency. Output is now real: e.g. `chb-home-page-desktop.png`
  went from a 2.99MB PNG to a 112KB webp variant at the rendered width.
  Removed `chb-navigation.gif` and `chb-contact-page-submission.gif`
  entirely rather than migrating them — animated GIFs can't survive
  Sharp's optimizer (it'd flatten them to one frame), no compression
  tooling was available to re-encode them as video, and they were the
  only motion demos on the site against five other projects that rely on
  static screenshots alone. The two static desktop/mobile shots stay.
- ~~Every project page shared the one site-wide `og-image.png`~~ —
  generated a per-project 1200x630 card for all six projects
  (`public/og/<slug>.png`) in the same "Uplink // Terminal" template,
  swapping in each project's real name/tag/date/subtitle/blurb (headline
  size scales down for longer names so nothing clips or overflows).
  Threaded an optional `image` prop through `Head.astro` → `Base.astro`
  → `ProjectHighlightLayout` (which now also grabs the collection entry's
  `id` to resolve `/og/${id}.png`); every other page keeps falling back
  to the site-wide default. No iframe-embed strategy was pursued — a
  static per-project image covers the actual link-preview use case.

## Still open

Nothing outstanding from this pass. Next design work starts fresh.
