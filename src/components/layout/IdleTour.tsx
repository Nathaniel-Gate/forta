"use client";

import { useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { idleTour } from "@/config/idle-tour";
import { tourState } from "@/lib/tour-state";

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const between = ([lo, hi]: readonly [number, number]) => lo + Math.random() * (hi - lo);
const { glide } = idleTour;

/**
 * After a quiet spell the page gives itself a tour: it glides down through the
 * sections one by one, resting on each, then loops back to the top. Sections
 * replay their entrance animations as the tour reaches them. Any input from the visitor ends the tour
 * at once and restarts the idle clock. Skipped for reduced motion, when the
 * tab is hidden, and while a form field has focus.
 */
export function IdleTour() {
  const lenis = useLenis();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!lenis || reduce) return;

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let nextTimer: ReturnType<typeof setTimeout> | undefined;
    let touring = false;
    let next = -1; // index of the stop to visit next; -1 = pick from the current scroll position
    let lastMouse = { x: -1, y: -1 };

    const formFocused = () => {
      const el = document.activeElement;
      return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT");
    };

    /**
     * Scroll positions to visit, top to bottom. Each section gets a stop with
     * its top edge aligned to the top of the screen. A section taller than the
     * screen gets further stops that move down it, the last one lining its
     * bottom edge up with the bottom of the screen, so all of it is seen at any
     * aspect ratio.
     */
    const stops = () => {
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const out: number[] = [];
      for (const id of idleTour.sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const top = window.scrollY + r.top;
        const bottomAligned = top + r.height - vh;
        const ys = [top];
        while (ys[ys.length - 1] + vh < top + r.height - vh * 0.05) {
          ys.push(Math.min(ys[ys.length - 1] + vh * idleTour.sliceStep, bottomAligned));
        }
        for (const y of ys) out.push(Math.min(max, Math.max(0, Math.round(y))));
      }
      // Clamping at the page ends can repeat a position; keep each once, in order.
      return out.filter((y, i) => i === 0 || y > out[i - 1] + 8);
    };

    const step = () => {
      if (!touring) return;
      if (document.hidden || formFocused()) return stop(true);
      const list = stops();
      if (!list.length) return stop(true);
      if (next < 0) {
        // Begin with the first stop below where the visitor was reading.
        const below = list.findIndex((y) => y > window.scrollY + 8);
        next = below < 0 ? 0 : below;
      }
      const y = list[next % list.length];
      next = (next + 1) % list.length;
      const distance = Math.abs(y - window.scrollY) / window.innerHeight;
      lenis.scrollTo(y, {
        duration: Math.min(glide.max, glide.base + distance * glide.perViewport),
        easing: easeInOutSine,
        force: true,
        onComplete: () => {
          if (touring) nextTimer = setTimeout(step, between(idleTour.dwellMs));
        },
      });
    };

    const armIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (document.hidden || formFocused()) return armIdle();
        touring = true;
        tourState.set(true);
        next = -1;
        step();
      }, idleTour.idleMs);
    };

    const stop = (rearm: boolean) => {
      if (touring) {
        touring = false;
        tourState.set(false);
        clearTimeout(nextTimer);
        lenis.scrollTo(lenis.scroll, { immediate: true, force: true }); // halt any glide in flight
      }
      if (rearm) armIdle();
    };

    const onActivity = () => stop(true);
    const onMouseMove = (e: MouseEvent) => {
      // Scrolling under a still cursor can fire synthetic moves; only real movement counts.
      if (e.clientX === lastMouse.x && e.clientY === lastMouse.y) return;
      lastMouse = { x: e.clientX, y: e.clientY };
      stop(true);
    };
    const onVisibility = () => (document.hidden ? stop(false) : armIdle());

    const events = ["wheel", "keydown", "pointerdown", "touchstart", "touchmove", "focusin"] as const;
    events.forEach((ev) => window.addEventListener(ev, onActivity, { passive: true }));
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    armIdle();

    return () => {
      clearTimeout(idleTimer);
      clearTimeout(nextTimer);
      touring = false;
      tourState.set(false);
      events.forEach((ev) => window.removeEventListener(ev, onActivity));
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [lenis, reduce]);

  return null;
}
