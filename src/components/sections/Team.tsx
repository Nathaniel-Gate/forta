import Image from "next/image";
import { team } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** The directors. Photos render greyscale to sit inside the palette; colour returns on hover. */
export function Team() {
  const t = team;
  return (
    <Section id="team" tone="paper" labelledBy="team-heading">
      <Container>
        <SectionHeader id="team-heading" title={t.title} />
        <ul className="grid gap-px bg-ink-900/15 md:grid-cols-2">
          {t.people.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 0.1} className="bg-paper">
              <article className="group grid gap-6 p-6 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:p-8">
                <div className="relative aspect-square w-40 overflow-hidden bg-ink-900/10 sm:w-full">
                  <Image
                    src={p.photo}
                    alt={`${p.name}, ${p.role} of Forta`}
                    fill
                    sizes="(min-width: 640px) 176px, 160px"
                    className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[0.85rem] text-ink-900/75">{p.role}</p>
                  <h3 className="mt-2 text-[1.9rem] font-medium leading-none tracking-[-0.035em]">{p.name}</h3>
                  <p className="mt-3 text-[1.05rem] leading-snug">{p.headline}</p>
                  <ul className="mt-5 space-y-1.5 text-[0.92rem] text-ink-900/75">
                    {p.credentials.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-2 border-b border-ink-900/30 pb-0.5 text-[0.9rem] transition-colors hover:border-ink-900"
                  >
                    LinkedIn<span className="sr-only"> profile of {p.name} (opens in a new tab)</span>
                    <svg aria-hidden viewBox="0 0 12 12" className="h-2.5 w-2.5">
                      <path d="M3 9l6-6M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
