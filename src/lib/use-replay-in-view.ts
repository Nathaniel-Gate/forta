"use client";

import { useEffect, useState, type RefObject } from "react";
import { useTouring } from "@/lib/tour-state";

/**
 * True while an element should be shown. Normally that is "has been in view
 * at least once" (animate in once, stay). During the idle tour it follows the
 * viewport exactly, so every section replays its entrance each time the tour
 * arrives. Server and first client render both return false.
 */
export function useReplayInView(ref: RefObject<Element | null>, margin = "0px"): boolean {
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const touring = useTouring();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);

  return touring ? inView : inView || seen;
}
