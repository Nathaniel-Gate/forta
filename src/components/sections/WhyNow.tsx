import { whyNow } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceLabel } from "@/components/ui/SourceRef";

/** Two sourced numbers, laid out like lines on a statement. */
export function WhyNow() {
  const w = whyNow;
  return (
    <Section id="why" tone="ink" labelledBy="why-heading" className="!py-24 sm:!py-32">
      <Container>
        <SectionHeader id="why-heading" index={w.index} eyebrow={w.eyebrow} title={w.title} />
        <ul className="grid border-t hairline md:grid-cols-2">
          {w.stats.map((s, i) => (
            <Reveal
              as="li"
              key={s.value}
              delay={i * 0.1}
              className="flex flex-col justify-between gap-10 border-b hairline py-10 md:border-b-0 md:px-10 md:first:pl-0 md:[&:not(:first-child)]:border-l"
            >
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-steel-500">
                  Line {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-6 text-[clamp(3.6rem,7vw,6rem)] font-medium leading-none tracking-[-0.06em] text-white">
                  {s.value}
                </p>
                <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-steel-300">{s.label}</p>
              </div>
              <SourceLabel id={s.source} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
