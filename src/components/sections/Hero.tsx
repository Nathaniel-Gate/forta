import Image from "next/image";
import { hero, team } from "@/content/home";
import { stackOffer } from "@/content/stack";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StackForm } from "@/components/stack/StackForm";

/**
 * The whole pitch in one screen: the claim, one sentence, the free stack
 * rebuild form, and the two directors' faces. No decoration.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="bg-ink-950 pb-20 pt-[calc(var(--nav-h)+2.5rem)] sm:pt-[calc(var(--nav-h)+4rem)]"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div className="min-w-0 lg:pt-4">
            <h1
              id="hero-heading"
              className="text-balance text-[clamp(2.9rem,6.6vw,5.8rem)] font-medium leading-[0.95] tracking-[-0.05em] text-white"
            >
              {hero.headline}
            </h1>
            <p className="mt-7 max-w-[34rem] text-pretty text-[1.15rem] leading-relaxed text-steel-300 sm:text-[1.25rem]">
              {hero.subhead}
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {team.people.map((p) => (
                  <Image
                    key={p.name}
                    src={p.photo}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full border-2 border-ink-950 object-cover grayscale"
                  />
                ))}
              </div>
              <p className="text-[0.95rem] leading-snug text-steel-300">
                {hero.byline}
                <span className="block text-steel-400">Oree built AI agents at HubSpot. Nathaniel works on AI at Moody&apos;s.</span>
              </p>
            </div>

            <ButtonLink intent={hero.secondaryCta.intent} variant="ghost" className="mt-10 hidden text-white lg:inline-flex">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <div id="stack" className="scroll-mt-24 border border-white/15 bg-ink-900 p-6 sm:p-8">
            <h2 className="text-[1.6rem] font-medium leading-tight tracking-[-0.03em] text-white">{stackOffer.title}</h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-steel-300">{stackOffer.lead}</p>
            <StackForm source="home-hero" className="mt-7" />
          </div>
        </div>
      </Container>
    </section>
  );
}
