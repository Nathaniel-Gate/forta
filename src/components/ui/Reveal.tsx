"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useReplayInView } from "@/lib/use-replay-in-view";

/**
 * Fade-and-rise on entry to the viewport (and on every re-entry during the idle tour). Markup is identical with
 * reduced motion (avoids hydration mismatches); only the timing drops to zero.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const shown = useReplayInView(ref, "0px 0px -12% 0px");
  const Comp = as === "li" ? motion.li : as === "span" ? motion.span : motion.div;
  return (
    <Comp
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={reduce ? { duration: 0 } : shown ? { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] } : { duration: 0.3 }}
    >
      {children}
    </Comp>
  );
}
