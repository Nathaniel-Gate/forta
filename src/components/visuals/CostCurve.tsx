"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PathOption } from "@/content/home";

/**
 * Small illustrative cost-over-time chart for each path. Shapes only, no data:
 * the caption in the section says so explicitly.
 */
const curves: Record<PathOption["curve"], { cost: string; capability?: string }> = {
  // Rent: steadily rising with annual uplifts
  rising: { cost: "M0 92 L40 86 L40 80 L80 74 L80 66 L120 60 L120 50 L160 44 L160 32 L200 26" },
  // Commission: big build cost, then change-request steps
  stepped: { cost: "M0 92 L20 40 L60 40 L60 34 L100 34 L100 26 L140 26 L140 18 L200 18" },
  // Own: front-loaded, then flattening (cumulative, so never falls); capability rises
  flattening: {
    cost: "M0 92 L28 56 C60 50 120 47 200 45",
    capability: "M0 96 C50 94 80 70 120 46 C150 30 175 22 200 18",
  },
};

export function CostCurve({ curve, highlight }: { curve: PathOption["curve"]; highlight?: boolean }) {
  const reduce = useReducedMotion();
  const c = curves[curve];
  const draw = (delay: number) => ({
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: "0px 0px -15% 0px" },
    transition: reduce ? { duration: 0 } : { duration: 1.6, delay, ease: [0.65, 0, 0.35, 1] as const },
  });

  return (
    <figure className="m-0">
      <svg viewBox="-6 0 212 104" className="w-full" aria-hidden fill="none">
        {[24, 48, 72].map((y) => (
          <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="var(--hairline)" strokeWidth="0.75" />
        ))}
        <line x1="0" x2="200" y1="98" y2="98" stroke="var(--hairline-strong)" strokeWidth="0.75" />
        <line x1="0" x2="0" y1="4" y2="98" stroke="var(--hairline-strong)" strokeWidth="0.75" />
        <motion.path {...draw(0.1)} d={c.cost} stroke="currentColor" strokeWidth="1.6" />
        {c.capability && (
          <motion.path
            {...draw(0.5)}
            d={c.capability}
            stroke="var(--color-signal)"
            strokeWidth="1.6"
            strokeDasharray="4 3"
          />
        )}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.64rem] uppercase tracking-[0.14em]">
        <span className="flex items-center gap-2 opacity-80">
          <span className="h-px w-4 bg-current" aria-hidden /> Cumulative cost
        </span>
        {c.capability && (
          <span className={highlight ? "flex items-center gap-2" : "flex items-center gap-2 opacity-80"} style={{ color: highlight ? "var(--color-signal)" : undefined }}>
            <span className="h-px w-4 border-t border-dashed border-current" aria-hidden /> Internal capability
          </span>
        )}
        <span className="opacity-80">Time →</span>
      </figcaption>
    </figure>
  );
}
