# Forta

Marketing site for **Forta**, which makes companies AI-native: it trains client
teams to build with AI, replaces rented software with systems they own, and cuts
costs. Directors: Nathaniel Gate and Oree Golan.

## Run it locally

Needs [Node.js](https://nodejs.org) 20.9 or newer (22 LTS recommended).

```bash
git clone https://github.com/Nathaniel-Gate/forta.git
cd forta
npm install
npm run dev          # open http://localhost:3000
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` | TypeScript, no emit |
| `npm run lint` | ESLint (Next config) |
| `npm test` | Vitest unit tests for the savings calculator |

Free stack rebuild requests (hero form and `/stack`) go to `.data/stack-requests.ndjson`,
contact enquiries to `.data/enquiries.ndjson` (both gitignored). Before going live,
add an email or Slack alert in `src/app/api/stack/route.ts`: the offer promises a reply
within three hours. To go live, swap the `store()` call in
`src/app/api/enquiry/route.ts` for a CRM or email provider.

## Stack and why

| Choice | Reason |
| --- | --- |
| Next.js 16 App Router, React 19, TypeScript | Static-first page with one API route for the form |
| Tailwind CSS v4 with `@theme` tokens | One file (`globals.css`) holds the whole design system |
| Motion (`motion/react`) | The method gauge and calculator count-ups only |
| React Hook Form + Zod | Form state and validation; the same schema validates on the server |
| Radix Accordion | Accessible FAQ |
| Vitest | Calculator maths is tested by hand-worked cases |

Considered and deliberately not used: shadcn/ui component kits, Aceternity,
Magic UI and React Three Fiber. Their stock effects (spotlights, beams, 3D
globes) are exactly the "AI startup" look this brand avoids; every visual here
is a bespoke SVG in the blueprint idiom. GSAP was unnecessary next to Motion.

Fonts: Hanken Grotesk for everything, IBM Plex Mono for a few figures, via `next/font`.

## Project structure

```
src/app/            layout, page (section order), globals.css (tokens), api/enquiry
src/content/        all copy: home.ts, faq.ts, navigation.ts, sources.ts
src/config/         calculator.ts (inputs, ranges, assumptions)
src/lib/            calculator maths + tests, form schema, formatting, intent events
src/components/     ui/ primitives, layout/ chrome, sections/ page sections, visuals/ SVG drawings
```

## Editing

- **Copy:** `src/content/home.ts` is ordered like the page. FAQ in `faq.ts`, nav and footer in `navigation.ts`.
- **Statistics:** add the source to `src/content/sources.ts`, then reference it by id. The footer reference list builds itself.
- **Colours, type, easing:** `src/app/globals.css`, under `@theme`.
- **Calculator assumptions:** `src/config/calculator.ts`. Run `npm test` after changing maths.
- **Section order:** `src/app/page.tsx`. Nav anchors in `navigation.ts` must match section ids.
- **Contact email:** `closing.direct.email` in `home.ts` (currently a placeholder, `hello@forta.example`).

See `AGENTS.md` for conventions and `PROGRESS.md` for decisions, testing and open items.
