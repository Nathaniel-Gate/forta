import { whatWeDo } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** The offer in three pillars, plus a scannable list of what gets built. Paper surface. */
export function WhatWeDo() {
  const w = whatWeDo;
  return (
    <Section id="what" tone="paper" labelledBy="what-heading">
      <div aria-hidden className="bg-blueprint-paper absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <Container>
        <SectionHeader id="what-heading" index={w.index} eyebrow={w.eyebrow} title={w.title} />
        <ol className="grid gap-px bg-ink-900/15 md:grid-cols-3">
          {w.pillars.map((p, i) => (
            <Reveal
              as="li"
              key={p.n}
              delay={i * 0.08}
              className={i === 0 ? "relative bg-ink-950 p-8 text-stone-100 sm:p-10" : "bg-paper p-8 sm:p-10"}
            >
              {i === 0 && (
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-signal),transparent)]" />
              )}
              <span className="font-mono text-[0.72rem] opacity-75">{p.n}</span>
              <h3 className="mt-10 text-[clamp(1.8rem,2.8vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.035em]">{p.title}</h3>
              <p className="mt-4 max-w-xs text-[1.02rem] leading-relaxed opacity-80">{p.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-900/75">{w.buildsLabel}</p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {w.builds.map((b) => (
              <li key={b} className="border border-ink-900/20 px-4 py-2 text-[0.95rem]">
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
