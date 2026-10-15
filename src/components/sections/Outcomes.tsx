import { outcomes } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Five outcomes as an editorial index. Each names the metric we would baseline. */
export function Outcomes() {
  const o = outcomes;
  return (
    <Section id="outcomes" tone="deep" labelledBy="outcomes-heading">
      <Container>
        <SectionHeader id="outcomes-heading" index={o.index} eyebrow={o.eyebrow} title={o.title} />
        <ol className="border-t hairline">
          {o.items.map((it, i) => (
            <Reveal
              as="li"
              key={it.n}
              delay={i * 0.04}
              className="group grid gap-4 border-b hairline py-9 transition-colors duration-500 hover:bg-white/[0.015] md:grid-cols-[5rem_minmax(0,1.1fr)_minmax(0,1.3fr)_minmax(0,0.9fr)] md:gap-8 md:py-11"
            >
              <span className="font-mono text-[0.75rem] text-steel-500 transition-colors group-hover:text-signal">{it.n}</span>
              <h3 className="text-[1.6rem] font-medium leading-tight tracking-[-0.03em] text-white sm:text-[1.9rem]">
                {it.title}
              </h3>
              <p className="max-w-xl text-[1rem] leading-relaxed text-steel-300">{it.body}</p>
              <p className="text-[0.85rem] leading-snug text-steel-400 md:text-right">
                <span className="mb-1.5 block font-mono text-[0.64rem] uppercase tracking-[0.16em] text-steel-500">
                  We baseline
                </span>
                {it.measure}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
