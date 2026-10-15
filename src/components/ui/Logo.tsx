import { cn } from "@/lib/cn";

/**
 * Forta mark: a drafting frame whose inner corner is "handed over", i.e. the
 * line that starts on the frame continues inside it. Pure SVG, inherits colour.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-5 w-5", className)} fill="none">
      <path d="M2.5 21.5V2.5h19" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 21.5V7.5h14" stroke="currentColor" strokeWidth="1.6" />
      <rect x="12" y="12" width="4" height="4" fill="var(--color-signal)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[1.15rem] font-semibold tracking-[-0.04em]">Forta</span>
    </span>
  );
}
