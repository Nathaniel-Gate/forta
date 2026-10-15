/** Navigation and footer content. Anchor hrefs must match section ids in src/app/page.tsx. */

export const brand = {
  name: "Forta",
  descriptor: "AI-native transformation",
  location: "London, United Kingdom",
};

export const navLinks = [
  { label: "What you get", href: "#what" },
  { label: "How it works", href: "#method" },
  { label: "Savings", href: "#calculator" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export const navCta = { label: "Book a call", intent: "call" as const };

export const footer = {
  statement: "Forta makes companies AI-native.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "What you get", href: "#what" },
        { label: "How it works", href: "#method" },
        { label: "Savings estimate", href: "#calculator" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Team", href: "#team" },
        { label: "Working with us", href: "#engagement" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ],
  legal: "Figures are cited to their sources above.",
};
