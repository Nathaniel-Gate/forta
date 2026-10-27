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
    { value: "16 weeks", label: "to a team that uses AI well across its everyday work" },
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
  title: "How a programme runs",
  lede: "Each stage hands a bit more of the work to your people. By the end they're doing nearly all of it.",
  phases: [
    {
      n: "01",
      name: "Diagnose",
      duration: "3 weeks",
      body: "We look at where people lose time and which workflows are worth redoing first.",
      forta: 85,
    },
    {
      n: "02",
      name: "Design",
      duration: "2 weeks",
      body: "We redesign the first workflow with the people who run it every day.",
      forta: 65,
    },
    {
      n: "03",
      name: "Build",
      duration: "6 weeks",
      body: "Your people build real workflows alongside us from the first week. Anything bigger goes to an Algosoup pod.",
      forta: 45,
    },
    {
      n: "04",
      name: "Enable",
      duration: "4 weeks",
      body: "Your team takes the lead on the next workflow while we coach, and the training widens to more people.",
      forta: 25,
    },
    {
      n: "05",
      name: "Hand over",
      duration: "1 week",
      body: "Your team changes a workflow without our help, and that's when we step back.",
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
      name: "Workflow review",
      shape: "Fixed fee, 3 weeks",
      body: "We map the workflows costing your team the most time and write up the business case. You keep it whether or not you go ahead.",
    },
    {
      name: "Team training programme",
      shape: "From £75k, about 4 months",
      body: "We train your people and redo workflows with them across teams, priced in fixed phases.",
    },
    {
      name: "Algosoup pod",
      shape: "Scoped per project",
      body: "For workflows too big to build in-house, engineers embed with your team, build it, and hand over to the people we've trained.",
    },
  ],
  note: "After that, quarterly support is there if you want it, and a pod can be brought in whenever a build outgrows the team.",
};

export const closing = {
  index: "08",
  eyebrow: "Talk to us",
  title: ["Rather talk", "it through?"],
  body: "Tell us a bit about your company and one of us will get back to you within two working days.",
  intents: [
    { id: "call", label: "Book a call" },
    { id: "review", label: "Ask about a review" },
    { id: "engagement", label: "Discuss a project" },
  ] as const,
  direct: { label: "Or email", email: "hello@algosoup.example" },
  responseNote: "Nathaniel or Oree will reply within two working days.",
};

export type Intent = (typeof closing.intents)[number]["id"];
