"use client";

import { cn } from "@/lib/cn";
import type { Intent } from "@/content/home";
import { requestIntent } from "@/lib/intent";

type Variant = "primary" | "ghost" | "paper";

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[0.95rem] font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-white text-ink-950 hover:bg-stone-200",
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
  arrow = false,
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
