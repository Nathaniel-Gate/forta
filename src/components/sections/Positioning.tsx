import { positioning, type Mark } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { MarkIcon } from "@/components/ui/MarkIcon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

/** Category comparison. A real table on desktop; per-option cards on small screens. */
export function Positioning() {
  const p = positioning;
  const forta = p.columns.length - 1;
  const label = (m: Mark) => p.legend[m];

  return (
    <Section id="positioning" tone="paper" labelledBy="positioning-heading">
      <Container>
        <SectionHeader id="positioning-heading" index={p.index} eyebrow={p.eyebrow} title={p.title} lede={p.lede} />

        <Reveal className="hidden lg:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Comparison of Forta with alternative approaches</caption>
            <thead>
              <tr className="border-b border-ink-900/80">
                <th scope="col" className="w-[26%] pb-5 font-mono text-[0.68rem] font-normal uppercase tracking-[0.16em] text-ink-900/70">
                  Criterion
                </th>
                {p.columns.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={cn(
                      "px-4 pb-5 align-bottom text-[0.95rem] font-medium leading-tight tracking-[-0.01em]",
                      i === forta && "bg-ink-950 pt-6 text-white",
                    )}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.rows.map((row, ri) => (
                <tr key={row.k} className="border-b border-ink-900/12">
                  <th scope="row" className="py-5 pr-6 text-[1rem] font-normal">
                    {row.k}
                  </th>
                  {row.marks.map((m, i) => (
                    <td
                      key={i}
                      className={cn(
                        "px-4 py-5",
                        i === forta && "bg-ink-950 text-white",
                        i === forta && ri === p.rows.length - 1 && "pb-7",
                      )}
                    >
                      <span className="flex items-center gap-2.5 text-[0.85rem]">
                        <MarkIcon mark={m} className={i === forta ? "text-signal" : undefined} />
                        <span className={cn(m === "none" && "opacity-70")}>{label(m)}</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile and tablet: one card per option, Forta first */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:hidden">
          {[forta, ...p.columns.map((_, i) => i).filter((i) => i !== forta)].map((ci) => (
            <li key={p.columns[ci]} className={cn("p-6", ci === forta ? "bg-ink-950 text-white" : "border border-ink-900/15")}>
              <h3 className="text-[1.25rem] font-medium tracking-[-0.02em]">{p.columns[ci]}</h3>
              <ul className="mt-5 space-y-3">
                {p.rows.map((row) => (
                  <li key={row.k} className="flex items-start justify-between gap-4 text-[0.9rem]">
                    <span className={cn(row.marks[ci] === "none" && "opacity-70")}>{row.k}</span>
                    <span className="flex shrink-0 items-center gap-2 text-[0.8rem]">
                      <MarkIcon mark={row.marks[ci]} className={ci === forta ? "text-signal" : undefined} />
                      <span className="sr-only">{label(row.marks[ci])}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl text-[0.95rem] leading-relaxed text-ink-900/70">{p.footnote}</p>

        <div className="mt-6 flex flex-wrap gap-6 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-900/75">
          {(["full", "part", "none"] as Mark[]).map((m) => (
            <span key={m} className="flex items-center gap-2">
              <MarkIcon mark={m} /> {label(m)}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
