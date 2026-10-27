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
    let offNudge: (() => void) | undefined;
    let next = -1; // index of the stop to visit next; -1 = pick from the current scroll position
    let lastMouse = { x: -1, y: -1 };

    const formFocused = () => {
      const el = document.activeElement;
      return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT");
    };

    /**
     * Scroll positions to visit, top to bottom. Each section gets a stop that
     * puts its content just under the fixed nav, skipping the section's empty
     * top padding (the opening screen sits at 0). A section taller than the
     * screen gets further stops that move down it, the last one lining its
     * bottom edge up with the bottom of the screen, so all of it is seen at any
     * aspect ratio.
     */
    const stops = () => {
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const navH = document.querySelector("header")?.getBoundingClientRect().height ?? 68;
      const out: number[] = [];
      for (const id of idleTour.sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const pad = id === "top" ? 0 : parseFloat(getComputedStyle(el).paddingTop) || 0;
        const top = Math.max(0, window.scrollY + r.top + pad - navH - idleTour.navGapPx);
        // The contact stop is the form itself: one stop that always shows the whole form, down to its button.
        const form = id === "contact" ? el.querySelector<HTMLElement>(".edge-steel") : null;
        if (form) {
          const fr = form.getBoundingClientRect();
          const formTop = window.scrollY + fr.top;
          const room = vh - navH;
          const fits = fr.height + 2 * idleTour.navGapPx <= room;
          // Fits: centre the form. Taller than the screen: line the bottom of the form up with the bottom of the screen.
          const y = fits ? formTop - navH - (room - fr.height) / 2 : formTop + fr.height + idleTour.navGapPx - vh;
          out.push(Math.min(max, Math.max(0, Math.round(y))));
          continue;
        }
        const end = window.scrollY + r.top + r.height;
        const bottomAligned = end - vh;
        const ys = [top];
        while (ys[ys.length - 1] + vh < end - vh * 0.05) {
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
      tourState.setNudge(false);
      const index = next % list.length;
      const isLast = index === list.length - 1;
      const y = list[index];
      next = (index + 1) % list.length;
      const distance = Math.abs(y - window.scrollY) / window.innerHeight;
      lenis.scrollTo(y, {
        duration: Math.min(glide.max, glide.base + distance * glide.perViewport),
        easing: easeInOutSine,
        force: true,
        onComplete: () => {
          if (!touring) return;
          if (!isLast) {
            nextTimer = setTimeout(step, between(idleTour.dwellMs));
            return;
          }
          // Final stop: let the form prompt play, then head back up.
          let done = false;
          const finish = () => {
            if (done) return;
            done = true;
            off();
            clearTimeout(nextTimer);
            tourState.setNudge(false);
            nextTimer = setTimeout(step, idleTour.afterNudgeMs);
          };
          const off = tourState.onNudgeEnd(finish);
          offNudge = off;
          tourState.setNudge(true);
          nextTimer = setTimeout(finish, idleTour.nudgeMaxMs);
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
        offNudge?.();
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
