import type { Mark } from "@/content/home";
import { cn } from "@/lib/cn";

/** Single-shape markers for comparison tables: filled, half-filled, empty square. */
export function MarkIcon({ mark, className }: { mark: Mark; className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={cn("h-3 w-3", className)} aria-hidden>
      <rect x="0.75" y="0.75" width="10.5" height="10.5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity={mark === "none" ? 0.35 : 1} />
      {mark === "full" && <rect x="3" y="3" width="6" height="6" fill="currentColor" />}
      {mark === "part" && <rect x="3" y="3" width="3" height="6" fill="currentColor" />}
    </svg>
  );
}
