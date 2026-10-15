"use client";

import { cn } from "@/lib/cn";
import type { Intent } from "@/content/home";
import { requestIntent } from "@/lib/intent";

type Variant = "primary" | "ghost" | "paper";

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden px-6 text-[0.95rem] font-medium tracking-[-0.01em] transition-[background-color,color,box-shadow,border-color] duration-300 ease-[var(--ease-out-expo)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-ink-950 hover:bg-stone-100 shadow-[0_0_0_1px_rgb(255_255_255/0.4),0_0_32px_-8px_rgb(255_255_255/0.5)] hover:shadow-[0_0_0_1px_rgb(91_140_255/0.6),0_0_36px_-6px_rgb(91_140_255/0.55)]",
  ghost: "border border-[var(--hairline-strong)] text-current hover:border-current",
  paper: "bg-ink-950 text-white hover:bg-ink-800",
};

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
    >
      <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Link-style CTA. Pass `intent` to preselect the enquiry form type before scrolling to it. */
export function ButtonLink({
  href,
  intent,
  variant = "primary",
  className,
  children,
  arrow = true,
}: {
  href?: string;
  intent?: Intent;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
}) {
  return (
    <a
      href={href ?? "#contact"}
      onClick={() => intent && requestIntent(intent)}
      className={cn(base, variants[variant], className)}
    >
      <span>{children}</span>
      {arrow && <Arrow />}
    </a>
  );
}
