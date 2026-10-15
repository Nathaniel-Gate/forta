import { cn } from "@/lib/cn";

type Tone = "ink" | "paper" | "deep";

const toneClass: Record<Tone, string> = {
  ink: "bg-ink-900 text-stone-100",
  deep: "bg-ink-950 text-stone-100",
  paper: "bg-paper text-ink-900",
};

/**
 * Page section wrapper. `tone` sets the surface and flips shared tokens
 * (hairlines, blueprint grid) for paper sections via [data-tone].
 */
export function Section({
  id,
  tone = "ink",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      data-tone={tone === "paper" ? "paper" : "ink"}
      aria-labelledby={labelledBy}
      className={cn("relative isolate py-24 sm:py-32 lg:py-40", toneClass[tone], className)}
    >
      {children}
    </section>
  );
}
