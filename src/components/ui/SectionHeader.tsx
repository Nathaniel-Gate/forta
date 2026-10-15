import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * Standard section opening: a mono index + eyebrow on a hairline, then the title.
 * The index ("01") echoes drawing-sheet numbering, which carries the blueprint motif.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  lede,
  id,
  className,
  align = "split",
}: {
  index?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  id: string;
  className?: string;
  align?: "split" | "stack";
}) {
  return (
    <header className={cn("mb-14 sm:mb-20", className)}>
      <Reveal>
        <div className="flex items-center gap-4 border-t hairline pt-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] opacity-80">
          {index && <span>{index}</span>}
          <span aria-hidden className="h-px w-6 bg-current opacity-40" />
          <span>{eyebrow}</span>
        </div>
      </Reveal>
      <div
        className={cn(
          "mt-8 grid gap-8",
          align === "split" && lede && "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-16",
        )}
      >
        <Reveal delay={0.05}>
          <h2
            id={id}
            className="text-balance text-[clamp(2rem,4.6vw,3.9rem)] font-medium leading-[1.02] tracking-[-0.035em]"
          >
            {title}
          </h2>
        </Reveal>
        {lede && (
          <Reveal delay={0.12}>
            <p className="max-w-xl text-pretty text-[1.05rem] leading-relaxed opacity-70 sm:text-lg">{lede}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
