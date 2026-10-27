"use client";

import { animate, useReducedMotion } from "motion/react";
import { useReplayInView } from "@/lib/use-replay-in-view";
import { useEffect, useRef } from "react";

/**
 * Renders the final formatted value (so it is correct without JS), then
 * animates the text towards `value` on first view and whenever it changes.
 * Writes to the DOM directly to avoid a React render per frame.
 */
export function CountUp({
  value,
  format,
  duration = 0.9,
  className,
}: {
  value: number;
  format: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useReplayInView(ref, "0px 0px -10% 0px");
  const reduce = useReducedMotion();
  const from = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!inView) {
      from.current = 0; // replay from zero on the next entry
      return;
    }
    if (reduce) {
      el.textContent = format(value);
      from.current = value;
      return;
    }
    const controls = animate(from.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        from.current = v;
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [value, inView, reduce, duration, format]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
