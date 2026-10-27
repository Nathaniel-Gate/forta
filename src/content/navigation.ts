/** Navigation and footer content. Anchor hrefs must match section ids in src/app/page.tsx. */

export const brand = {
  name: "Algosoup",
  descriptor: "AI training and enablement",
  location: "London, United Kingdom",
};

export const navLinks = [
  { label: "What you get", href: "#what" },
  { label: "How it works", href: "#method" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export const navCta = { label: "Free workflow rebuild", href: "/#stack" };

export const footer = {
  statement: "Algosoup teaches teams to build with AI.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Free workflow rebuild", href: "/stack" },
        { label: "How it works", href: "#method" },
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
