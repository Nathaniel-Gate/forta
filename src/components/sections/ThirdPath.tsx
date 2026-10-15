import { thirdPath, whyNow } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceLabel } from "@/components/ui/SourceRef";
import { CostCurve } from "@/components/visuals/CostCurve";
import { cn } from "@/lib/cn";

/** The core idea: rent vs commission vs own, plus the evidence for "why now". Paper surface. */
export function ThirdPath() {
  const t = thirdPath;
  return (
    <Section id="approach" tone="paper" labelledBy="approach-heading">
      <div aria-hidden className="bg-blueprint-paper absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <Container>
        <SectionHeader id="approach-heading" index={t.index} eyebrow={t.eyebrow} title={t.title} lede={t.lede} />

        <ol className="grid gap-px bg-ink-900/15 lg:grid-cols-3">
          {t.options.map((o, i) => (
            <Reveal
              as="li"
              key={o.id}
              delay={i * 0.1}
              className={cn(
                "relative flex flex-col p-7 sm:p-9",
                o.highlight ? "bg-ink-950 text-stone-100" : "bg-paper text-ink-900",
              )}
            >
              {o.highlight && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-signal),transparent)]"
                />
              )}
              <div className="flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-[0.18em]">
                <span className="opacity-75">{o.label}</span>
                {o.highlight && <span className="text-signal">The Forta model</span>}
              </div>
              <h3 className="mt-6 text-[2rem] font-medium tracking-[-0.035em]">{o.name}</h3>
              <p className="mt-3 min-h-[3.2em] text-[1.02rem] leading-relaxed opacity-75">{o.summary}</p>

              <div className={cn("my-8", o.highlight ? "text-white" : "text-ink-900")}>
                <CostCurve curve={o.curve} highlight={o.highlight} />
              </div>

              <dl className="mt-auto divide-y border-t" style={{ borderColor: "var(--hairline)" }}>
                {o.traits.map((tr) => (
                  <div
                    key={tr.k}
                    className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 text-[0.92rem]"
                    style={{ borderColor: o.highlight ? "rgb(255 255 255 / 0.09)" : "var(--hairline)" }}
                  >
                    <dt className="font-mono text-[0.68rem] uppercase leading-6 tracking-[0.12em] opacity-75">{tr.k}</dt>
                    <dd className="leading-snug">{tr.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </ol>
        <p className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-900/70">{t.chartNote}</p>

        <Reveal className="mx-auto mt-28 max-w-4xl text-center sm:mt-36">
          <p className="text-balance text-[clamp(1.9rem,4.4vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.04em]">
            {t.pullQuote.lead}{" "}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-ink-900/60">{t.pullQuote.emphasis}</span>
          </p>
        </Reveal>

        <div className="mt-28 sm:mt-36">
          <Reveal>
            <div className="flex items-center gap-4 border-t hairline pt-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] opacity-70">
              <span>{whyNow.eyebrow}</span>
            </div>
            <h3 className="mt-8 max-w-3xl text-balance text-[clamp(1.6rem,3vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em]">
              {whyNow.title}
            </h3>
          </Reveal>
          <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {whyNow.points.map((p, i) => (
              <Reveal as="li" key={p.value} delay={i * 0.08} className="flex flex-col border-t border-ink-900/80 pt-6">
                <p className="text-[clamp(2.2rem,3.6vw,3rem)] font-medium leading-none tracking-[-0.045em]">{p.value}</p>
                <p className="mt-4 text-[0.95rem] font-medium leading-snug">{p.label}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-900/70">{p.body}</p>
                <SourceLabel id={p.source} className="mt-6" />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
