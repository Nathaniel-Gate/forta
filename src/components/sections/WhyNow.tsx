import { whyNow } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SourceRef } from "@/components/ui/SourceRef";

export function WhyNow() {
  const w = whyNow;
  return (
    <Section id="why" tone="ink" labelledBy="why-heading" className="!py-20 sm:!py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
          <h2 id="why-heading" className="text-[clamp(2rem,4vw,3rem)] font-medium leading-tight tracking-[-0.035em]">
            {w.title}
          </h2>
          <ul className="grid gap-10 sm:grid-cols-2">
            {w.stats.map((s) => (
              <li key={s.value}>
                <p className="text-[clamp(3.2rem,6vw,4.8rem)] font-medium leading-none tracking-[-0.05em] text-white">{s.value}</p>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-steel-300">
                  {s.label}
                  <SourceRef id={s.source} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
