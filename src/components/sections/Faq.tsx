"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { faq } from "@/content/faq";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Faq() {
  return (
    <Section id="faq" tone="paper" labelledBy="faq-heading">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)] lg:self-start">
            <SectionHeader id="faq-heading" title={faq.title} className="mb-8 sm:mb-10" />
            <p className="max-w-sm text-[1rem] leading-relaxed text-ink-900/70">{faq.ctaLead}</p>
            <ButtonLink intent="call" variant="paper" className="mb-12 mt-6">
              {faq.cta}
            </ButtonLink>
          </div>
          <Accordion.Root type="single" collapsible defaultValue="item-0" className="border-t border-ink-900/80">
            {faq.items.map((item, i) => (
              <Accordion.Item key={item.q} value={`item-${i}`} className="border-b border-ink-900/15">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left text-[1.15rem] font-medium leading-snug tracking-[-0.015em] transition-colors hover:text-ink-900/70 sm:text-[1.25rem]">
                    <span>{item.q}</span>
                    <span aria-hidden className="relative mt-2 h-3 w-3 shrink-0">
                      <span className="absolute left-0 top-1/2 h-px w-3 bg-current" />
                      <span className="absolute left-1/2 top-0 h-3 w-px bg-current transition-transform duration-300 group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="accordion-content">
                  <p className="max-w-2xl pb-7 text-[1.02rem] leading-relaxed text-ink-900/75">{item.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </Container>
    </Section>
  );
}
