# Design pass TODOs (Phase 3)

Captured during the Phase 1 content refresh, for the visual design pass.

- **Link-preview / share imagery for project pages.** When a project page URL is shared (Slack, LinkedIn, iMessage), there's currently no per-project OG/social preview image or iframe embed strategy. Decide: static screenshot per project (existing `photos` front matter could supply the OG image), a generated preview, or an embeddable iframe of the live project where applicable. Rowland.ai, PVcase, and DexCare currently have no `photos` at all, so this also needs sourcing/approving imagery for those three before it can be wired up.
- **Slideshow/technologies/skills UX is clunky.** On `ProjectHighlight.astro`, the photo slideshow (`Slideshow.astro`) uses click-driven prev/next arrows over a fixed-height container, and the Technologies/Skills lists (`ProjectHighlight.astro`) are plain `<ul>`s in a two-column grid with no defined overflow handling. Needs a proper interaction/layout pass, likely swipeable/keyboard-navigable carousel and pill-style tags for tech/skills that wrap or scroll cleanly at all viewport widths.
