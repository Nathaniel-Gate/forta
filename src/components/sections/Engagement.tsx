import { engagement } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Engagement() {
  const e = engagement;
  return (
    <Section id="engagement" tone="deep" labelledBy="engagement-heading">
      <Container>
        <SectionHeader id="engagement-heading" title={e.title} />
        <ol className="border-t border-white/15">
          {e.stages.map((s) => (
            <li
              key={s.name}
              className="grid gap-2 border-b border-white/15 py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,0.7fr)_minmax(0,1.4fr)] md:gap-8"
            >
              <h3 className="text-[1.45rem] font-medium tracking-[-0.025em] text-white">{s.name}</h3>
              <p className="text-[1rem] text-stone-100 md:pt-1.5">{s.shape}</p>
              <p className="text-[1rem] leading-relaxed text-steel-300 md:pt-1.5">{s.body}</p>
            </li>
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
