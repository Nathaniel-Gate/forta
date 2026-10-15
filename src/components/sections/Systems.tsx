import { systems } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Capability catalogue. Hover lights each card; the replacement line is always visible. */
export function Systems() {
  const s = systems;
  return (
    <Section id="systems" tone="deep" labelledBy="systems-heading">
      <div aria-hidden className="bg-blueprint absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      <Container>
        <SectionHeader id="systems-heading" index={s.index} eyebrow={s.eyebrow} title={s.title} lede={s.lede} />
        <ul className="grid gap-px bg-white/[0.07] sm:grid-cols-2 xl:grid-cols-4">
          {s.items.map((it, i) => (
            <Reveal as="li" key={it.name} delay={(i % 4) * 0.06} className="bg-ink-950">
              <article className="group relative flex h-full min-h-[17rem] flex-col p-7 transition-colors duration-500 hover:bg-ink-850">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-0 bg-signal transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full"
                />
                <span className="font-mono text-[0.68rem] text-steel-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-[1.3rem] font-medium leading-tight tracking-[-0.025em] text-white">{it.name}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-steel-400">{it.body}</p>
                <p className="mt-auto pt-8 text-[0.85rem] leading-snug text-steel-300 transition-colors duration-500 group-hover:text-white">
                  <span className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-500">
                    Typically replaces
                  </span>
                  {it.replaces}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
