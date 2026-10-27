"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { useForm, useWatch, type FieldError } from "react-hook-form";
import { closing, type Intent } from "@/content/home";
import { companySizes, enquirySchema, type Enquiry, type EnquiryInput } from "@/lib/enquiry-schema";
import { ESTIMATE_EVENT, INTENT_EVENT } from "@/lib/intent";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useNudge } from "@/lib/tour-state";
import { cn } from "@/lib/cn";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent"; reference: string } | { state: "error"; message: string };

export function Contact() {
  const reduce = useReducedMotion();
  const nudge = useNudge();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [estimate, setEstimate] = useState<string>("");
  const [attachEstimate, setAttachEstimate] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput, unknown, Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { intent: "call", message: "", website: "" },
    mode: "onTouched",
  });

  const intent = useWatch({ control, name: "intent" });

  // CTAs elsewhere on the page preselect the enquiry type; the calculator shares its estimate.
  useEffect(() => {
    const onIntent = (e: Event) => setValue("intent", (e as CustomEvent<Intent>).detail);
    const onEstimate = (e: Event) => setEstimate((e as CustomEvent<string>).detail);
    window.addEventListener(INTENT_EVENT, onIntent);
    window.addEventListener(ESTIMATE_EVENT, onEstimate);
    return () => {
      window.removeEventListener(INTENT_EVENT, onIntent);
      window.removeEventListener(ESTIMATE_EVENT, onEstimate);
    };
  }, [setValue]);

  useEffect(() => {
    if (status.state === "sent") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (data: Enquiry) => {
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, estimate: attachEstimate && estimate ? estimate : undefined }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string; error?: string };
      if (!res.ok || !json.ok || !json.reference) {
        throw new Error(json.error ?? "Something went wrong sending your enquiry.");
      }
      setStatus({ state: "sent", reference: json.reference });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  };

  const intentLabel = closing.intents.find((i) => i.id === intent)?.label ?? "";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="grain relative isolate overflow-hidden bg-ink-950 py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="bg-blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_20%_30%,black,transparent_75%)]" />
      <Container>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-4 border-t border-white/[0.09] pt-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel-400">
                <span>{closing.index}</span>
                <span aria-hidden className="h-px w-6 bg-current opacity-40" />
                <span>{closing.eyebrow}</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="contact-heading" className="mt-10 text-[clamp(2.8rem,6.6vw,5.8rem)] font-medium leading-[0.95] tracking-[-0.05em] text-white">
                {closing.title[0]}
                <span className="block font-serif font-normal italic tracking-[-0.03em] text-steel-300">{closing.title[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-9 max-w-lg text-pretty text-[1.08rem] leading-relaxed text-steel-300">{closing.body}</p>
              <p className="mt-10 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-steel-500">{closing.direct.label}</p>
              <a
                href={`mailto:${closing.direct.email}`}
                className="mt-2 inline-block text-[1.15rem] text-white underline decoration-white/25 underline-offset-[6px] transition-colors hover:decoration-white"
              >
                {closing.direct.email}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className={cn("edge-steel relative bg-ink-900/90 p-6 backdrop-blur sm:p-10", nudge && "form-nudge")}>
            {nudge && (
              <span aria-hidden className="form-nudge-chip">
                Your turn
              </span>
            )}
            <AnimatePresence mode="wait" initial={false}>
              {status.state === "sent" ? (
                <motion.div
                  key="sent"
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  initial={{ opacity: 0, y: 10 }}
                  transition={reduce ? { duration: 0 } : undefined}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[28rem] flex-col justify-center outline-none"
                >
                  <span aria-hidden className="h-2.5 w-2.5 rotate-45 bg-signal shadow-[0_0_16px_rgb(91_140_255/0.8)]" />
                  <h3 className="mt-8 text-[2rem] font-medium tracking-[-0.035em] text-white">Thank you. Your enquiry is with us.</h3>
                  <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-steel-300">{closing.responseNote}</p>
                  <p className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-steel-500">
                    Reference <span className="text-stone-100">{status.reference}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      reset({ intent: "call", message: "", website: "" });
                      setAttachEstimate(false);
                      setStatus({ state: "idle" });
                    }}
                    className="mt-10 self-start text-[0.9rem] text-steel-300 underline decoration-white/25 underline-offset-4 hover:text-white"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={reduce ? { duration: 0 } : undefined}
                  aria-describedby="form-note"
                >
                  <fieldset>
                    <legend className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-steel-500">I would like to</legend>
                    <div className="mt-4 grid gap-2 sm:grid-cols-3">
                      {closing.intents.map((opt) => (
                        <label
                          key={opt.id}
                          className={cn(
                            "relative flex min-h-16 cursor-pointer items-center border px-4 py-3 text-[0.88rem] leading-snug transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal",
                            intent === opt.id
                              ? "border-white bg-white text-ink-950"
                              : "border-white/15 text-steel-300 hover:border-white/40 hover:text-white",
                          )}
                        >
                          <input type="radio" value={opt.id} {...register("intent")} className="sr-only" />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-8 grid gap-x-6 sm:grid-cols-2">
                    <Field label="Full name" error={errors.name} autoComplete="name" {...register("name")} />
                    <Field label="Work email" type="email" error={errors.email} autoComplete="email" {...register("email")} />
                    <Field label="Company" error={errors.company} autoComplete="organization" {...register("company")} />
                    <Field label="Role" error={errors.role} autoComplete="organization-title" placeholder="e.g. COO" {...register("role")} />
                  </div>

                  <SelectField label="Company size" error={errors.companySize} {...register("companySize")}>
                    <option value="">Select headcount</option>
                    {companySizes.map((s) => (
                      <option key={s} value={s}>
                        {s} employees
                      </option>
                    ))}
                  </SelectField>

                  <TextAreaField
                    label="What prompted the conversation?"
                    optional
                    error={errors.message}
                    placeholder="A team that's stretched, a process that keeps breaking, a workflow nobody has time to fix…"
                    {...register("message")}
                  />

                  {/* Honeypot, hidden from people and assistive tech */}
                  <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label>
                      Website
                      <input tabIndex={-1} autoComplete="off" {...register("website")} />
                    </label>
                  </div>

                  {estimate && (
                    <label className="mt-6 flex cursor-pointer items-start gap-3 text-[0.88rem] leading-snug text-steel-300">
                      <input
                        type="checkbox"
                        checked={attachEstimate}
                        onChange={(e) => setAttachEstimate(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-signal)]"
                      />
                      <span>
                        Attach my savings estimate
                        <span className="mt-1 block text-[0.8rem] text-steel-500">{estimate}</span>
                      </span>
                    </label>
                  )}

                  <label className="mt-6 flex cursor-pointer items-start gap-3 text-[0.88rem] leading-snug text-steel-300">
                    <input
                      type="checkbox"
                      {...register("consent")}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-signal)]"
                    />
                    <span>Algosoup may contact me about this enquiry. We do not add you to marketing lists.</span>
                  </label>
                  {errors.consent && (
                    <p id="consent-error" className="mt-2 text-[0.8rem] text-error">
                      {errors.consent.message}
                    </p>
                  )}

                  {status.state === "error" && (
                    <p role="alert" className="mt-6 border-l-2 border-error pl-3 text-[0.9rem] text-error">
                      {status.message} Please try again, or email us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status.state === "sending"}
                    className="group mt-8 flex min-h-14 w-full items-center justify-between bg-white px-6 text-[0.98rem] font-medium text-ink-950 transition-[background-color,box-shadow] hover:shadow-[0_0_0_1px_rgb(91_140_255/0.6),0_0_36px_-6px_rgb(91_140_255/0.55)] disabled:cursor-progress disabled:opacity-70"
                  >
                    <span>{status.state === "sending" ? "Sending…" : intentLabel}</span>
                    <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1">
                      <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                  <p id="form-note" className="mt-4 text-[0.78rem] text-steel-500">
                    {closing.responseNote} All fields are required unless marked optional.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Field primitives ---------- */

type BaseProps = { label: string; error?: FieldError; optional?: boolean };

const inputClass =
  "mt-2 w-full border-0 border-b bg-transparent px-0 py-2.5 text-[1rem] text-white placeholder:text-steel-500/80 transition-colors focus:outline-none focus:ring-0";

function FieldShell({
  id,
  label,
  error,
  optional,
  children,
}: BaseProps & { id: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <label htmlFor={id} className="flex justify-between text-[0.8rem] text-steel-400">
        {label}
        {optional && <span className="text-steel-500">Optional</span>}
      </label>
      {children}
      {error?.message && (
        <p id={`${id}-error`} className="mt-2 text-[0.8rem] text-error">
          {error.message}
        </p>
      )}
    </div>
  );
}

function borderFor(error?: FieldError) {
  return error ? "border-error focus:border-error" : "border-white/20 hover:border-white/40 focus:border-signal";
}

function Field({ label, error, optional, ...rest }: BaseProps & React.InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} optional={optional}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, borderFor(error))}
        {...rest}
      />
    </FieldShell>
  );
}

function SelectField({
  label,
  error,
  children,
  ...rest
}: BaseProps & React.SelectHTMLAttributes<HTMLSelectElement> & { ref?: React.Ref<HTMLSelectElement> }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(inputClass, borderFor(error), "cursor-pointer appearance-none bg-ink-900 pr-8 [&>option]:bg-ink-900")}
          {...rest}
        >
          {children}
        </select>
        <svg aria-hidden viewBox="0 0 12 12" className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 text-steel-400">
          <path d="M2 4.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </div>
    </FieldShell>
  );
}

function TextAreaField({
  label,
  error,
  optional,
  ...rest
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement> & { ref?: React.Ref<HTMLTextAreaElement> }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} optional={optional}>
      <textarea
        id={id}
        rows={3}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, borderFor(error), "resize-y")}
        {...rest}
      />
    </FieldShell>
  );
}
