import { archetypes } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Illustrative, clearly labelled scenarios. Never named clients or invented results. */
export function Archetypes() {
  const a = archetypes;
  return (
    <Section id="archetypes" tone="ink" labelledBy="archetypes-heading">
      <Container>
        <SectionHeader id="archetypes-heading" index={a.index} eyebrow={a.eyebrow} title={a.title} lede={a.disclaimer} />
        <ul className="grid gap-px bg-white/[0.08] md:grid-cols-2">
          {a.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={(i % 2) * 0.08} className="bg-ink-900">
              <article className="flex h-full flex-col p-7 sm:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-steel-400">{it.tag}</span>
                  <span className="border border-white/15 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-steel-500">
                    Illustrative
                  </span>
                </div>
                <h3 className="mt-8 text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.03em] text-white">
                  {it.title}
                </h3>
                <dl className="mt-6 space-y-5 text-[0.98rem] leading-relaxed">
                  <div>
                    <dt className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-steel-500">The situation</dt>
                    <dd className="mt-1.5 text-steel-300">{it.situation}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-steel-500">What gets built</dt>
                    <dd className="mt-1.5 text-stone-100">{it.build}</dd>
                  </div>
                </dl>
                <div className="mt-auto pt-8">
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-steel-500">Baselined in Diagnose</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {it.measures.map((m) => (
                      <li key={m} className="border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[0.8rem] text-steel-300">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
