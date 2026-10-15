import { whatWeDo } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function WhatWeDo() {
  const w = whatWeDo;
  return (
    <Section id="what" tone="paper" labelledBy="what-heading">
      <Container>
        <SectionHeader id="what-heading" title={w.title} />
        <ul className="grid gap-x-16 gap-y-12 md:grid-cols-2">
          {w.items.map((it) => (
            <li key={it.title} className="border-t border-ink-900/80 pt-5">
              <h3 className="text-[1.6rem] font-medium tracking-[-0.03em]">{it.title}</h3>
              <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-ink-900/75">{it.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <p className="text-[0.95rem] text-ink-900/75">{w.buildsLabel}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {w.builds.map((b) => (
              <li key={b} className="border border-ink-900/20 px-3.5 py-1.5 text-[0.95rem]">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
