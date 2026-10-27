/**
 * Every statistic on the site cites one of these sources by `id`.
 * Rule: never add a figure to the site without adding (and checking) its source here.
 * `note` records the caveat a sceptical reader would raise, and is shown in the
 * references list so the site never overstates a number.
 */

export type Source = {
  id: SourceId;
  publisher: string;
  title: string;
  year: string;
  url: string;
  finding: string;
  note?: string;
};

export type SourceId = "peng-copilot-2023" | "gartner-digital-2024";

export const sources: Source[] = [
  {
    id: "peng-copilot-2023",
    publisher: "Peng, Kalliamvakou, Cihon & Demirer (arXiv)",
    title: "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot",
    year: "2023",
    url: "https://arxiv.org/abs/2302.06590",
    finding: "In a randomised controlled trial, developers with an AI pair programmer completed a task 55.8% faster.",
    note: "A single, well-defined coding task. We cite it as direction of travel, not a universal multiplier.",
  },
  {
    id: "gartner-digital-2024",
    publisher: "Gartner",
    title: "Only 48% of Digital Initiatives Meet or Exceed Their Business Outcome Targets",
    year: "Oct 2024",
    url: "https://www.gartner.com/en/newsroom/press-releases/2024-10-22-gartner-survey-reveals-that-only-48-percent-of-digital-initiatives-meet-or-exceed-their-business-outcome-targets",
    finding:
      "48% of digital initiatives meet their outcome targets. Where business leaders co-own delivery with IT, the rate rises to 71%.",
    note: "Survey of 3,186 CIOs and technology executives in 88 countries.",
  },
];

export const sourceIndex = Object.fromEntries(sources.map((s, i) => [s.id, i + 1])) as Record<SourceId, number>;

export function getSource(id: SourceId): Source {
  const s = sources.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown source: ${id}`);
  return s;
}
