import { engagement } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Engagement() {
  const e = engagement;
  return (
    <Section id="engagement" tone="deep" labelledBy="engagement-heading">
      <Container>
        <SectionHeader id="engagement-heading" index={e.index} eyebrow={e.eyebrow} title={e.title} />
        <ol className="border-t border-white/15">
          {e.stages.map((s, i) => (
            <Reveal
              as="li"
              key={s.name}
              delay={i * 0.08}
              className="group grid gap-2 border-b border-white/15 py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,0.7fr)_minmax(0,1.4fr)] md:gap-8"
            >
              <h3 className="flex items-baseline gap-4 text-[1.45rem] font-medium tracking-[-0.025em] text-white">
                <span className="font-mono text-[0.72rem] text-steel-500 transition-colors group-hover:text-signal">{String(i + 1).padStart(2, "0")}</span>
                {s.name}
              </h3>
              <p className="font-mono text-[0.85rem] text-stone-100 md:pt-2">{s.shape}</p>
              <p className="text-[1rem] leading-relaxed text-steel-300 md:pt-1.5">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-6 max-w-xl text-[1rem] text-steel-400">{e.note}</p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="#stack" arrow>
            Get your free stack rebuild
          </ButtonLink>
          <ButtonLink intent="call" variant="ghost" className="text-white">
            Book a call
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
