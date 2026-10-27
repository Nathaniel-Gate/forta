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
  eyebrow: "AI training and enablement, London",
  headline: ["Everyone", "builds with", "AI."],
  subhead:
    "A hands-on workshop, in person. Each person builds a working tool for their own job, connects it to their day, and leaves knowing how to use it tomorrow. No slide decks. When you want it across more teams, Algosoup's engineers can build and look after it.",
  secondaryCta: { label: "Or book a call with us", intent: "call" as const },
  byline: "Nathaniel Gate and Oree Golan",
  bylineDetail: "Oree built AI agents at HubSpot. Nathaniel works on AI at Moody's.",
  proof: [
    { value: "3 hours", label: "for a first session, in person, with 6 to 8 people and 2 facilitators" },
    { value: "1 tool each", label: "built by every person for their own work, not a demo" },
    { value: "1 week", label: "later we check who is using their tool and what got in the way" },
  ],
};

export const whyNow = {
  index: "01",
  eyebrow: "Why now",
  title: "Why bother now?",
  stats: [
    {
      value: "11%",
      label:
        "of UK employers had staff trained on AI in the previous 12 months, in a 2024 survey of 801 employers. Most people are left to work it out alone.",
      source: "dsit-ipsos-2026",
    },
    {
      value: "95%",
      label:
        "of company generative AI pilots showed little or no measurable return in one MIT study, which put it down to a learning gap rather than the models.",
      source: "mit-nanda-2025",
    },
  ] satisfies Stat[],
};

export const whatWeDo = {
  index: "02",
  eyebrow: "What you get",
  title: "What actually happens",
  items: [
    {
      title: "You watch it built",
      body: "We open with a messy folder of real-looking emails and ask an AI agent to build a follow-up tool in front of the room. People see what is possible before anyone is asked to try.",
    },
    {
      title: "Everyone builds their own",
      body: "Each person tells the agent what they do on a normal day. It suggests a few tasks, they pick one, and they build a working tool for it, with a facilitator beside them.",
    },
    {
      title: "It becomes part of their day",
      body: "We decide what starts each tool: a new file, a regular time, a change in an app, or a button. They run it themselves, change one rule, and leave with a short note on how to use it tomorrow.",
    },
    {
      title: "Engineers when it needs more",
      body: "If a tool should work across several teams and systems, an Algosoup pod can build and look after it. The workshop tool stays useful without buying anything more.",
    },
  ],
  buildsLabel: "Things people build in the room",
  builds: [
    "Follow-up queue from an inbox",
    "A weekly report that updates itself",
    "What changed between two lists",
    "Files sorted into the right folders",
    "A page showing the latest results",
    "A printable report",
    "A 30-second explainer video",
    "Anything else they do on repeat",
  ],
};

export const method = {
  index: "03",
  eyebrow: "How it works",
  title: "How a session runs",
  lede: "A first session is three hours for 6 to 8 people with two facilitators. Each stage hands more of the work to your people.",
  phases: [
    {
      n: "01",
      name: "Watch it built",
      duration: "10 minutes",
      body: "We show an agent building a tool from a folder of messy emails. Nothing is sent, and the room sees the real build.",
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
      body: "We show the same results as a simple page, a shareable report or a short video. Each person picks one extra for their own work.",
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
      body: "Everyone shows what they made in about 90 seconds: what they did by hand, what happens now, and when they will use it next.",
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
  eyebrow: "Working with us",
  title: "How we work with you",
  stages: [
    {
      name: "Free workflow rebuild",
      shape: "Free, back in 3 hours",
      body: "Tell us one manual workflow. We send back an AI version of it, plus the Claude skills to run it.",
    },
    {
      name: "First workshop",
      shape: "3 hours, 6 to 8 people",
      body: "The session above, in person, with a follow-up the next week. Fixed price, agreed with you after a short call.",
    },
    {
      name: "A few days with your team",
      shape: "Fixed price, agreed up front",
      body: "More sessions across teams, with tools set up for each group, so the skill spreads beyond the first room.",
    },
    {
      name: "Algosoup pod",
      shape: "Scoped per project",
      body: "For something bigger than a workshop tool, engineers work inside your business to build it and look after it. Separate from training, and only if you want it.",
    },
  ],
  note: "Training and engineering are separate. The workshop tools stay useful without more services, and we will tell you plainly if a bigger build would help.",
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
