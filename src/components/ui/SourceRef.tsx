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
