import { engagement } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Engagement() {
  const e = engagement;
  return (
    <Section id="engagement" tone="deep" labelledBy="engagement-heading">
      <Container>
        <SectionHeader id="engagement-heading" index={e.index} eyebrow={e.eyebrow} title={e.title} />

        <ol className="grid gap-px bg-white/[0.08] md:grid-cols-3">
          {e.stages.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 0.08} className="bg-ink-950 p-7 sm:p-9">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-steel-400">{s.shape}</p>
              <h3 className="mt-6 text-[1.7rem] font-medium tracking-[-0.03em] text-white">{s.name}</h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-steel-300">{s.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-col gap-3 md:flex-row md:gap-8">
            {e.commitments.map((c) => (
              <li key={c} className="flex items-center gap-3 text-[0.95rem] text-stone-100">
                <span aria-hidden className="h-1 w-1 shrink-0 bg-steel-400" />
                {c}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 xs:flex-row">
            <ButtonLink intent="call">{e.ctas.primary}</ButtonLink>
            <ButtonLink intent="review" variant="ghost" className="text-white">
              {e.ctas.secondary}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
