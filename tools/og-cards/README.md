# OG/share card generator

Generates the site's 1200x630 OG/Twitter share cards as static PNGs. This is
a **standalone dev tool, not part of the Astro site** — it has its own
`package.json`/`node_modules` so `pnpm install` at the repo root never pulls
in Playwright, and nothing here is imported by `src/`. Astro only processes
`src/` and `public/`, so this directory is invisible to the built site.

## Why this exists

OG/Twitter meta tags need a real static image file at a stable URL — social
crawlers don't execute JS or render CSS, so the card can't just be "the page,
screenshotted live." This tool renders one static HTML template per card
(matching the site's "Uplink // Terminal" design system: dark bg, corner
brackets, boot-log lines, a toned-down static sliver of the `.glitch-ambient`
hover effect from `src/styles/global.css`, JetBrains Mono) with a headless
browser, then downsamples with `sharp` for crisp text.

Card copy is **read directly from content-collection frontmatter**
(`src/content/projects/*.md`, `src/content/blog/*.md`) rather than
duplicated into a config file, so a card can never drift out of sync with
the actual project/post copy — if you update a project's `subtitle`, just
rerun the generator.

## One-time setup

```sh
cd tools/og-cards
npm install
npx playwright install chromium
```

## Usage

```sh
node generate.mjs                      # regenerate every card
node generate.mjs --only=rowland-ai    # regenerate one project by id
node generate.mjs --only=my-post-slug  # regenerate one blog post by id
```

Run this whenever:

- A new project is added to `src/content/projects/`.
- A new post is published in `src/content/blog/`.
- A project's `name`/`subtitle`/`tag`/`date`/`blurb` or a post's
  `title`/`summary`/`tags` changes.
- The template itself changes and every card needs a refresh.

## Output conventions

| Card                              | Output path                    | Consumed by              |
| --------------------------------- | ------------------------------ | ------------------------ |
| Site-wide (Kevin Castro identity) | `public/og-image.png`          | `Head.astro` default     |
| Project                           | `public/og/<project-id>.png`   | `ProjectHighlight.astro` |
| Blog post                         | `public/og/blog/<post-id>.png` | `Blog.astro`             |

`<project-id>`/`<post-id>` are the content collection's `id` — i.e. the
`.md` filename without extension, same as the URL slug (`/work/<id>`,
`/blog/<id>`).

The layouts resolve these paths through `src/utils/og-image.ts`
(`resolveOgImage`), which checks the file actually exists at build time and
falls back to the site-wide default if it doesn't. **This means a missing
card is a silent fallback, not a build error** — always run this generator
for a project/post before (or right after) publishing it, since nothing
will remind you otherwise.

## Card content mapping

**Projects** (`src/content/projects/*.md` frontmatter):

- Boot line 1: `project: <name>`
- Boot line 2: `<tag> / <date>` (or just `<tag>` if no `date`)
- Headline: `name`
- Metric (green line): `subtitle`
- Tagline (dim line): `blurb`
- Prompt: `cd work/<id>`

**Blog posts** (`src/content/blog/*.md` frontmatter):

- Boot line 1: `post: <title>`
- Boot line 2: `<first tag> / <publish year>`
- Headline: `title`
- Metric (green line): up to 3 `tags`, joined with `·` — blog frontmatter
  only has one descriptive field (`summary`), so tags fill the metric slot
  instead of repeating the tagline
- Tagline (dim line): `summary`
- Prompt: `cat blog/<id>.md`

**Site-wide** card content is hardcoded in `generate.mjs` (it isn't sourced
from a collection) — edit it there directly if the hero copy on `/` changes.

## Design system reference

Colors, fonts, and the corner-bracket/boot-log motifs are copied from
`src/styles/global.css`'s CSS custom properties (`--bg`, `--green`,
`--magenta`, `--cyan`, `--text-dim`, `--border`) and `.bracket-frame`/`.boot`
classes, so the cards stay visually consistent with the live site without
needing to share actual CSS (crawlers render the PNG, not the site's
stylesheet). If the site's Direction E ("Uplink // Terminal") palette or
type system changes, update the `:root` block in `template.html` to match.

Headline and metric-line font sizes auto-shrink for longer strings
(`headlineSize`/`metricSize` in `generate.mjs`) so project/post names and
subtitles of varying length don't clip or force awkward wraps — check the
rendered PNG after adding anything unusually long.
