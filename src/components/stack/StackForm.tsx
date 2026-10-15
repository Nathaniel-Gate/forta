"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { stackOffer } from "@/content/stack";
import { stackSchema, type StackRequest, type StackRequestInput } from "@/lib/stack-schema";
import { cn } from "@/lib/cn";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

/**
 * The free stack rebuild form. Used in the hero and on /stack (the link we
 * send in outreach). `source` records where the request came from.
 */
export function StackForm({ source, className }: { source: string; className?: string }) {
  const s = stackOffer;
  const id = useId();
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const doneRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitted },
  } = useForm<StackRequestInput, unknown, StackRequest>({
    resolver: zodResolver(stackSchema),
    defaultValues: { tools: [], company: "", email: "", pain: "", source, website: "" },
  });
  const tools = useWatch({ control, name: "tools" }) ?? [];

  useEffect(() => {
    if (status.state === "sent") doneRef.current?.focus();
  }, [status]);

  const setTools = (next: string[]) => setValue("tools", next, { shouldValidate: isSubmitted });

  const addTool = (raw: string) => {
    const names = raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (!names.length) return;
    const lower = tools.map((t) => t.toLowerCase());
    setTools([...tools, ...names.filter((n) => !lower.includes(n.toLowerCase()))]);
    setDraft("");
  };
  const toggleTool = (name: string) =>
    tools.includes(name) ? setTools(tools.filter((t) => t !== name)) : setTools([...tools, name]);

  const onSubmit = async (data: StackRequest) => {
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/stack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  };

  if (status.state === "sent") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className={cn("outline-none", className)}>
        <p className="text-[1.8rem] font-medium tracking-[-0.03em] text-white">{s.success.title}</p>
        <p className="mt-2 text-[1.05rem] text-steel-300">{s.success.body}</p>
      </div>
    );
  }

  const quickPicks = s.suggestions.slice(0, 12);
  const inputBase =
    "w-full border-0 border-b bg-transparent px-0 py-2.5 text-[1rem] text-white placeholder:text-steel-500 focus:outline-none focus:ring-0";

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={className} aria-label={s.title}>
      {/* Tools */}
      <div>
        <label htmlFor={`${id}-tool`} className="text-[0.85rem] text-steel-300">
          {s.toolsLabel}
        </label>
        {tools.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tools added">
            {tools.map((t) => (
              <li key={t}>
                <button
                  type="button"
                  onClick={() => toggleTool(t)}
                  className="flex items-center gap-2 bg-white px-2.5 py-1 text-[0.85rem] text-ink-950 hover:bg-stone-200"
                  aria-label={`Remove ${t}`}
                >
                  {t}
                  <span aria-hidden>×</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <input
          id={`${id}-tool`}
          value={draft}
          onChange={(e) => {
            const v = e.target.value;
            if (v.endsWith(",")) addTool(v);
            else setDraft(v);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTool(draft);
            } else if (e.key === "Backspace" && !draft && tools.length) {
              setTools(tools.slice(0, -1));
            }
          }}
          onBlur={() => addTool(draft)}
          placeholder="e.g. Salesforce, Monday.com, Xero"
          aria-describedby={`${id}-tool-help${errors.tools ? ` ${id}-tool-error` : ""}`}
          aria-invalid={errors.tools ? true : undefined}
          className={cn(inputBase, "mt-1", errors.tools ? "border-error" : "border-white/25 focus:border-white")}
        />
        <p id={`${id}-tool-help`} className="sr-only">
          {s.toolsHelp}
        </p>
        {errors.tools && (
          <p id={`${id}-tool-error`} className="mt-2 text-[0.8rem] text-error">
            {errors.tools.message ?? "Add at least one tool"}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {quickPicks
            .filter((t) => !tools.includes(t))
            .map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => toggleTool(t)}
                className="border border-white/15 px-2.5 py-1 text-[0.8rem] text-steel-300 hover:border-white/50 hover:text-white"
              >
                + {t}
              </button>
            ))}
        </div>
      </div>

      <div className="mt-6 grid gap-x-5 sm:grid-cols-2">
        <div className="mt-1">
          <label htmlFor={`${id}-company`} className="text-[0.85rem] text-steel-300">
            {s.companyLabel}
          </label>
          <input
            id={`${id}-company`}
            autoComplete="organization"
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? `${id}-company-error` : undefined}
            className={cn(inputBase, errors.company ? "border-error" : "border-white/25 focus:border-white")}
            {...register("company")}
          />
          {errors.company && (
            <p id={`${id}-company-error`} className="mt-2 text-[0.8rem] text-error">
              {errors.company.message}
            </p>
          )}
        </div>
        <div className="mt-5 sm:mt-1">
          <label htmlFor={`${id}-email`} className="text-[0.85rem] text-steel-300">
            {s.emailLabel}
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            className={cn(inputBase, errors.email ? "border-error" : "border-white/25 focus:border-white")}
            {...register("email")}
          />
          {errors.email && (
            <p id={`${id}-email-error`} className="mt-2 text-[0.8rem] text-error">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {status.state === "error" && (
        <p role="alert" className="mt-5 text-[0.9rem] text-error">
          {status.message} Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="group mt-7 flex min-h-13 w-full items-center justify-between bg-white px-6 py-3.5 text-[1rem] font-medium text-ink-950 shadow-[0_0_0_1px_rgb(255_255_255/0.4),0_0_32px_-8px_rgb(255_255_255/0.5)] transition-[background-color,box-shadow] hover:shadow-[0_0_0_1px_rgb(91_140_255/0.6),0_0_36px_-6px_rgb(91_140_255/0.55)] disabled:opacity-70"
      >
        <span>{status.state === "sending" ? "Sending…" : s.submit}</span>
        <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1">
          <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      <p className="mt-3 text-[0.85rem] text-steel-400">{s.promise}</p>
    </form>
  );
}
