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

export type SourceId =
  | "gartner-it-spend-2025"
  | "zylo-smi-2025"
  | "gartner-saas-price-2025"
  | "asana-aow-2021"
  | "hbr-toggling-2022"
  | "peng-copilot-2023"
  | "gartner-digital-2024"
  | "retool-build-buy-2026"
  | "ons-ashe-2025"
  | "okta-baw-2025";

export const sources: Source[] = [
  {
    id: "gartner-it-spend-2025",
    publisher: "Gartner",
    title: "Gartner Forecasts Worldwide IT Spending to Grow 9.3% in 2025",
    year: "Oct 2024",
    url: "https://www.nasdaq.com/press-release/gartner-forecasts-worldwide-it-spending-grow-93-2025-2024-10-23",
    finding: "Worldwide software spending forecast to grow 14.0% in 2025, to roughly $1.24tn.",
    note: "Gartner attributes much of the growth to vendor price increases and expanding licence bases.",
  },
  {
    id: "zylo-smi-2025",
    publisher: "Zylo",
    title: "2025 SaaS Management Index",
    year: "Jan 2025",
    url: "https://zylo.com/news/2025-saas-management-index",
    finding:
      "Average SaaS spend reached US$4,830 per employee, up 21.9% year on year. Lines of business, not IT, control 70% of SaaS spend.",
    note: "Based on Zylo's managed customer base (40M+ licences); skews towards larger US organisations.",
  },
  {
    id: "gartner-saas-price-2025",
    publisher: "Gartner, via CIO.com",
    title: "SaaS price hikes put CIOs' budgets in a bind",
    year: "Dec 2025",
    url: "https://cio.com/article/4104365/saas-price-hikes-put-cios-budgets-in-a-bind.html",
    finding:
      "Subscription costs from several large SaaS vendors rose 10–20% in 2025, against projected IT budget growth of 2.8%.",
    note: "Analyst estimate for several large vendors, not a market-wide average.",
  },
  {
    id: "asana-aow-2021",
    publisher: "Asana",
    title: "Anatomy of Work Index 2021",
    year: "Jan 2021",
    url: "https://www.nasdaq.com/press-release/asana-anatomy-of-work-index-2021:-work-about-work-is-dominating-in-a-distributed",
    finding:
      "Knowledge workers spend 60% of their time on 'work about work': chasing status, searching for information, switching tools.",
    note: "Self-reported survey of 13,123 knowledge workers across seven countries (Sapio Research).",
  },
  {
    id: "hbr-toggling-2022",
    publisher: "Harvard Business Review",
    title: "How Much Time and Energy Do We Waste Toggling Between Applications?",
    year: "Aug 2022",
    url: "https://hbr.org/2022/08/how-much-time-and-energy-do-we-waste-toggling-between-applications",
    finding:
      "Employees switched between apps and sites about 1,200 times a day, losing just under four hours a week reorienting: roughly 9% of working time.",
    note: "Observed study of 137 users across 20 teams in three Fortune 500 companies.",
  },
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
  {
    id: "retool-build-buy-2026",
    publisher: "Retool",
    title: "2026 Build vs. Buy Report",
    year: "Feb 2026",
    url: "https://www.businesswire.com/news/home/20260217548274/en/Retools-2026-Build-vs.-Buy-Report-Reveals-35-of-Enterprises-Have-Already-Replaced-SaaS-With-Custom-Software",
    finding:
      "35% of respondents have already replaced at least one SaaS tool with a custom build; 78% expect to build more of their own tools in 2026.",
    note: "Vendor survey of 817 Retool customers and builders, so likely to overstate the wider market.",
  },
  {
    id: "ons-ashe-2025",
    publisher: "Office for National Statistics",
    title: "Employee earnings in the UK: 2025 (ASHE)",
    year: "Oct 2025",
    url: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/2025",
    finding: "Median gross annual earnings for UK full-time employees were £39,039 in April 2025.",
    note: "Provisional estimate. Used as the starting salary in the savings calculator.",
  },
  {
    id: "okta-baw-2025",
    publisher: "Okta",
    title: "Businesses at Work 2025",
    year: "Mar 2025",
    url: "https://okta.com/blog/2025/03/businesses-at-work-2025",
    finding:
      "The average Okta customer now deploys 101 apps, crossing 100 for the first time. In EMEA the figure is 74, up from 69.",
    note: "Counts apps connected to Okta only; real estates, including shadow IT, are larger.",
  },
];

export const sourceIndex = Object.fromEntries(sources.map((s, i) => [s.id, i + 1])) as Record<SourceId, number>;

export function getSource(id: SourceId): Source {
  const s = sources.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown source: ${id}`);
  return s;
}
