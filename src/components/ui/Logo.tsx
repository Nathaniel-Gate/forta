import { cn } from "@/lib/cn";

/** Algosoup wordmark: the text {algosoup} in IBM Plex Mono Bold, as on algosoup.ai. */
export function LogoMark({ className }: { className?: string }) {
  return <span aria-hidden className={cn("font-mono font-bold text-signal", className)}>{"{}"}</span>;
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center font-mono font-bold tracking-[-0.02em] text-[1.15rem]", className)}>
      {"{algosoup}"}
    </span>
  );
}
