"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navCta, navLinks } from "@/content/navigation";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[60] -translate-y-20 bg-white px-4 py-2 text-sm text-ink-950 focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-white/[0.07] bg-ink-950/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[var(--nav-h)] max-w-[86rem] items-center justify-between px-[var(--gutter)]"
        >
          <a href="#top" aria-label="Algosoup, back to top" className="text-white" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-[0.875rem] text-steel-300 transition-colors hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={navCta.href}
              className="hidden h-10 items-center border border-white/20 px-4 text-[0.85rem] text-white transition-colors hover:border-white hover:bg-white hover:text-ink-950 sm:inline-flex"
            >
              {navCta.label}
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="relative flex h-10 w-10 items-center justify-center text-white lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-[3.5px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-[3.5px]",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 bg-ink-950 pt-[var(--nav-h)] lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-blueprint absolute inset-0 opacity-60" aria-hidden />
            <ul className="relative flex flex-col px-[var(--gutter)] pt-8">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-white/[0.08]"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 text-3xl font-medium tracking-[-0.03em] text-white"
                  >
                    {l.label}
                    <span className="font-mono text-xs text-steel-400">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="relative px-[var(--gutter)] pt-10">
              <a
                href={navCta.href}
                onClick={() => setOpen(false)}
                className="flex h-14 items-center justify-center bg-white text-ink-950"
              >
                {navCta.label}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
