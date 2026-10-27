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

export type SourceId = "dsit-ipsos-2026" | "mit-nanda-2025";

export const sources: Source[] = [
  {
    id: "dsit-ipsos-2026",
    publisher: "DSIT, DCMS and Ipsos",
    title: "UK employer survey on skills for artificial intelligence",
    year: "Jan 2026",
    url: "https://www.gov.uk/government/publications/uk-employer-survey-on-skills-for-artificial-intelligence",
    finding: "11% of employers had staff undertake training on AI in the last 12 months.",
    note: "Survey of 801 UK employers, fieldwork 19 March to 7 June 2024, excluding sole traders and the public sector. It measures employers, not individual workers.",
  },
  {
    id: "mit-nanda-2025",
    publisher: "MIT NANDA, reported by Fortune",
    title: "MIT report: 95% of generative AI pilots at companies are failing",
    year: "Aug 2025",
    url: "https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/",
    finding:
      "About 95% of company generative AI pilots showed little or no measurable return. The report, The GenAI Divide: State of AI in Business 2025, attributes this to a learning gap and poor integration rather than model quality.",
    note: "A single study based on 150 interviews, a survey of 350 employees and 300 public deployments. It measures pilots failing to deliver returns, which is narrower than AI failing.",
  },
];

export const sourceIndex = Object.fromEntries(sources.map((s, i) => [s.id, i + 1])) as Record<SourceId, number>;

export function getSource(id: SourceId): Source {
  const s = sources.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown source: ${id}`);
  return s;
}
