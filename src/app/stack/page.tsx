import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { team } from "@/content/home";
import { stackOffer } from "@/content/stack";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { StackForm } from "@/components/stack/StackForm";

export const metadata: Metadata = {
  title: "Free tech stack rebuild | Forta",
  description: stackOffer.page.intro,
};

/**
 * Stand-alone landing page for the free stack rebuild. This is the link to
 * paste into outreach: forta.example/stack. No navigation to leak attention.
 */
export default function StackPage() {
  const s = stackOffer;
  return (
    <main className="min-h-screen bg-ink-950 pb-24 text-stone-100">
      <Container>
        <header className="flex h-[var(--nav-h)] items-center">
          <Link href="/" aria-label="Forta home" className="text-white">
            <Logo />
          </Link>
        </header>
        <div className="mx-auto mt-10 max-w-2xl sm:mt-16">
          <h1 className="text-balance text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1] tracking-[-0.045em] text-white">
            {s.page.title}
          </h1>
          <p className="mt-5 text-[1.15rem] leading-relaxed text-steel-300">{s.page.intro}</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-3">
              {team.people.map((p) => (
                <Image
                  key={p.name}
                  src={p.photo}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-ink-950 object-cover grayscale"
                />
              ))}
            </div>
            <p className="text-[0.95rem] text-steel-300">Nathaniel and Oree read every one themselves.</p>
          </div>
          <div className="mt-10 border border-white/15 bg-ink-900 p-6 sm:p-8">
            <StackForm source="stack-page" />
          </div>
        </div>
      </Container>
    </main>
  );
}
