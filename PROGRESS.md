# PROGRESS

Status as of 15 Oct 2026: **complete.** Runs locally; source published to GitHub (Nathaniel-Gate/forta). Not deployed to any host.

## Revision 3 (15 Oct 2026): free stack rebuild offer, AI tells removed

- Lead offer: "Get your tech stack rebuilt, free", back within three hours. A 3-field form (tools
  as chips with quick picks, company, work email) sits in the hero and on /stack, a stand-alone
  page for outreach links. Requests are validated by a shared Zod schema and stored locally.
- AI-tell audit, based on published lists of AI web-design and writing tells (925 Studios,
  Noqta, Wikipedia-derived writing guides). Removed: numbered mono eyebrows and uppercase tracked
  labels, the pulsing dot, serif-italic accent words, blueprint grid, grain and glow backgrounds,
  gradient hairlines, glowing buttons, fade-ins on every block, Lenis smooth scrolling, the hero
  drawing, arrows on secondary buttons and middle-dot separators.
- Copy rewritten in plain first-person sentences: no fragment chains, no forced triplets
  (sections now have 2, 4, 5 or 7 items), named people in the hero, and no implied track record.
- QA: no console errors at 1440, 834 and 390 in both motion modes, no overflow, 0 axe violations,
  both stack forms validate, save and confirm.
- Open: the three-hour promise has no alert behind it yet (see README).

## Revision 2 (15 Oct 2026): AI-native, 10-second site

Owner feedback: too much text; visitors give it under 10 seconds; the real offer is
a better team and a step into AI-native ways of working; add the two directors.

- Repositioned to "Make your company AI-native." Ownership and cost savings are now supporting pillars.
- Hero shows the offer plus three big numbers above the fold at 1440x900 (16 weeks, 100% yours, 3-week review).
- Cut from 12 sections to 9: removed the third-path essay, outcomes list, systems catalogue,
  comparison table and archetypes. FAQ cut to six one-to-two sentence answers.
- New sections: Why now (three sourced numbers), What you get (three pillars plus a list of what teams build), Team.
- Team: Nathaniel Gate (Senior Associate, Moody's; MSc Warwick) and Oree Golan (former Senior Software
  Engineer, HubSpot, Agent Platform; Product Builder, Anima; co-founder and CTO, unidingo), both Directors.
  Credentials and photos taken from their LinkedIn profiles on 15 Oct 2026. Photos render greyscale, colour on hover.
- Sources trimmed to the four still cited on the page.
- QA rerun: no console errors at 1440, 834 and 390 in both motion modes, no overflow, form flow passes, 0 axe violations.
- The hero drawing is hidden below 1024px so the numbers come up sooner on phones.

The sections below record the first build; parts of them describe sections that no longer exist.

## Plan (as executed)

1. Research: positioning, credible benchmark data, library choices.
2. Strategy: narrative order, message hierarchy, evidence selection, CTA strategy, visual language.
3. Build: tokens, content files, calculator model with tests, sections, form and API.
4. Three review-and-fix passes (browser QA at 1440, 834 and 390px, with and without reduced motion).
5. Final checks and documentation.

## Key decisions

**Narrative.** Problem (the rent bill), idea (the third path: rent, commission, own), payoff (five outcomes, each with the metric we'd baseline), method (with a "who holds the pen" gauge showing ownership moving to the client), scope (what we build, and what we *don't*), numbers (calculator), category (comparison), fit (illustrative archetypes), commercial shape, objections (FAQ), ask.

**Headline.** "Stop renting the software you run on." It names the economic problem (rent) and the ownership answer in one line, without AI in the headline. AI-assisted development appears as the enabler in "Why now", not the hero.

**Credibility devices for a sceptical CFO.**
- Every statistic is cited, with a numbered reference list and caveats (sample, vendor bias) in the footer.
- The calculator shows its formula and assumptions, separates cash (software retired) from capacity (time returned), and uses conservative defaults.
- The comparison table includes a row where Forta is *not* the strongest ("Live on day one"), plus a footnote saying where off-the-shelf wins.
- "We will tell you what not to build" and a fixed-fee standalone review lower the risk of the first commitment.
- Archetypes are explicitly labelled illustrative and list what we would *measure*, not invented results.
- Pricing shown as "Typically £75k–£250k", scoped after the review.

**Visual language.** Greyscale, architectural, blueprint idiom: drawing-sheet section numbers, mono annotations, a hero "technical drawing" of the client's own operating system that plots itself, cost-curve sketches. One accent (signal blue) used for live states, the capability line and focus only. Alternating ink and paper sections for editorial rhythm.

**Libraries.** Motion, Lenis, React Hook Form, Zod, Radix Accordion, Vitest. Rejected component-effect kits (Aceternity, Magic UI, etc.) and R3F because their signature effects read as generic AI-startup. All visuals are bespoke SVG.

## Research: figures used and why

| Figure | Source | Why it's there |
| --- | --- | --- |
| Software spend +14% in 2025 | Gartner, Oct 2024 | Rent is rising, largely through price |
| US$4,830 SaaS per employee, +21.9% | Zylo SMI 2025 | Scale and growth of per-head cost |
| 10–20% vendor price rises vs 2.8% IT budget growth | Gartner via CIO.com, Dec 2025 | The squeeze CFOs feel |
| ~4 hrs/week lost to app toggling | HBR, 2022 | Hidden friction cost |
| 55.8% faster task completion with AI pair programmer | Peng et al., 2023 (RCT) | Why building is newly cheap (caveated as one task) |
| 35% have replaced a SaaS tool with a custom build | Retool, 2026 | Others are already doing it (caveated as vendor survey) |
| 48% → 71% digital initiatives hit targets when business co-owns delivery | Gartner, Oct 2024 | Evidence for the capability-transfer model |
| £39,039 UK median FT salary | ONS ASHE 2025 | Grounds the calculator default |
| 60% of time on "work about work" | Asana, 2021 | Kept in sources; not surfaced in the page body |
| 101 apps per company | Okta, 2025 | Kept in sources; not surfaced in the page body |

Rejected: "70% of digital transformations fail" (commonly misattributed to McKinsey; no primary measurement found).

Note: the Asana and Okta sources appear in the reference list but not in the page body. Either surface them or remove them from `sources.ts`.

## Calculator model

`src/lib/calculator.ts`, assumptions in `src/config/calculator.ts`.

- Loaded hourly cost = salary × 1.25 ÷ (37.5 hrs × 46 weeks)
- Friction cost = affected staff × hours lost/week × 46 × hourly cost
- Upside = SaaS × (10% | 20%) + friction × (25% | 40%), for conservative | expected
- Payback = £150k reference fee ÷ monthly conservative upside

Verified by hand-worked unit tests (default case: £274,500 to £460,800). Inputs are clamped to configured ranges.

## Completed work

- All sections from the brief (A to M), plus "Why now" and a references footer
- Savings calculator: sliders, typed exact values, keyboard support, count-up results, assumptions disclosure, optional attach-to-enquiry
- Enquiry form: three intents preselected by CTAs across the page, Zod validation on client and server, honeypot, success state with reference, error state; stored locally in `.data/enquiries.ndjson`
- Responsive nav with accessible mobile menu (Esc closes, focus returns)
- Reduced motion: Lenis smoothing off, all transitions zero-duration, SMIL pulse hidden
- README.md, AGENTS.md, PROGRESS.md

## Review passes

Tools: Playwright (headless Chromium) scripts for screenshots, console capture, overflow detection, interaction flows and axe-core. The Chrome extension was not connected in this session, so Playwright was used instead.

**Pass 1 (engineering QA)**
- Hydration mismatch under reduced motion (markup branched on `useReducedMotion`). Fixed: identical markup, zero-duration transitions.
- "Own it" cumulative cost curve dipped downward, which a cumulative figure cannot do. Redrawn monotonic.
- Anchor scrolling double-applied the nav offset (Lenis offset plus CSS scroll-padding). Fixed; every anchor now lands 68px from the top.
- Method gauge rounded 95% up to a full bar. Now rounds down.
- Lint: setState-in-effect in CountUp (rewritten to write to the DOM) and RHF `watch` (now `useWatch`).

**Pass 2 (design and accessibility)**
- Comparison table was all "Strong" for Forta, which reads as self-serving. Added an honest "Live on day one" row and footnote.
- Blue accent overused in Engagement. Reduced to steel.
- No CTA for "strategy call" or "transformation engagement" intents. Added in FAQ and Engagement.
- Mobile overflow from the hero eyebrow. Fixed.
- axe-core: 123 colour-contrast failures (small mono labels, paper captions). Raised the steel scale and paper opacities at token level. **Result: 0 axe violations at 1440 and 390.**

**Pass 3 (copy and CFO lens, production build)**
- Clarified Zylo figure is from its customer base; labelled calculator outputs as cash vs capacity.
- Production build (`next start`): no console errors at three widths in both motion modes, no horizontal overflow, form flow passes, API returns 422/400 on bad input, all anchors correct, 0 axe violations.

## Final check results

- `npm run typecheck`: pass
- `npm run lint`: pass, 0 warnings
- `npm test`: 4/4 pass
- `npm run build`: pass (page prerendered static, `/api/enquiry` dynamic)

## Outstanding and limitations

1. **No team or credentials section.** The biggest credibility gap for a £150k buyer. It needs real people, backgrounds and, later, real case studies. None were invented.
2. **Placeholder contact email** `hello@forta.example` (`content/home.ts`). Replace before any real use.
3. **Footer line** "Forta is a working brand concept." Remove when the brand is real.
4. **Form storage is local only.** Wire `store()` to a CRM or email service for production, and add rate limiting.
5. **No Open Graph image** and no analytics.
6. **Not tested** in Safari or Firefox, or on real iOS/Android devices; only headless Chromium. Range-slider styling uses WebKit and Mozilla pseudo-elements and should be eyeballed in Firefox.
7. Hero drawing labels are very small on phones. They are decorative (aria-hidden), but a simplified mobile drawing would be nicer.
8. `npm audit` reports advisories inherited from the create-next-app template; not investigated.
9. Sources were checked through search summaries and the primary Zylo, Gartner and ONS pages. The HBR and Retool figures were confirmed from multiple secondary reports, not the full original papers.
