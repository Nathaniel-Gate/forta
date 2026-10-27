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
  eyebrow: "AI-native transformation, London",
  headline: ["Make your", "company", "AI-native."],
  subhead:
    "We train your people to use AI properly, so every employee does better work in ways they can't picture yet. When a job is too big for the team, an Algosoup pod can build it alongside them.",
  secondaryCta: { label: "Or book a call with us", intent: "call" as const },
  byline: "Nathaniel Gate and Oree Golan",
  bylineDetail: "Oree built AI agents at HubSpot. Nathaniel works on AI at Moody's.",
  proof: [
    { value: "3 hours", label: "to get one of your manual workflows back, redone with AI" },
    { value: "1 tool each", label: "built by every person in the room, for their own work" },
    { value: "100%", label: "of the skills and workflows stay yours" },
  ],
};

export const whyNow = {
  index: "01",
  eyebrow: "Why now",
  title: "Why bother now?",
  stats: [
    {
      value: "55%",
      label: "Developers finished a coding task 55% faster with an AI assistant in a controlled trial. The same tools are now open to every role in your company.",
      source: "peng-copilot-2023",
    },
    {
      value: "71%",
      label: "Digital projects meet their targets 71% of the time when business leaders co-own delivery, against 48% overall. The people doing the work matter more than the tool.",
      source: "gartner-digital-2024",
    },
  ] satisfies Stat[],
};

export const whatWeDo = {
  index: "02",
  eyebrow: "What changes",
  title: "What actually changes",
  items: [
    {
      title: "Everyone gets more from AI",
      body: "Most people use AI like a search box. We show each team what it can do with their own work, using their own documents and tools, so the gains show up in the week.",
    },
    {
      title: "Manual workflows get redone",
      body: "We take the jobs people repeat by hand and rebuild them around AI, packaged as Claude skills that anyone on the team can run.",
    },
    {
      title: "Performance lifts across the team",
      body: "Less time on drafting, chasing, copying and reporting, and more on the work that needs judgement. People pick up methods they didn't know to ask for.",
    },
    {
      title: "More hands when you need them",
      body: "When a workflow is too big for your team to build alone, an Algosoup pod of engineers embeds with you, builds it, and trains your people to run it.",
    },
  ],
  buildsLabel: "Workflows teams stop doing by hand",
  builds: [
    "Weekly reporting",
    "Client onboarding",
    "Contract review",
    "Meeting follow-ups",
    "Invoice chasing",
    "Candidate screening",
    "Research briefs",
    "Data clean-up",
  ],
};

export const method = {
  index: "03",
  eyebrow: "How it works",
  title: "How a session runs",
  lede: "A first session is three hours for 6 to 8 people, in person. Each stage hands a bit more of the work to your people.",
  phases: [
    {
      n: "01",
      name: "Watch it built",
      duration: "10 minutes",
      body: "We show an agent building a tool from a folder of messy emails, live, so the room sees what is possible.",
      forta: 90,
    },
    {
      n: "02",
      name: "Their turn",
      duration: "65 minutes",
      body: "Everyone describes their day, picks one task, and builds a first version with the agent. We help keep it small.",
      forta: 40,
    },
    {
      n: "03",
      name: "Make it visible",
      duration: "15 minutes",
      body: "We show the same results as a simple page, a shareable report or a short video, and each person picks one extra.",
      forta: 65,
    },
    {
      n: "04",
      name: "Use it tomorrow",
      duration: "65 minutes",
      body: "They connect the tool to their real files, decide what starts it, run it themselves, and change one thing.",
      forta: 25,
    },
    {
      n: "05",
      name: "Show and tell",
      duration: "25 minutes",
      body: "Everyone shows what they made. We follow up the next week to see who is using it and what got in the way.",
      forta: 5,
    },
  ],
  gaugeLabels: { forta: "Algosoup", client: "Your team" },
};

export const team = {
  index: "05",
  eyebrow: "Who we are",
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
  index: "06",
  eyebrow: "Pricing",
  title: "What it costs",
  stages: [
    {
      name: "Free workflow rebuild",
      shape: "Free, back in 3 hours",
      body: "Tell us one manual workflow. We send back an AI version of it, plus the Claude skills to run it.",
    },
    {
      name: "First workshop",
      shape: "3 hours, 6 to 8 people",
      body: "In person, hands-on: everyone builds a tool for their own work and leaves knowing how to use it. Fixed price, agreed after a short call.",
    },
    {
      name: "A few days with your team",
      shape: "Fixed price, agreed up front",
      body: "More sessions across teams, with tools set up for each group, so the skill spreads beyond the first room.",
    },
    {
      name: "Algosoup pod",
      shape: "Scoped per project",
      body: "For workflows too big to build in-house, engineers embed with your team, build it, and hand over to the people we've trained. Separate from training, and only if you want it.",
    },
  ],
  note: "The workshop tools stay useful without buying anything more. A pod can be brought in whenever a build outgrows the team.",
};

export const closing = {
  index: "08",
  eyebrow: "Talk to us",
  title: ["Rather talk", "it through?"],
  body: "Tell us a bit about your company and one of us will get back to you within two working days.",
  intents: [
    { id: "call", label: "Book a call" },
    { id: "review", label: "Ask about a workshop" },
    { id: "engagement", label: "Discuss a project" },
  ] as const,
  direct: { label: "Or email", email: "hello@algosoup.example" },
  responseNote: "Nathaniel or Oree will reply within two working days.",
};

export type Intent = (typeof closing.intents)[number]["id"];
