"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/**
 * Lenis smooth scrolling for the whole page. With reduced motion, smoothing
 * is switched off (lerp 1, no wheel smoothing) so scrolling behaves natively.
 * The wrapper is always rendered so server and client trees match.
 * `anchors` makes in-page links glide; the nav offset comes from CSS scroll-padding-top.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <ReactLenis
      root
      options={{
        lerp: reduce ? 1 : 0.11,
        smoothWheel: !reduce,
        anchors: reduce ? { immediate: true } : true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
