import { whyNow } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceLabel } from "@/components/ui/SourceRef";

/** Three sourced numbers. The section must land from the numbers alone. */
export function WhyNow() {
  const w = whyNow;
  return (
    <Section id="why" tone="ink" labelledBy="why-heading" className="!py-20 sm:!py-28">
      <Container>
        <SectionHeader id="why-heading" index={w.index} eyebrow={w.eyebrow} title={w.title} />
        <ul className="grid border-t hairline md:grid-cols-3">
          {w.stats.map((s, i) => (
            <Reveal
              as="li"
              key={s.value}
              delay={i * 0.08}
              className="flex flex-col justify-between gap-8 border-b hairline py-9 md:border-b-0 md:px-8 md:first:pl-0 md:[&:not(:first-child)]:border-l"
            >
              <div>
                <p className="text-[clamp(3.6rem,7vw,6rem)] font-medium leading-none tracking-[-0.06em] text-white">
                  {s.value}
                </p>
                <p className="mt-4 max-w-[18rem] text-[1.05rem] leading-snug text-steel-300">{s.label}</p>
              </div>
              <SourceLabel id={s.source} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
