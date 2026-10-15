/**
 * All homepage copy lives here, grouped by section in page order.
 * Components only lay this out; edit words here, not in the components.
 *
 * House style: British English, no exclamation marks, no em dashes,
 * "you" is the client, "we" is Forta. Outcomes and ownership are the
 * subject; AI is the enabler, never the headline.
 */

import type { SourceId } from "./sources";

export type Stat = { value: string; label: string; source: SourceId };

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Operational transformation · UK mid-market",
  headline: ["Stop renting", "the software", "you run on."],
  subhead:
    "Forta replaces costly, ill-fitting SaaS and manual workarounds with bespoke internal systems, then trains your own people to run, maintain and extend them. You leave with lower costs, better operations and a team that can keep building.",
  primaryCta: { label: "Request an operational review", intent: "review" as const },
  secondaryCta: { label: "Estimate your savings", href: "#calculator" },
  proof: [
    { k: "You own", v: "The code, the data and the roadmap. In your repository from day one." },
    { k: "You keep", v: "A trained internal team who can ship changes without us." },
    { k: "You measure", v: "Every engagement is baselined before we build anything." },
  ],
};

/* ------------------------------------------------------------------ */
/* The cost of renting                                                 */
/* ------------------------------------------------------------------ */

export const costOfRenting = {
  index: "01",
  eyebrow: "The cost of renting",
  title: "Software has become a rent bill that rises every year.",
  lede:
    "Most mid-market firms did not choose their software estate. It accumulated: a tool per team, a licence per seat, a spreadsheet to bridge every gap. The bill compounds, and so does the friction.",
  stats: [
    {
      value: "+14%",
      label: "Forecast growth in worldwide software spend for 2025, driven largely by price rises and licence expansion.",
      source: "gartner-it-spend-2025",
    },
    {
      value: "$4,830",
      label: "Average SaaS spend per employee across Zylo's customer base, up 21.9% in a single year.",
      source: "zylo-smi-2025",
    },
    {
      value: "10–20%",
      label: "Price rises from several large SaaS vendors in 2025, against IT budgets growing 2.8%.",
      source: "gartner-saas-price-2025",
    },
    {
      value: "~4 hrs",
      label: "Lost per person, per week, reorienting after switching between applications.",
      source: "hbr-toggling-2022",
    },
  ] satisfies Stat[],
  closing:
    "The licence fee is the visible part. The larger cost sits in the hours your people spend re-keying data, chasing approvals and working around tools that were built for somebody else's process.",
};

/* ------------------------------------------------------------------ */
/* The third path                                                      */
/* ------------------------------------------------------------------ */

export type PathOption = {
  id: "rent" | "commission" | "own";
  label: string;
  name: string;
  summary: string;
  traits: { k: string; v: string }[];
  curve: "rising" | "stepped" | "flattening";
  highlight?: boolean;
};

export const thirdPath = {
  index: "02",
  eyebrow: "The third path",
  title: "Until recently, there were two ways to get software. Now there are three.",
  lede:
    "Firms have always had to choose between bending their process around a product or paying an agency to build, and then paying the agency again for every change. AI-assisted development has made a third option practical for non-specialist teams.",
  options: [
    {
      id: "rent",
      label: "Option A",
      name: "Rent it",
      summary: "Buy off-the-shelf SaaS and adapt your workflow to fit.",
      traits: [
        { k: "Fit", v: "Generic. Your process bends to the product." },
        { k: "Cost over time", v: "Rises with seats, tiers and annual uplifts." },
        { k: "Who changes it", v: "The vendor, on their roadmap." },
      ],
      curve: "rising",
    },
    {
      id: "commission",
      label: "Option B",
      name: "Commission it",
      summary: "Pay an agency or contractors to build something bespoke.",
      traits: [
        { k: "Fit", v: "Good on day one. Drifts as the business moves." },
        { k: "Cost over time", v: "Large upfront, then a change request for everything." },
        { k: "Who changes it", v: "Whoever still remembers how it works." },
      ],
      curve: "stepped",
    },
    {
      id: "own",
      label: "Option C",
      name: "Own it",
      summary: "Build bespoke systems with your own team, and train them to keep building.",
      traits: [
        { k: "Fit", v: "Exact, and it keeps fitting as you change." },
        { k: "Cost over time", v: "Front-loaded, then flattens as capability compounds." },
        { k: "Who changes it", v: "Your people, on your priorities." },
      ],
      curve: "flattening",
      highlight: true,
    },
  ] satisfies PathOption[],
  chartNote: "Cost shapes are illustrative, not data.",
  pullQuote: {
    lead: "Forta doesn't just improve your systems.",
    emphasis: "It improves your ability to create them.",
  },
};

/* ------------------------------------------------------------------ */
/* Why now                                                             */
/* ------------------------------------------------------------------ */

export const whyNow = {
  eyebrow: "Why now",
  title: "The economics of building software have moved. Most operating models have not.",
  points: [
    {
      value: "55.8%",
      label: "faster task completion for developers using an AI pair programmer in a controlled trial.",
      source: "peng-copilot-2023",
      body: "The cost of writing and changing code has fallen sharply. Work that once justified an agency can now be done by a capable analyst with the right method and guardrails.",
    },
    {
      value: "35%",
      label: "of surveyed builders have already replaced at least one SaaS tool with a custom build.",
      source: "retool-build-buy-2026",
      body: "Early movers are already replacing workflow tools, admin panels and reporting layers. The question is no longer whether, but which, and who will maintain them.",
    },
    {
      value: "48% → 71%",
      label: "of digital initiatives meet their targets, rising to 71% where business leaders co-own delivery.",
      source: "gartner-digital-2024",
      body: "Outcomes improve when the people who run the process help build the system. That is the model Forta is designed around.",
    },
  ] satisfies (Stat & { body: string })[],
};

/* ------------------------------------------------------------------ */
/* Outcomes                                                            */
/* ------------------------------------------------------------------ */

export const outcomes = {
  index: "03",
  eyebrow: "What changes",
  title: "Five things a CFO and a COO can both sign off.",
  items: [
    {
      n: "01",
      title: "Lower run-rate cost",
      body: "Retire duplicated tools, unused seats and premium tiers bought for one feature. Reduce spend on external developers for routine change.",
      measure: "Annual software and contractor spend",
    },
    {
      n: "02",
      title: "Faster, cleaner operations",
      body: "Fewer handoffs, fewer re-keyed fields, approvals that route themselves. Software shaped around how the work actually happens.",
      measure: "Cycle time, rework, hours on manual admin",
    },
    {
      n: "03",
      title: "Permanent internal capability",
      body: "A trained group of builders inside the business who can maintain what we deliver and create what comes next.",
      measure: "Changes shipped in-house after handover",
    },
    {
      n: "04",
      title: "Control of your own roadmap",
      body: "No waiting for a vendor's release cycle or an agency's availability. Your systems change when your business does.",
      measure: "Lead time from request to release",
    },
    {
      n: "05",
      title: "Less lock-in, cleaner data",
      body: "Your data in structures you own and understand, rather than spread across vendors who each hold a fragment.",
      measure: "Systems of record and integration points",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Method                                                              */
/* ------------------------------------------------------------------ */

export const method = {
  index: "04",
  eyebrow: "The Forta method",
  title: "Five phases. One direction: the pen moves to your team.",
  lede:
    "Every phase shifts responsibility from us to you. By handover, your people have built most of what they run, and have proved they can change it without us.",
  phases: [
    {
      n: "01",
      name: "Diagnose",
      duration: "3–4 weeks",
      body: "Map your workflows, tooling and spend. Find where cost and friction concentrate. Decide, honestly, what to build, what to keep and what to retire.",
      output: "Operational review, build-or-buy map, baselined business case",
      forta: 85,
    },
    {
      n: "02",
      name: "Design",
      duration: "2–3 weeks",
      body: "Specify the first systems with the people who will use them. Set the architecture, standards and guardrails your team will build within.",
      output: "System designs, technical standards, governance model",
      forta: 65,
    },
    {
      n: "03",
      name: "Build",
      duration: "6–10 weeks",
      body: "Build the first systems side by side with your nominated builders. They write real production code from week one, with us reviewing every change.",
      output: "Production systems, in your repository and infrastructure",
      forta: 45,
    },
    {
      n: "04",
      name: "Enable",
      duration: "4–6 weeks, overlapping",
      body: "Structured training on AI-assisted development, testing, security and change control. Your builders lead the second wave of work while we coach.",
      output: "Trained builders, playbooks, a working review process",
      forta: 25,
    },
    {
      n: "05",
      name: "Hand over",
      duration: "2 weeks",
      body: "An exit test: your team designs, builds and releases a real change unaided. We only leave when they pass it. Optional governance support continues quarterly.",
      output: "Signed-off exit test, documentation, ownership transferred",
      forta: 5,
    },
  ],
  gaugeLabels: { forta: "Forta", client: "Your team" },
};

/* ------------------------------------------------------------------ */
/* What we help build                                                  */
/* ------------------------------------------------------------------ */

export const systems = {
  index: "05",
  eyebrow: "What we help build",
  title: "Unglamorous systems that carry the business.",
  lede:
    "We focus where off-the-shelf fit is poorest and cost is highest: the workflows that make your firm different. Commodity software, such as your ledger, payroll and email, should usually stay exactly where it is.",
  items: [
    {
      name: "Operations control layer",
      body: "One view of work in progress across teams, replacing status meetings and spreadsheet trackers.",
      replaces: "Tracker spreadsheets, project tool sprawl",
    },
    {
      name: "Approval and sign-off flows",
      body: "Rules-based routing for spend, pricing, onboarding and exceptions, with a full audit trail.",
      replaces: "Email chains, form tools, manual chasing",
    },
    {
      name: "Client and partner portals",
      body: "Secure portals for document exchange, status and requests, shaped around your service model.",
      replaces: "Per-seat portal products, shared drives",
    },
    {
      name: "Relationship and pipeline tools",
      body: "Lean CRM built around how your teams actually sell, place or service, without the unused modules.",
      replaces: "Over-specified CRM tiers and add-ons",
    },
    {
      name: "Reporting and management information",
      body: "Live dashboards and board packs fed from your systems of record, not assembled by hand each month.",
      replaces: "Manual reporting packs, BI seat licences",
    },
    {
      name: "Intake and case management",
      body: "Structured intake, triage and case tracking for claims, requests, referrals or candidates.",
      replaces: "Shared inboxes, generic ticketing tools",
    },
    {
      name: "Data and integration layer",
      body: "Clean data flows between the systems you keep, so nobody re-keys the same record twice.",
      replaces: "Middleware subscriptions, copy and paste",
    },
    {
      name: "Niche internal tools",
      body: "The calculator, scheduler or checker that only your business needs and no vendor will ever build.",
      replaces: "Macros, fragile spreadsheets, workarounds",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Positioning                                                         */
/* ------------------------------------------------------------------ */

export type Mark = "full" | "part" | "none";

export const positioning = {
  index: "07",
  eyebrow: "Where Forta sits",
  title: "Not a consultancy, an agency or a training provider. The useful parts of each.",
  lede:
    "Each of the usual options does one part of the job well. The value is in doing all of it in one engagement, and leaving nothing behind that depends on us.",
  columns: ["Strategy consultancy", "Software agency", "AI training provider", "Off-the-shelf SaaS", "Forta"],
  rows: [
    { k: "Builds the commercial case", marks: ["full", "none", "none", "none", "full"] },
    { k: "Delivers working software", marks: ["none", "full", "none", "full", "full"] },
    { k: "Fits your exact process", marks: ["part", "full", "none", "none", "full"] },
    { k: "Your people can change it", marks: ["none", "none", "part", "part", "full"] },
    { k: "Leaves capability behind", marks: ["part", "none", "full", "none", "full"] },
    { k: "No ongoing dependency", marks: ["full", "none", "full", "none", "full"] },
    { k: "Live on day one", marks: ["none", "none", "none", "full", "part"] },
  ] as { k: string; marks: Mark[] }[],
  legend: { full: "Strong", part: "Partial", none: "Not the focus" },
  footnote:
    "Where off-the-shelf software already fits, it is usually live sooner. That is why the operational review starts by deciding what to keep.",
};

/* ------------------------------------------------------------------ */
/* Illustrative engagement archetypes                                  */
/* ------------------------------------------------------------------ */

export const archetypes = {
  index: "08",
  eyebrow: "Engagement archetypes",
  title: "The situations we are built for.",
  disclaimer:
    "Illustrative archetypes, not client case studies. Each describes a common pattern and the measures we would baseline during Diagnose.",
  items: [
    {
      tag: "Professional services · 400 staff",
      title: "Twelve tools doing the job of four",
      situation:
        "Practice management, a CRM, two form builders, a portal product and a web of spreadsheets, each bought by a different team. Nobody trusts the utilisation numbers.",
      build: "A single operations layer for matters, resourcing and approvals, integrated with the ledger they keep.",
      measures: ["Licences retired", "Hours on month-end reporting", "Time from instruction to mobilised team"],
    },
    {
      tag: "Recruitment · 250 staff",
      title: "The process lives between the systems",
      situation:
        "The ATS handles candidates; everything around it, from compliance checks to client approvals to timesheets, runs on email and copy-paste.",
      build: "Compliance and placement workflows around the ATS, plus a client approval portal, maintained by the ops team.",
      measures: ["Re-keyed fields per placement", "Days to compliant start", "Agency spend on change requests"],
    },
    {
      tag: "Insurance · 600 staff",
      title: "Handoffs that leak time and risk",
      situation:
        "Referrals between underwriting, claims and finance move by inbox. Exceptions are tracked in personal spreadsheets, and audit requests take days to answer.",
      build: "Rules-based referral and exception routing with a full audit trail, and live MI for team leaders.",
      measures: ["Referral cycle time", "Items without an owner", "Hours to answer an audit request"],
    },
    {
      tag: "Specialist B2B services · 180 staff",
      title: "Paying enterprise prices for a niche need",
      situation:
        "A premium platform tier bought for two features. The rest of the workflow is unsupported, and every change needs an external developer.",
      build: "A focused internal tool replacing the premium tier, built and now extended by two trained analysts.",
      measures: ["Annual platform cost", "External developer spend", "Requests shipped in-house per quarter"],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Engagement model                                                    */
/* ------------------------------------------------------------------ */

export const engagement = {
  index: "09",
  eyebrow: "Engagement model",
  title: "Start with a fixed-fee diagnosis. Commit further only if the case is there.",
  stages: [
    {
      name: "Operational review",
      shape: "Fixed fee · 3–4 weeks",
      body: "A standalone diagnosis of spend, workflows and capability, ending in a baselined business case and a build-or-buy map. Yours to keep whether or not we go further.",
    },
    {
      name: "Transformation engagement",
      shape: "Typically £75k–£250k · 4–6 months",
      body: "Design, build and enablement of the first wave of systems, ending in a formal handover and exit test. Scoped from the review, priced in fixed phases.",
    },
    {
      name: "Governance support",
      shape: "Optional · quarterly",
      body: "Architecture reviews, security checks and coaching for your builders as the estate grows. Designed to taper, not to become a dependency.",
    },
  ],
  ctas: { primary: "Request an operational review", secondary: "Explore a transformation engagement" },
  whoFor: {
    title: "Who it suits",
    items: [
      "UK firms of roughly 100 to 1,000 people",
      "Meaningful SaaS and contractor spend with uneven value",
      "Operations that are specialised, regulated or handoff-heavy",
      "Leadership willing to nominate internal builders",
    ],
  },
  whoInvolved: {
    title: "Who we need from you",
    items: [
      "An executive sponsor, usually the COO or CFO",
      "Process owners for each workflow in scope",
      "Two to six nominated builders. Analysts, ops leads and power users; no coding background required",
      "IT and information security, from the first week",
    ],
  },
  commitments: {
    title: "Our commitments",
    items: [
      "Code and data in your repository and infrastructure from day one",
      "Baselines agreed before we build, measured after",
      "We will tell you what not to build",
      "We leave only when your team passes the exit test",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Closing CTA and contact                                             */
/* ------------------------------------------------------------------ */

export const closing = {
  index: "11",
  eyebrow: "Begin",
  title: ["Own the systems", "you run on."],
  body:
    "Start with an operational review. In three to four weeks you will know what your software estate really costs, where the friction sits and what is worth building. If the case is not there, we will tell you.",
  intents: [
    { id: "review", label: "Request an operational review" },
    { id: "call", label: "Book a strategy call" },
    { id: "engagement", label: "Explore a transformation engagement" },
  ] as const,
  direct: { label: "Or write to us", email: "hello@forta.example" },
  responseNote: "A partner replies within two working days.",
};

export type Intent = (typeof closing.intents)[number]["id"];
