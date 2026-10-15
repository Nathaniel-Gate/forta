/**
 * All homepage copy lives here, grouped by section in page order.
 * Components only lay this out; edit words here, not in the components.
 *
 * House style: British English, no exclamation marks, no em dashes.
 * Write like a person talking to a COO: plain sentences, specifics, names.
 * Avoid the tells of machine-written copy: lists of exactly three, chains of
 * short fragments ("Faster. Cheaper. Better."), "not X, it's Y", and filler
 * words like seamless, unlock, empower, elevate, journey.
 */

import type { SourceId } from "./sources";

export type Stat = { value: string; label: string; source: SourceId };

export const hero = {
  headline: "Make your company AI-native.",
  subhead:
    "We teach your team to build the software they need with AI, so you stop paying for tools that don't fit and start owning ones that do.",
  secondaryCta: { label: "Or book a call with us", intent: "call" as const },
  byline: "Nathaniel Gate and Oree Golan, London",
};

export const whyNow = {
  title: "Why bother now?",
  stats: [
    {
      value: "55%",
      label:
        "Developers finished a coding task 55% faster with an AI assistant in a controlled trial. Building your own tools has never been this cheap.",
      source: "peng-copilot-2023",
    },
    {
      value: "+14%",
      label: "Software spending rose 14% in 2025, and Gartner puts much of that down to vendors raising prices.",
      source: "gartner-it-spend-2025",
    },
  ] satisfies Stat[],
};

export const whatWeDo = {
  title: "What actually changes",
  items: [
    {
      title: "Your team learns to build",
      body: "We pick a handful of people who know your processes, usually ops leads or analysts, and teach them to build and fix internal software with AI. They keep that skill after we've gone.",
    },
    {
      title: "You own your systems",
      body: "The tools that never quite fit get replaced with ones built around how you work. The code and data live in your accounts from day one.",
    },
    {
      title: "Your bills come down",
      body: "Fewer licences, less copying data between systems, and no agency invoice every time you want a field moved.",
    },
    {
      title: "Changes take days",
      body: "When the business changes, your own people update the software that week instead of waiting on a vendor's roadmap.",
    },
  ],
  buildsLabel: "Things we can help your team build",
  builds: [
    "Approval flows",
    "Ops dashboards",
    "Client portals",
    "A lighter CRM",
    "Board reporting",
    "Case management",
    "AI agents for admin",
    "Internal tools",
  ],
};

export const method = {
  title: "How a project runs",
  lede: "Each stage hands a bit more of the work to your people. By the end they're doing nearly all of it.",
  phases: [
    {
      n: "1",
      name: "Diagnose",
      duration: "3 weeks",
      body: "We look at what you pay for and where people lose time, then agree what's worth building.",
      forta: 85,
    },
    {
      n: "2",
      name: "Design",
      duration: "2 weeks",
      body: "We plan the first system with the people who'll use it every day.",
      forta: 65,
    },
    {
      n: "3",
      name: "Build",
      duration: "6 weeks",
      body: "Your people build real systems alongside us, using AI, from the first week.",
      forta: 45,
    },
    {
      n: "4",
      name: "Enable",
      duration: "4 weeks",
      body: "Your team takes the lead on the next system while we coach.",
      forta: 25,
    },
    {
      n: "5",
      name: "Hand over",
      duration: "1 week",
      body: "Your team ships a change without our help, and that's when we step back.",
      forta: 5,
    },
  ],
  gaugeLabels: { forta: "Forta", client: "Your team" },
};

export const team = {
  title: "Who you'd be working with",
  people: [
    {
      name: "Nathaniel Gate",
      role: "Director",
      photo: "/team/nathaniel.jpg",
      linkedin: "https://www.linkedin.com/in/nathaniel-gate-512b69247/",
      headline: "Works on AI, automation and operating systems at Moody's",
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
      headline: "Helped build HubSpot's AI agent platform",
      credentials: [
        "Former Senior Software Engineer, HubSpot",
        "Product Builder, Anima",
        "Co-founder and CTO, unidingo",
      ],
    },
  ],
};

export const engagement = {
  title: "What it costs",
  stages: [
    {
      name: "Free stack rebuild",
      shape: "Free, back in 3 hours",
      body: "Send us your tools and we send back a version built around your company.",
    },
    {
      name: "Operational review",
      shape: "Fixed fee, 3 weeks",
      body: "We map your costs and the time your team loses, and write up the business case. You keep it whether or not you go ahead.",
    },
    {
      name: "Transformation",
      shape: "From £75k, about 4 months",
      body: "We build the first systems with your team and train them as we go, priced in fixed phases.",
    },
  ],
  note: "After that, quarterly support is there if you want it. It is designed to shrink as your team gets more confident.",
};

export const closing = {
  title: "Rather talk it through?",
  body: "Tell us a bit about your company and one of us will get back to you within two working days.",
  intents: [
    { id: "call", label: "Book a call" },
    { id: "review", label: "Ask about a review" },
    { id: "engagement", label: "Discuss a project" },
  ] as const,
  direct: { label: "Or email", email: "hello@forta.example" },
  responseNote: "Nathaniel or Oree will reply within two working days.",
};

export type Intent = (typeof closing.intents)[number]["id"];
