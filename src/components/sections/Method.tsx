"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { method } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

type Phase = (typeof method.phases)[number];

/**
 * The method as a scroll narrative. On desktop a sticky "who holds the pen"
 * gauge tracks the phase in view, showing responsibility moving to the client.
 */
export function Method() {
  const [active, setActive] = useState(0);
  const phase = method.phases[active];

  return (
    <Section id="method" tone="ink" labelledBy="method-heading">
      <Container>
        <SectionHeader id="method-heading" index={method.index} eyebrow={method.eyebrow} title={method.title} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-[calc(var(--nav-h)+3rem)]">
              <OwnershipGauge phase={phase} index={active} />
            </div>
          </aside>

          <ol className="relative">
            {/* Spine line */}
            <span aria-hidden className="absolute bottom-6 left-[0.3rem] top-6 w-px bg-white/[0.09]" />
            {method.phases.map((p, i) => (
              <PhaseItem key={p.n} phase={p} index={i} active={i === active} onActive={() => setActive(i)} />
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

function PhaseItem({
  phase,
  index,
  active,
  onActive,
}: {
  phase: Phase;
  index: number;
  active: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <li ref={ref} className="relative pb-12 pl-10 last:pb-0 sm:pl-14">
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-[0.6rem] h-[0.65rem] w-[0.65rem] rotate-45 border transition-all duration-500",
          active ? "border-signal bg-signal shadow-[0_0_14px_rgb(91_140_255/0.7)]" : "border-white/40 bg-ink-900",
        )}
      />
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-[0.72rem] text-steel-500">{phase.n}</span>
        <h3
          className={cn(
            "text-[clamp(1.8rem,3vw,2.5rem)] font-medium tracking-[-0.035em] transition-colors duration-500",
            active ? "text-white" : "text-steel-400",
          )}
        >
          {phase.name}
        </h3>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-steel-500">{phase.duration}</span>
      </div>
      <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-steel-300">{phase.body}</p>
      {/* Inline split bar, shown on all sizes so mobile gets the same idea */}
      <div className="mt-6 max-w-xl lg:hidden">
        <SplitBar forta={phase.forta} />
      </div>
      <span className="sr-only">
        {method.gaugeLabels.forta} leads {phase.forta}% of the work in this phase; {method.gaugeLabels.client} leads{" "}
        {100 - phase.forta}%.
      </span>
      {index === 0 && <span className="sr-only">Responsibility shifts to your team in every later phase.</span>}
    </li>
  );
}

function SplitBar({ forta }: { forta: number }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden>
      <div className="flex h-1.5 w-full overflow-hidden bg-white/[0.06]">
        <motion.div
          className="h-full bg-steel-500"
          initial={false}
          animate={{ width: `${forta}%` }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="h-full bg-signal"
          initial={false}
          animate={{ width: `${100 - forta}%` }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[0.64rem] uppercase tracking-[0.14em] text-steel-500">
        <span>
          {method.gaugeLabels.forta} {forta}%
        </span>
        <span className="text-stone-100">
          {method.gaugeLabels.client} {100 - forta}%
        </span>
      </div>
    </div>
  );
}

function OwnershipGauge({ phase, index }: { phase: Phase; index: number }) {
  const reduce = useReducedMotion();
  const client = 100 - phase.forta;
  return (
    <div className="edge-steel relative bg-ink-850 p-8" aria-hidden>
      <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.18em] text-steel-500">
        <span>Who holds the pen</span>
        <span>
          Phase {phase.n} / 0{method.phases.length}
        </span>
      </div>

      <div className="mt-10 flex items-end justify-between">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-signal">{method.gaugeLabels.client}</p>
          <p className="mt-2 text-[5.5rem] font-medium leading-none tracking-[-0.06em] text-white tabular-nums">
            {client}
            <span className="text-[2.5rem] text-steel-500">%</span>
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-steel-500">{method.gaugeLabels.forta}</p>
          <p className="mt-2 text-[2rem] font-medium leading-none tracking-[-0.04em] text-steel-400 tabular-nums">
            {phase.forta}%
          </p>
        </div>
      </div>

      {/* Ten-cell meter reads like an engineering gauge */}
      <div className="mt-8 grid grid-cols-10 gap-1">
        {Array.from({ length: 10 }).map((_, i) => {
          const filled = i >= 10 - Math.floor(client / 10);
          return (
            <motion.span
              key={i}
              className="h-10"
              initial={false}
              animate={{
                backgroundColor: filled ? "rgb(91 140 255 / 0.9)" : "rgb(255 255 255 / 0.06)",
              }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : (9 - i) * 0.025 }}
            />
          );
        })}
      </div>

      <div className="mt-8 flex gap-1.5">
        {method.phases.map((p, i) => (
          <span
            key={p.n}
            className={cn("h-px flex-1 transition-colors duration-500", i <= index ? "bg-white" : "bg-white/15")}
          />
        ))}
      </div>
      <p className="mt-4 text-[1.4rem] font-medium tracking-[-0.03em] text-white">{phase.name}</p>
      <p className="mt-1 text-[0.92rem] text-steel-400">{phase.duration}</p>
    </div>
  );
}
