"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { OwnershipSchematic } from "@/components/visuals/OwnershipSchematic";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Light parallax: the drawing drifts slower than the copy. Disabled with reduced motion.
  const drawingY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.3]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { delay, duration: 1, ease },
  });

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-heading"
      className="grain relative isolate overflow-hidden bg-ink-950 pt-[calc(var(--nav-h)+3.5rem)] sm:pt-[calc(var(--nav-h)+5rem)]"
    >
      {/* Blueprint field, faded towards the edges */}
      <motion.div
        aria-hidden
        style={{ opacity: gridOpacity }}
        className="bg-blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_35%,black_20%,transparent_75%)]"
      />
      {/* A cold, high key light from above. Steel, not neon. */}
      <div
        aria-hidden
        className="absolute -top-1/3 left-1/2 -z-10 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(220_228_255/0.10),transparent)]"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-10">
          <div className="min-w-0">
            <motion.p
              {...rise(0.05)}
              className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-400"
            >
              <span className="pulse-dot h-1.5 w-1.5 bg-signal" aria-hidden />
              <span className="flex min-w-0 flex-wrap gap-x-[0.8em]">
                {hero.eyebrow.split(" · ").map((part, i) => (
                  <span key={part} className="whitespace-nowrap">
                    {i > 0 && <span aria-hidden className="mr-[0.8em]">·</span>}
                    {part}
                  </span>
                ))}
              </span>
            </motion.p>

            <h1
              id="hero-heading"
              className="mt-8 text-[clamp(3rem,8.4vw,7.6rem)] font-medium leading-[0.92] tracking-[-0.055em] text-white"
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
              className="mt-9 max-w-[36rem] text-pretty text-[1.08rem] leading-relaxed text-steel-300 sm:text-[1.2rem]"
            >
              {hero.subhead}
            </motion.p>

            <motion.div {...rise(0.7)} className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <ButtonLink intent={hero.primaryCta.intent}>{hero.primaryCta.label}</ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="ghost" className="text-white">
                {hero.secondaryCta.label}
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div style={{ y: drawingY }} className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
            <div className="relative">
              {/* Corner registration marks frame the drawing like a print */}
              {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map(
                (c) => (
                  <span key={c} aria-hidden className={`absolute h-4 w-4 border-white/40 ${c}`} />
                ),
              )}
              <OwnershipSchematic className="w-full p-5 sm:p-8" />
            </div>
          </motion.div>
        </div>

        <motion.dl
          {...rise(0.9)}
          className="mt-20 grid border-t border-white/[0.09] sm:mt-28 md:grid-cols-3"
        >
          {hero.proof.map((p, i) => (
            <div
              key={p.k}
              className={`py-7 md:py-9 ${i > 0 ? "border-t border-white/[0.09] md:border-l md:border-t-0 md:pl-8" : "md:pr-8"}`}
            >
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel-500">{p.k}</dt>
              <dd className="mt-3 text-[1.02rem] leading-snug text-stone-100">{p.v}</dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
