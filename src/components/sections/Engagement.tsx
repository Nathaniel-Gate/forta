import { engagement } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Engagement() {
  const e = engagement;
  const lists = [e.whoFor, e.whoInvolved, e.commitments];
  return (
    <Section id="engagement" tone="deep" labelledBy="engagement-heading">
      <Container>
        <SectionHeader id="engagement-heading" index={e.index} eyebrow={e.eyebrow} title={e.title} />

        <ol className="relative grid gap-px bg-white/[0.08] lg:grid-cols-3">
          {e.stages.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 0.08} className="relative bg-ink-950 p-7 sm:p-9">
              <div className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-steel-500">
                <span>Stage {i + 1}</span>
                {i < e.stages.length - 1 && (
                  <span aria-hidden className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgb(255_255_255/0.25),transparent)] lg:block" />
                )}
              </div>
              <h3 className="mt-8 text-[1.7rem] font-medium tracking-[-0.03em] text-white">{s.name}</h3>
              <p className="mt-2 font-mono text-[0.75rem] tracking-[0.04em] text-steel-300">{s.shape}</p>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-steel-300">{s.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <ButtonLink intent="review">{e.ctas.primary}</ButtonLink>
          <ButtonLink intent="engagement" variant="ghost" className="text-white">
            {e.ctas.secondary}
          </ButtonLink>
        </Reveal>

        <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-10">
          {lists.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.06}>
              <h3 className="border-t border-white/20 pt-5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel-400">
                {l.title}
              </h3>
              <ul className="mt-6 space-y-4">
                {l.items.map((item) => (
                  <li key={item} className="grid grid-cols-[1.1rem_1fr] text-[0.98rem] leading-snug text-stone-100">
                    <span aria-hidden className="mt-[0.5em] h-1 w-1 bg-steel-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
