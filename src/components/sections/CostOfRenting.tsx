import { costOfRenting } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceLabel } from "@/components/ui/SourceRef";

/** Evidence ledger: four sourced figures laid out like a statement of account. */
export function CostOfRenting() {
  const c = costOfRenting;
  return (
    <Section id="cost" tone="ink" labelledBy="cost-heading">
      <Container>
        <SectionHeader id="cost-heading" index={c.index} eyebrow={c.eyebrow} title={c.title} lede={c.lede} />

        <ul className="grid border-t hairline sm:grid-cols-2 xl:grid-cols-4">
          {c.stats.map((s, i) => (
            <Reveal
              as="li"
              key={s.value}
              delay={i * 0.08}
              className="group relative flex flex-col justify-between gap-10 border-b hairline py-9 sm:px-7 sm:[&:nth-child(odd)]:pl-0 sm:[&:nth-child(even)]:border-l xl:border-l xl:first:border-l-0 xl:first:pl-0 xl:[&:nth-child(odd)]:pl-7 xl:[&:nth-child(1)]:pl-0"
            >
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-steel-500">
                  Line {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-6 text-[clamp(2.6rem,4.4vw,3.6rem)] font-medium leading-none tracking-[-0.045em] text-white">
                  {s.value}
                </p>
                <p className="mt-5 max-w-[19rem] text-[0.98rem] leading-relaxed text-steel-300">{s.label}</p>
              </div>
              <SourceLabel id={s.source} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel-500">The larger line item</p>
          <p className="max-w-3xl text-pretty text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.3] tracking-[-0.02em] text-stone-100">
            {c.closing}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
