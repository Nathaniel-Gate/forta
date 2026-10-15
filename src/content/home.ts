/**
 * All homepage copy lives here, grouped by section in page order.
 * Components only lay this out; edit words here, not in the components.
 *
 * House style: British English, no exclamation marks, no em dashes.
 * Write for a 10-second skim: every section must make its point in its
 * title and big numbers alone. Body text is optional reading.
 */

import type { SourceId } from "./sources";

export type Stat = { value: string; label: string; source: SourceId };

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "AI-native transformation · UK",
  headline: ["Make your", "company", "AI-native."],
  subhead:
    "We train your team to build with AI, replace the software you rent with systems you own, and leave you with lower costs and a faster business.",
  primaryCta: { label: "Book a strategy call", intent: "call" as const },
  secondaryCta: { label: "See your savings", href: "#calculator" },
  /** The 10-second promise: three numbers a visitor can take away. */
  proof: [
    { value: "16 weeks", label: "to a team that builds with AI" },
    { value: "100%", label: "of the code, data and skills stay yours" },
    { value: "3 weeks", label: "fixed-fee review shows your savings first" },
  ],
};

/* ------------------------------------------------------------------ */
/* Why now (evidence)                                                  */
/* ------------------------------------------------------------------ */

export const whyNow = {
  index: "01",
  eyebrow: "Why now",
  title: "AI changed how software gets built. Most companies still rent it.",
  stats: [
    {
      value: "55%",
      label: "faster coding with an AI assistant, in a controlled trial",
      source: "peng-copilot-2023",
    },
    {
      value: "+14%",
      label: "rise in software spend in 2025, driven by price rises",
      source: "gartner-it-spend-2025",
    },
    {
      value: "71%",
      label: "of projects hit target when the business co-builds, vs 48%",
      source: "gartner-digital-2024",
    },
  ] satisfies Stat[],
};

/* ------------------------------------------------------------------ */
/* What we do                                                          */
/* ------------------------------------------------------------------ */

export const whatWeDo = {
  index: "02",
  eyebrow: "What you get",
  title: "A better team. Systems you own. Lower costs.",
  pillars: [
    {
      n: "01",
      title: "An AI-native team",
      body: "Your people learn to build and run software with AI. The skill stays when we leave.",
    },
    {
      n: "02",
      title: "Systems you own",
      body: "We replace costly, ill-fitting tools with software built around how you actually work.",
    },
    {
      n: "03",
      title: "Lower costs",
      body: "Fewer licences, less manual admin, no agency invoice for every change.",
    },
  ],
  buildsLabel: "What teams build with us",
  builds: [
    "Approval flows",
    "Ops dashboards",
    "Client portals",
    "Lean CRM",
    "Reporting packs",
    "Case management",
    "AI agents",
    "Internal tools",
  ],
};

/* ------------------------------------------------------------------ */
/* Method                                                              */
/* ------------------------------------------------------------------ */

export const method = {
  index: "03",
  eyebrow: "How it works",
  title: "Five steps. Each one hands more to your team.",
  phases: [
    {
      n: "01",
      name: "Diagnose",
      duration: "3 weeks",
      body: "Find where cost and friction sit. Decide what to build, keep and cut.",
      forta: 85,
    },
    {
      n: "02",
      name: "Design",
      duration: "2 weeks",
      body: "Spec the first systems with the people who will use them.",
      forta: 65,
    },
    {
      n: "03",
      name: "Build",
      duration: "6 weeks",
      body: "Your builders ship real systems alongside us, with AI, from week one.",
      forta: 45,
    },
    {
      n: "04",
      name: "Enable",
      duration: "4 weeks",
      body: "Training and playbooks. Your team leads; we coach.",
      forta: 25,
    },
    {
      n: "05",
      name: "Hand over",
      duration: "1 week",
      body: "Your team ships a change without us. Then we leave.",
      forta: 5,
    },
  ],
  gaugeLabels: { forta: "Forta", client: "Your team" },
};

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */

export const team = {
  index: "05",
  eyebrow: "Who we are",
  title: "Two directors. One built HubSpot's AI agents. One brings AI and automation to Moody's.",
  people: [
    {
      name: "Nathaniel Gate",
      role: "Director",
      photo: "/team/nathaniel.jpg",
      linkedin: "https://www.linkedin.com/in/nathaniel-gate-512b69247/",
      headline: "AI, automation and operating systems at Moody's",
      credentials: [
        "Senior Associate, Moody's",
        "Former Head Consultant, CWPG",
        "MSc Strategy (Distinction), Warwick",
      ],
    },
    {
      name: "Oree Golan",
      role: "Director",
      photo: "/team/oree.jpg",
      linkedin: "https://www.linkedin.com/in/oree-golan/",
      headline: "Built HubSpot's AI Agent Platform",
      credentials: [
        "Former Senior Software Engineer, HubSpot",
        "Product Builder, Anima",
        "Co-founder and CTO, unidingo",
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Engagement model                                                    */
/* ------------------------------------------------------------------ */

export const engagement = {
  index: "06",
  eyebrow: "Working with us",
  title: "Start small. Commit only if the numbers work.",
  stages: [
    {
      name: "Operational review",
      shape: "Fixed fee · 3 weeks",
      body: "Your costs, your friction, your business case. Yours to keep either way.",
    },
    {
      name: "Transformation",
      shape: "From £75k · 4 months",
      body: "Build the first systems and train your team, in fixed-price phases.",
    },
    {
      name: "Support",
      shape: "Optional · quarterly",
      body: "Reviews and coaching as you grow. Built to taper off.",
    },
  ],
  ctas: { primary: "Book a strategy call", secondary: "Request a review" },
  commitments: [
    "Code and data in your systems from day one",
    "Results measured against a baseline",
    "We tell you what not to build",
  ],
};

/* ------------------------------------------------------------------ */
/* Closing CTA and contact                                             */
/* ------------------------------------------------------------------ */

export const closing = {
  index: "08",
  eyebrow: "Begin",
  title: ["Make your company", "AI-native."],
  body: "A 30-minute call is enough to tell whether there is a case.",
  intents: [
    { id: "call", label: "Book a strategy call" },
    { id: "review", label: "Request a review" },
    { id: "engagement", label: "Discuss a transformation" },
  ] as const,
  direct: { label: "Or write to us", email: "hello@forta.example" },
  responseNote: "A director replies within two working days.",
};

export type Intent = (typeof closing.intents)[number]["id"];
