import { cn } from "@/lib/cn";

/** Section title with optional lede. Deliberately plain: no numbering, no eyebrow labels. */
export function SectionHeader({
  title,
  lede,
  id,
  className,
}: {
  title: string;
  lede?: string;
  id: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-12 max-w-3xl sm:mb-16", className)}>
      <h2 id={id} className="text-balance text-[clamp(2rem,4.2vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.035em]">
        {title}
      </h2>
      {lede && <p className="mt-5 max-w-xl text-pretty text-[1.1rem] leading-relaxed opacity-75">{lede}</p>}
    </header>
  );
}
