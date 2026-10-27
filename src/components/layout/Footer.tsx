import { brand, footer } from "@/content/navigation";
import { sources } from "@/content/sources";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative bg-ink-950 pt-24 text-stone-100" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer and references
      </h2>
      <Container>
        <div className="grid gap-14 border-t border-white/[0.08] pt-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="text-white" />
            <p className="mt-6 max-w-sm text-[1.35rem] leading-snug tracking-[-0.02em] text-steel-200">
              {footer.statement}
            </p>
            <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-steel-500">
              {brand.descriptor} · {brand.location}
            </p>
          </div>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-steel-500">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <a href={l.href} className="text-[0.95rem] text-steel-300 transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <section id="references" aria-labelledby="references-heading" className="mt-24 border-t border-white/[0.08] pt-10">
          <h3 id="references-heading" className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-steel-500">
            References
          </h3>
          <ol className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2">
            {sources.map((s, i) => (
              <li key={s.id} id={`ref-${i + 1}`} className="grid scroll-mt-28 grid-cols-[2.25rem_1fr] text-[0.82rem] leading-relaxed">
                <span className="font-mono text-steel-500">[{i + 1}]</span>
                <div>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-steel-200 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                  >
                    {s.publisher}, <span className="italic">{s.title}</span>, {s.year}
                  </a>
                  <p className="mt-1 text-steel-400">{s.finding}</p>
                  {s.note && <p className="mt-1 text-steel-500">Note: {s.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/[0.08] py-8 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-steel-500 sm:flex-row sm:justify-between">
          <span>© 2026 Algosoup</span>
          <span>{footer.legal}</span>
        </div>
      </Container>
    </footer>
  );
}
