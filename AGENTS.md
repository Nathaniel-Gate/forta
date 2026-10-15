# AGENTS.md: guide for coding agents working on Forta

Read this before changing anything. It is short on purpose.

## What this is

A single-page marketing site for Forta, which makes companies AI-native: client
teams learn to build with AI, and rented software is replaced by systems they own.
Written for a 10-second visit. The lead offer is the free stack rebuild (form in
the hero and at /stack, the link used in outreach; requests go to /api/stack).

**Keep the craft.** The owner's direction (15 Oct 2026): a plain, static page reads
as MORE machine-made, not less. Keep the blueprint grid, registration marks,
numbered drawing-sheet section labels, the plotted hero/system drawing, the serif
italic accent, reveals, Lenis smooth scroll and the glow on primary buttons.
What to avoid is generic filler: purple gradients, stock illustrations, pulsing
"live" dots (removed at the owner's request), and copy tells (fragment chains,
"not X, it's Y", buzzwords, implying a track record Forta doesn't have yet).
Next.js 16 (App Router, Cache Components on), React 19, TypeScript, Tailwind v4.
Hosted on GitHub as a shareable repo. Do not deploy anywhere without the owner asking.

## Architecture in one screen

```
src/
  app/
    layout.tsx           fonts, metadata, <SmoothScroll>
    page.tsx             section order (the narrative). Section ids = nav anchors
    globals.css          ALL design tokens (@theme) + shared surface classes
    api/enquiry/route.ts contact form handler (shared Zod schema)
    api/stack/route.ts   free stack rebuild requests -> .data/stack-requests.ndjson
    stack/page.tsx       stand-alone outreach landing page for the stack offer
  content/               ALL copy. Edit words here, never in components
    home.ts              per-section copy, in page order
    stack.ts             free stack rebuild offer copy and tool suggestions
    faq.ts, navigation.ts
    sources.ts           every statistic's citation (numbered refs in footer)
  config/calculator.ts   every calculator input range and assumption
  lib/
    calculator.ts        pure maths, unit-tested (calculator.test.ts)
    enquiry-schema.ts    Zod schema shared by form + API
    intent.ts            DOM events: CTA -> form intent, calculator -> form estimate
    format.ts, cn.ts
  components/
    ui/        primitives (Section, SectionHeader, Reveal, ButtonLink, CountUp, SourceRef, Logo)
    layout/    Nav, Footer, SmoothScroll
    sections/  one file per page section
    visuals/   OwnershipSchematic (hero drawing, desktop only)
public/team/   director photos (from LinkedIn), rendered greyscale
```

## Rules

1. **Copy lives in `src/content/`.** Components only lay it out.
2. **No statistic without a source.** Add it to `sources.ts` first, cite with
   `<SourceRef id>` or `<SourceLabel id>`. Never invent numbers, clients or
   credentials. Team credentials must match the directors' LinkedIn profiles.
3. **Tokens, not hex.** Colours, fonts, easings are in `globals.css` `@theme`.
   `steel-500` is the dimmest text allowed on dark surfaces (contrast floor).
   On paper surfaces, keep ink text at 70% opacity or more.
4. **Blue (`signal`) is rare.** Live states, the capability line, focus rings.
   If you are adding a third blue thing to a section, don't.
5. **Motion is rare and must be hydration-safe.** Never branch rendered markup on
   `useReducedMotion()`; keep `initial`/`animate` identical and set the
   transition to `{ duration: 0 }` when reduced. See `Reveal.tsx`.
6. **Calculator maths changes need tests.** Run `npm test`. Knobs belong in
   `config/calculator.ts`, not inline.
7. **Paper vs ink sections.** `<Section tone="paper">` sets `data-tone`, which
   flips hairline tokens. Use `hairline` / `var(--hairline)` for borders.
8. House style: British English, no exclamation marks, no em dashes.

## Checks before you finish

```
npm run typecheck && npm run lint && npm test && npm run build
```

Then view at 1440, 834 and 390 widths, with and without reduced motion.

## Adding a section

1. Copy into `content/home.ts` (or a new content file).
2. Component in `components/sections/`, wrapped in `<Section>` with a
   `<SectionHeader>`; give the `<h2>` an id and pass it as `labelledBy`.
3. Add to `app/page.tsx` in narrative order; add a nav link only if it earns one.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
