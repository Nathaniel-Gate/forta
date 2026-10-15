import { whatWeDo } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { OwnershipSchematic } from "@/components/visuals/OwnershipSchematic";

/** What changes for the client, beside a plotted drawing of the system they end up owning. */
export function WhatWeDo() {
  const w = whatWeDo;
  return (
    <Section id="what" tone="deep" labelledBy="what-heading">
      <div
        aria-hidden
        className="bg-blueprint absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
      />
      <Container>
        <SectionHeader id="what-heading" index={w.index} eyebrow={w.eyebrow} title={w.title} />
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map(
              (c) => (
                <span key={c} aria-hidden className={`absolute h-4 w-4 border-white/40 ${c}`} />
              ),
            )}
            <OwnershipSchematic className="w-full p-5 sm:p-8" />
          </Reveal>

          <ol className="order-1 lg:order-2">
            {w.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 0.06} className="group border-t border-white/[0.12] py-7 first:pt-0 first:border-t-0">
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-[0.72rem] text-steel-500 transition-colors group-hover:text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.55rem] font-medium tracking-[-0.03em] text-white">{it.title}</h3>
                    <p className="mt-2.5 max-w-lg text-[1.02rem] leading-relaxed text-steel-300">{it.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-16 border-t border-white/[0.12] pt-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-steel-400">{w.buildsLabel}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {w.builds.map((b) => (
              <li
                key={b}
                className="border border-white/15 bg-white/[0.02] px-3.5 py-1.5 text-[0.92rem] text-stone-100 transition-colors hover:border-white/40"
              >
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
