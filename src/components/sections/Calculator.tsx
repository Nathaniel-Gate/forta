"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { calculatorAssumptions, calculatorInputs, type InputSpec } from "@/config/calculator";
import { calculate, defaultInputs, type CalculatorInputs } from "@/lib/calculator";
import { formatGBP, formatGBPCompact, formatNumber, formatOneDecimal } from "@/lib/format";
import { publishEstimate, requestIntent } from "@/lib/intent";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceRef } from "@/components/ui/SourceRef";

const copy = {
  index: "04",
  eyebrow: "Savings estimate",
  title: "What could you save?",
  lede: "Put in rough numbers for your company and the estimate updates as you go.",
  disclaimer:
    "Illustrative estimate, not a forecast. The operational review replaces these assumptions with your real data.",
};

function formatValue(spec: InputSpec, v: number) {
  switch (spec.format) {
    case "currency":
      return formatGBP(v);
    case "percent":
      return `${v}%`;
    case "hours":
      return `${formatOneDecimal(v)} hrs`;
    default:
      return formatNumber(v);
  }
}

export function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const r = useMemo(() => calculate(inputs), [inputs]);
  const a = calculatorAssumptions;

  // Keep the enquiry form's optional "attach my estimate" summary current.
  useEffect(() => {
    const t = setTimeout(() => {
      publishEstimate(
        `${formatNumber(inputs.employees)} staff; ${formatGBP(inputs.monthlySaas)}/month SaaS across ${formatNumber(inputs.toolCount)} tools; ` +
          `${inputs.affectedShare}% in process roles losing ${formatOneDecimal(inputs.hoursLostPerWeek)} hrs/week at ${formatGBP(inputs.averageSalary)}. ` +
          `Estimated annual upside ${formatGBP(r.conservative.total)} to ${formatGBP(r.expected.total)}.`,
      );
    }, 250);
    return () => clearTimeout(t);
  }, [inputs, r]);

  const set = (key: keyof CalculatorInputs, v: number) => setInputs((prev) => ({ ...prev, [key]: v }));

  const payback = (m: number | null) => (m === null ? "n/a" : m < 1 ? "under a month" : `${formatOneDecimal(m)} months`);

  return (
    <Section id="calculator" tone="ink" labelledBy="calculator-heading">
      <Container>
        <SectionHeader id="calculator-heading" index={copy.index} eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />

        <div className="grid gap-px bg-white/[0.08] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* Inputs */}
          <Reveal className="bg-ink-900 p-6 sm:p-10">
            <form onSubmit={(e) => e.preventDefault()} aria-label="Savings estimate inputs">
              <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.18em] text-steel-500">
                <span>Your inputs</span>
                <button
                  type="button"
                  onClick={() => setInputs(defaultInputs)}
                  className="uppercase tracking-[0.18em] text-steel-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                >
                  Reset
                </button>
              </div>
              <div className="mt-6 divide-y divide-white/[0.07]">
                {calculatorInputs.map((spec) => (
                  <InputRow key={spec.key} spec={spec} value={inputs[spec.key]} onChange={(v) => set(spec.key, v)} />
                ))}
              </div>
            </form>
          </Reveal>

          {/* Results */}
          <Reveal delay={0.1} className="relative bg-ink-950 p-6 sm:p-10">
            <div aria-hidden className="bg-blueprint pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative" aria-live="polite" aria-atomic="false">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-steel-500">Estimated annual upside</p>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-4 text-white">
                <CountUp
                  value={r.conservative.total}
                  format={formatGBPCompact}
                  className="text-[clamp(2.8rem,6vw,4.6rem)] font-medium leading-none tracking-[-0.05em] tabular-nums"
                />
                <span className="text-[clamp(1.6rem,3vw,2.4rem)] text-steel-500">to</span>
                <CountUp
                  value={r.expected.total}
                  format={formatGBPCompact}
                  className="text-[clamp(2.8rem,6vw,4.6rem)] font-medium leading-none tracking-[-0.05em] tabular-nums"
                />
              </p>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-steel-400">
                Conservative to expected case: software you stop paying for, plus time your team gets back.
              </p>

              <dl className="mt-10 grid gap-px bg-white/[0.07] sm:grid-cols-2">
                <ResultCell
                  label="Software spend retired"
                  value={`${formatGBPCompact(r.conservative.saasSaving)} – ${formatGBPCompact(r.expected.saasSaving)}`}
                  sub={`${a.scenarios.conservative.saasReduction * 100}–${a.scenarios.expected.saasReduction * 100}% of ${formatGBPCompact(r.annualSaas)} a year`}
                />
                <ResultCell
                  label="Value of time returned"
                  value={`${formatGBPCompact(r.conservative.timeValueRecovered)} – ${formatGBPCompact(r.expected.timeValueRecovered)}`}
                  sub={`${a.scenarios.conservative.timeRecovery * 100}–${a.scenarios.expected.timeRecovery * 100}% of ${formatGBPCompact(r.frictionCost)} friction cost`}
                />
                <ResultCell
                  label="Hours lost today"
                  value={`${formatNumber(r.hoursLostPerYear)} hrs`}
                  sub={`Equivalent to ${formatOneDecimal(r.fteLost)} full-time people`}
                />
                <ResultCell
                  label="Indicative payback"
                  value={payback(r.conservative.paybackMonths)}
                  sub={`Conservative case, against a ${formatGBPCompact(a.referenceEngagementFee)} engagement`}
                />
              </dl>

              <div className="mt-6 grid grid-cols-2 gap-4 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-steel-500">
                <p>
                  SaaS per employee
                  <span className="mt-1 block font-sans text-[0.9rem] normal-case tracking-normal text-steel-300">
                    {formatGBP(r.saasPerEmployee)} a year
                  </span>
                </p>
                <p>
                  Average cost per tool
                  <span className="mt-1 block font-sans text-[0.9rem] normal-case tracking-normal text-steel-300">
                    {formatGBP(r.costPerTool)} a year
                  </span>
                </p>
              </div>

              <a
                href="#contact"
                onClick={() => requestIntent("review")}
                className="group mt-10 flex min-h-12 w-full items-center justify-between bg-white px-6 text-[0.95rem] font-medium text-ink-950 transition-colors hover:bg-stone-100"
              >
                Check these numbers with us
                <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1">
                  <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </a>
            </div>

            <details className="group relative mt-8 border-t border-white/[0.08] pt-5 text-[0.85rem] text-steel-400">
              <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.16em] text-steel-400 hover:text-white [&::-webkit-details-marker]:hidden">
                Assumptions and method
                <span aria-hidden className="transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <ul className="mt-4 space-y-2 leading-relaxed">
                <li>
                  Loaded hourly cost = salary × {a.employerCostMultiplier} employer on-cost ÷ ({a.hoursPerWeek} hrs ×{" "}
                  {a.workingWeeksPerYear} weeks) = <span className="text-stone-100">{formatGBP(r.loadedHourlyCost)}/hr</span>.
                </li>
                <li>
                  Friction cost = {formatNumber(r.affectedPeople)} people × hours lost × {a.workingWeeksPerYear} weeks × hourly cost.
                </li>
                <li>
                  Software retired: {a.scenarios.conservative.saasReduction * 100}% conservative, {a.scenarios.expected.saasReduction * 100}%
                  expected, of annual SaaS spend. Time recovered: {a.scenarios.conservative.timeRecovery * 100}% and{" "}
                  {a.scenarios.expected.timeRecovery * 100}% of hours lost.
                </li>
                <li>
                  Default salary reflects the UK full-time median of £39,039
                  <SourceRef id="ons-ashe-2025" />, rounded up for process-heavy roles. Time value is capacity returned, not
                  necessarily cash released.
                </li>
              </ul>
            </details>
            <p className="relative mt-6 text-[0.78rem] leading-relaxed text-steel-500">{copy.disclaimer}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function ResultCell({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-ink-950 p-5">
      <dt className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-steel-500">{label}</dt>
      <dd className="mt-3">
        <span className="block text-[1.45rem] font-medium tracking-[-0.03em] text-white tabular-nums">{value}</span>
        <span className="mt-1 block text-[0.8rem] leading-snug text-steel-400">{sub}</span>
      </dd>
    </div>
  );
}

function InputRow({ spec, value, onChange }: { spec: InputSpec; value: number; onChange: (v: number) => void }) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const pct = ((value - spec.min) / (spec.max - spec.min)) * 100;

  const commit = () => {
    if (draft === null) return;
    const n = Number(draft.replace(/[£,%\s]|hrs?/gi, ""));
    if (Number.isFinite(n) && draft.trim() !== "") {
      const stepped = Math.round(n / spec.step) * spec.step;
      onChange(Math.min(spec.max, Math.max(spec.min, Number(stepped.toFixed(2)))));
    }
    setDraft(null);
  };

  return (
    <div className="py-5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={`${id}-range`} className="text-[0.98rem] text-stone-100">
          {spec.label}
        </label>
        <input
          aria-label={`${spec.label}, exact value`}
          inputMode="decimal"
          value={draft ?? formatValue(spec, value)}
          onFocus={(e) => {
            setDraft(String(value));
            requestAnimationFrame(() => e.target.select());
          }}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit();
              (e.target as HTMLInputElement).blur();
            }
          }}
          className="w-32 border-b border-transparent bg-transparent text-right text-[1.05rem] font-medium tabular-nums text-white transition-colors hover:border-white/20 focus:border-signal focus:outline-none"
        />
      </div>
      <p id={`${id}-help`} className="mt-1 text-[0.8rem] text-steel-500">
        {spec.help}
      </p>
      <input
        id={`${id}-range`}
        type="range"
        className="range mt-2"
        min={spec.min}
        max={spec.max}
        step={spec.step}
        value={value}
        aria-describedby={`${id}-help`}
        aria-valuetext={formatValue(spec, value)}
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
