import { getSource, sourceIndex, type SourceId } from "@/content/sources";
import { cn } from "@/lib/cn";

/** Superscript citation linking to the numbered references list in the footer. */
export function SourceRef({ id, className }: { id: SourceId; className?: string }) {
  const n = sourceIndex[id];
  const s = getSource(id);
  return (
    <a
      href={`#ref-${n}`}
      className={cn(
        "ml-0.5 inline-block align-super font-mono text-[0.62em] leading-none opacity-80 transition-opacity hover:opacity-100",
        className,
      )}
      aria-label={`Source ${n}: ${s.publisher}, ${s.title}`}
    >
      [{n}]
    </a>
  );
}

/** Inline source label for stat cards: "Gartner, Oct 2024 [1]" */
export function SourceLabel({ id, className }: { id: SourceId; className?: string }) {
  const s = getSource(id);
  const n = sourceIndex[id];
  return (
    <a
      href={`#ref-${n}`}
      className={cn(
        "font-mono text-[0.68rem] uppercase tracking-[0.12em] opacity-75 transition-opacity hover:opacity-100",
        className,
      )}
    >
      {s.publisher}, {s.year} <span aria-hidden>[{n}]</span>
    </a>
  );
}
