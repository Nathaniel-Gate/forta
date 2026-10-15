/** Navigation and footer content. Anchor hrefs must match section ids in src/app/page.tsx. */

export const brand = {
  name: "Forta",
  descriptor: "Software ownership for operational firms",
  location: "London, United Kingdom",
};

export const navLinks = [
  { label: "Approach", href: "#approach" },
  { label: "Method", href: "#method" },
  { label: "Savings", href: "#calculator" },
  { label: "Engagements", href: "#engagement" },
  { label: "FAQ", href: "#faq" },
];

export const navCta = { label: "Request a review", intent: "review" as const };

export const footer = {
  statement: "Forta turns software renters into software owners.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "The third path", href: "#approach" },
        { label: "The Forta method", href: "#method" },
        { label: "What we build", href: "#systems" },
        { label: "Savings estimate", href: "#calculator" },
      ],
    },
    {
      title: "Engage",
      links: [
        { label: "Operational review", href: "#engagement" },
        { label: "Archetypes", href: "#archetypes" },
        { label: "Questions", href: "#faq" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ],
  legal: "Forta is a working brand concept. Figures are cited to their sources below.",
};
