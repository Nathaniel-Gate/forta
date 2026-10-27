"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero, team } from "@/content/home";
import { stackOffer } from "@/content/stack";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StackForm } from "@/components/stack/StackForm";
import { useReplayInView } from "@/lib/use-replay-in-view";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Opening screen: the claim, the directors, and the free stack rebuild form
 * framed like a drawing sheet. Blueprint grid and a cold key light behind.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.3]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);

  const shown = useReplayInView(ref);
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: reduce ? { duration: 0 } : shown ? { delay, duration: 1, ease } : { duration: 0.3 },
  });

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-heading"
      className="grain relative isolate overflow-hidden bg-ink-950 pt-[calc(var(--nav-h)+2.5rem)] sm:pt-[calc(var(--nav-h)+3.5rem)]"
    >
      <motion.div
        aria-hidden
        style={{ opacity: gridOpacity, y: gridY }}
        className="bg-blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_85%_75%_at_65%_35%,black_20%,transparent_78%)]"
      />
      <div
        aria-hidden
        className="absolute -top-1/3 left-1/2 -z-10 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(220_228_255/0.10),transparent)]"
      />

      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
          <div className="min-w-0 lg:pt-6">
            <motion.p
              {...rise(0.05)}
              className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-400"
            >
              {hero.eyebrow}
            </motion.p>

            <h1
              id="hero-heading"
              className="mt-7 text-[clamp(3rem,7vw,6.2rem)] font-medium leading-[0.92] tracking-[-0.055em] text-white"
            >
              {hero.headline.map((line, i) => (
                <span key={line} className="-mb-[0.08em] block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className={
                      i === hero.headline.length - 1
                        ? "block font-serif font-normal italic tracking-[-0.03em] text-steel-300"
                        : "block"
                    }
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={reduce ? { duration: 0 } : { delay: 0.15 + i * 0.1, duration: 1.1, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              {...rise(0.55)}
              className="mt-8 max-w-[34rem] text-pretty text-[1.1rem] leading-relaxed text-steel-300 sm:text-[1.2rem]"
            >
              {hero.subhead}
            </motion.p>

            <motion.div {...rise(0.7)} className="mt-9 flex items-center gap-4">
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
              <p className="text-[0.95rem] leading-snug text-stone-100">
                {hero.byline}
                <span className="block text-steel-400">{hero.bylineDetail}</span>
              </p>
            </motion.div>

            <motion.div {...rise(0.8)} className="mt-9 hidden lg:block">
              <ButtonLink intent={hero.secondaryCta.intent} variant="ghost" className="text-white" arrow>
                {hero.secondaryCta.label}
              </ButtonLink>
            </motion.div>
          </div>

          {/* The offer, drawn as a sheet: registration marks and an annotation strip */}
          <motion.div
            {...rise(0.35)}
            id="stack"
            className="relative scroll-mt-24"
          >
            {["-left-2 -top-2 border-l border-t", "-right-2 -top-2 border-r border-t", "-left-2 -bottom-2 border-l border-b", "-right-2 -bottom-2 border-r border-b"].map(
              (c) => (
                <span key={c} aria-hidden className={`absolute h-4 w-4 border-white/40 ${c}`} />
              ),
            )}
            <div className="edge-steel relative bg-ink-900/85 p-6 backdrop-blur sm:p-8">
              <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.18em] text-steel-400">
                <span>Free offer</span>
                <span>Back in 3 hours</span>
              </div>
              <h2 className="mt-5 text-[1.7rem] font-medium leading-tight tracking-[-0.03em] text-white">{stackOffer.title}</h2>
              <p className="mt-3 text-[1rem] leading-relaxed text-steel-300">{stackOffer.lead}</p>
              <StackForm source="home-hero" className="mt-7" />
            </div>
          </motion.div>
        </div>

        <motion.dl {...rise(0.95)} className="mt-16 grid border-t border-white/[0.09] sm:mt-20 md:grid-cols-3">
          {hero.proof.map((p, i) => (
            <div
              key={p.value}
              className={`flex flex-col-reverse py-7 md:py-8 ${i > 0 ? "border-t border-white/[0.09] md:border-l md:border-t-0 md:pl-8" : "md:pr-8"}`}
            >
              <dt className="mt-2 text-[1rem] leading-snug text-steel-300">{p.label}</dt>
              <dd className="text-[clamp(2.4rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.045em] text-white">
                {p.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
